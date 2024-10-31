import React,{createContext, useState} from 'react'

export const MultiSelectContext = createContext();

export default function MultiSelectProvider({children}) {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [data, setData] = useState();


    return (
      <MultiSelectContext.Provider value={{ selectedOptions, setSelectedOptions,data,setData}}>
        {children}
      </MultiSelectContext.Provider>
    );
}
