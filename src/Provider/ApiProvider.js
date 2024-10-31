import { createContext, useContext, useEffect, useState } from "react";

const ApiContext = createContext();

export default function ApiProvider({children}) {
    const [apiCounter, setApiCounter] = useState(0);

    // useEffect(()=>{
    //     if(apiCounter===0){
    //         console.log('pppppppppppppppppppppppppppppppppppppppppp')
    //     }
    //     console.log(apiCounter,'================')
    // },[apiCounter])

    const increaseApiCounter = () => {
        setApiCounter((prevCounter) => prevCounter + 1);
    };

    const decreaseApiCounter = () => {
        setApiCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    };
    const contextValue ={
          apiCounter,
          setApiCounter,
          increaseApiCounter,
          decreaseApiCounter,
        
    }
        
    return (
        <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
      );
}

export const useApi = () => {
    return useContext(ApiContext);
  };
