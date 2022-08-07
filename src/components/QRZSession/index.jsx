import React, { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../../hooks/useBrowserStorage";
import axios from "axios";
import { xml2js } from "xml-js";

export const QRZSessionContext = createContext({ key: "" });

const normalizeQrzStationData = (qrzData) => {
  let newData = {};
  for (const [key, value] of Object.entries(qrzData)) {
    newData[key.toLowerCase()] = value?.value;
  }
  return newData;
};

const ACTIONS = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SUCCESS:
      return {
        loading: false,
        error: null,
        sessionKey: action.payload
      };
    case ACTIONS.ERROR:
      return {
        loading: false,
        error: action.payload,
        sessionKey: ""
      };
    default:
      return state;
  }
};

export const QRZSessionProvider = ({ children }) => {
  const [credentials, setCredentials] = useLocalStorage("qrz.credentials", {
    username: "",
    password: ""
  });
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    sessionKey: ""
  });

  const requestQrzData = async (queryStringParameters) => {
    let queryString = "";
    for (const [key, value] of Object.entries(queryStringParameters)) {
      queryString += `${key}=${value};`;
    }

    try {
      const response = await axios.get(
        `https://xmldata.qrz.com/xml/current/?${queryString}`
      );

      const { QRZDatabase } = xml2js(response.data, {
        compact: true,
        ignoreAttributes: true,
        textKey: "value",
        cdataKey: "value",
        commentKey: "value"
      });

      return QRZDatabase;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(
          `https://xmldata.qrz.com/xml/current/?username=${credentials.username};password=${credentials.password}`
        )
        .then((response) => {
          const { QRZDatabase } = xml2js(response.data, {
            compact: true,
            ignoreAttributes: true,
            textKey: "value",
            cdataKey: "value",
            commentKey: "value"
          });

          dispatch({
            type: ACTIONS.SUCCESS,
            payload: QRZDatabase?.Session?.Key?.value || ""
          });
        })
        .catch((error) => {
          dispatch({ type: ACTIONS.ERROR, payload: error });
        });
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR, payload: error });
    }
  }, [credentials]);

  const sessionKey = state.sessionKey;

  const lookupCallsign = async (callsign) => {
    if (!sessionKey) {
      return;
    }

    const qrzResponse = await requestQrzData({
      s: sessionKey,
      callsign
    });

    const station = qrzResponse?.Callsign;
    if (!station) {
      return;
    }

    return normalizeQrzStationData(station);
  };

  return (
    <QRZSessionContext.Provider value={{ ...state, setCredentials, lookupCallsign }}>
      {children}
    </QRZSessionContext.Provider>
  );
};
