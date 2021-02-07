import React, { createContext, useEffect, useReducer } from "react";
import {
  useLocalStorage,
  useSessionStorage
} from "../../hooks/useBrowserStorage";
import axios from "axios";
import { xml2js } from "xml-js";
import cloneObject from "../../utils/cloneObject";

// todo: Clean this up. (see: requestQrzData)

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
  const [cachedStations, setCachedStations] = useLocalStorage("stations", {});
  const [sessionStations, setSessionStations] = useSessionStorage(
    "stations",
    {}
  );
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    sessionKey: ""
  });

  const requestQrzData = async (queryStringParameters) => {
    console.log("requestQrzDatra", queryStringParameters);
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
    console.log("qrz credentials changed", credentials);
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

  const cacheStation = (station) => {
    console.log("cacheStation", station);
    let newCachedStations = cloneObject(cachedStations);
    newCachedStations[station.callsign] = station;
    setCachedStations(newCachedStations);
  };

  const sessionKey = state.sessionKey;
  const lookupCallsign = async (callsign) => {
    console.log("lookupCallsign", callsign);
    let result = {
      callsign: callsign.toLowerCase(),
      name: "",
      location: "",
      qrz: {}
    };

    const cachedStation = cachedStations[result.callsign];
    if (cachedStation) {
      console.log("cached station found", cachedStation);
      return cachedStation;
    }

    const sessionStation = sessionStations[result.callsign];
    if (sessionStation) {
      console.log("session station found", sessionStation);
      return sessionStation;
    }

    if (!sessionKey) {
      console.log("no session key");
      return result;
    }

    const qrzResponse = await requestQrzData({
      s: sessionKey,
      callsign
    });

    console.log("qrzResponse", qrzResponse);

    const station = qrzResponse?.Callsign;
    if (!station) {
      console.log("station not found", result);
      let newSessionStations = cloneObject(sessionStations);
      newSessionStations[result.callsign] = result;
      setSessionStations(newSessionStations);
      return result;
    }

    const qrzStation = normalizeQrzStationData(station);
    result.qrz = qrzStation;

    if (qrzStation?.name_fmt) {
      result.name = qrzStation?.name_fmt;
    } else {
      const firstName = qrzStation?.fname;
      const lastName = qrzStation?.name;
      if (firstName && lastName) {
        result.name = `${firstName} ${lastName}`;
      } else if (firstName) {
        result.name = firstName;
      } else if (lastName) {
        result.name = lastName;
      }
    }

    const city = qrzStation?.addr2;
    const state = qrzStation?.state;
    if (city && state) {
      result.location = `${city}, ${state}`;
    } else if (city) {
      result.location = city;
    } else if (state) {
      result.location = state;
    } else if (qrzStation?.country) {
      result.location = qrzStation?.country;
    }

    let newSessionStations = cloneObject(sessionStations);
    newSessionStations[result.callsign] = result;
    setSessionStations(newSessionStations);

    console.log("lookupCallsign", result);

    return result;
  };

  return (
    <QRZSessionContext.Provider
      value={{ ...state, setCredentials, lookupCallsign, cacheStation }}
    >
      {children}
    </QRZSessionContext.Provider>
  );
};
