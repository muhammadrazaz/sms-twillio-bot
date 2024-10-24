import React,{createContext, useState} from 'react'

export const RightBarContext = createContext();

export default function RightBarProvider({ children }) {
    const [rightBarCheckBox, setRightBarCheckBox] = useState(false);
    const [rightBarChildren, setRightBarChildren] = useState(null);
    const [rightBarTitle,setRightBarTitle] = useState()

    return (
      <RightBarContext.Provider value={{ rightBarCheckBox, setRightBarCheckBox,rightBarChildren,setRightBarChildren,rightBarTitle,setRightBarTitle }}>
        {children}
      </RightBarContext.Provider>
    );
}
