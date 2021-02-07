import React, { useEffect, createContext, useReducer } from "react";
import { v4 } from "uuid";

export const PersistentItemsContext = createContext();

const ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, { guid: v4(), ...action?.payload }];
    case ACTIONS.REMOVE:
      return state.filter((item) => item.guid !== action?.payload?.guid);
    default:
      return state;
  }
};

export const PersistentItemsProvider = ({
  localStorageKey = "persistent.items",
  children
}) => {
  const [items, dispatch] = useReducer(
    reducer,
    (localStorage && JSON.parse(localStorage.getItem(localStorageKey))) || []
  );

  useEffect(() => {
    localStorage &&
      localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [items, localStorageKey]);

  return (
    <PersistentItemsContext.Provider
      value={{
        items,
        addItem: (item) => dispatch({ type: ACTIONS.ADD, payload: item }),
        removeItem: (item) => dispatch({ type: ACTIONS.REMOVE, payload: item })
      }}
    >
      {children}
    </PersistentItemsContext.Provider>
  );
};
