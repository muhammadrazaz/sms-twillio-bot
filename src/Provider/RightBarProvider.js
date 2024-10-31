import { createContext, useContext, useState } from "react";

const RightBarContext = createContext();

export default function RightBarProvider({children}) {
    const [rightBarCheckbox, setRightBarCheckbox] = useState(false);
    const contextValue ={
          rightBarCheckbox,
          setRightBarCheckbox,
        
    }
        
    return (
        <RightBarContext.Provider value={contextValue}>{children}</RightBarContext.Provider>
      );
}

export const useRightBar = () => {
    return useContext(RightBarContext);
  };
  

