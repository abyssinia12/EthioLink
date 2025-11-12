import React, {createContext, useReducer} from "react";

export const DataContext= createContext()
export const DataProvider=({children, reducer, initalstate

})=>{
  return (
    <DataContext.Provider
      value={useReducer(reducer, initalstate)}>
        {children}
      </DataContext.Provider>
  );
}