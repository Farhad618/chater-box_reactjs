// UserContext.js

import { createContext, useState } from 'react'

const UserContext = createContext();

export const UserState = (props) => {
	const userInitial = {
		usr_id: "",
		pass: "",
		token: "",
		koken: "",
	}
	const [user, setUser] = useState(userInitial)

	return (
		<UserContext.Provider value={{user, setUser}}>
			{ props.children }
		</UserContext.Provider>
	)
}

export default UserContext;