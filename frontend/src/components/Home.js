// Home.js

import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";

import LoginContext from '../contexts/user/LoginContext';
import UserContext from '../contexts/user/UserContext';

const Home = () => {
	const context = useContext(UserContext);
	const { user } = context;
	const { login } = useContext(LoginContext);
	

	return (
		<>
		{!login && (
          <Navigate to="/login" replace={true} />
        )}
			hi home
			{user.usr_id}
		</>
	);
}
export default Home