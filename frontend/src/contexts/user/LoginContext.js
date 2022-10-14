// import dotenv from 'dotenv'

import { createContext, useState } from 'react'

// import UserContext from './UserContext';


const LoginContext = createContext();

export const LoginState = (props) => {
    
    // const context = useContext(UserContext);
    // const { user } = context;
	
	const [login, setLogin] = useState(false);



	return (
		<LoginContext.Provider value={{login, setLogin}}>
			{ props.children }
		</LoginContext.Provider>
	)
}

export default LoginContext;