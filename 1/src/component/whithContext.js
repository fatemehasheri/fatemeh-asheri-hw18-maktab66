import React, {useContext} from 'react';
import Form from './Form';
import ContextUser,{UserProvider} from "./ContextUser";

function WithContext(Component) {
    return function WithCheckingContext({props}) {
        const {isSignin} = useContext(ContextUser)
            
        return(
            <UserProvider>
                <div>
                    {isSignin?<Component {...props}/>:<Form/>}
                </div>
            </UserProvider>
        )

    }
}

export default WithContext;