import React, {useContext} from 'react';
import Form from './Form';
import ContextUser,{UserProvider} from "./ContextUser";

function WithContext(Component) {
    return function WithCheckingContext({...props}) {
        const {isSignin,LoggedInUsers} = useContext(ContextUser)
        
        return(<div>
            {isSignin?<Component name={Object(LoggedInUsers[0]).firstName} {...props}/>:<Form/>}
        </div>)
    }
}

export default WithContext;