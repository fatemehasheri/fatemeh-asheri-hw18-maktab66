import React ,{useState}  from 'react';

 const ContextUser = React.createContext({})

export const UserProvider = ({ children }) => {
    const [LoggedInUsers, setLoggedInUsers] = useState([]);
    const [isSignin, setIsSignin] = useState(false);
    
    return (
        <ContextUser.Provider value={{ LoggedInUsers, setLoggedInUsers ,isSignin,setIsSignin}}>
            {children}
        </ContextUser.Provider>
    );
};
  
export  default  ContextUser;