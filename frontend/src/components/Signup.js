// Login.js
import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { Navigate, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap'

import UserContext from '../contexts/user/UserContext';
import LoginContext from '../contexts/user/LoginContext';

const Login = () => {
	const context = useContext(UserContext);
	const { user, setUser } = context;
	const {login, setLogin} = useContext(LoginContext);
	// console.log(user)
	const onChangeText = (e) => {
		setUser({...user, [e.target.name]: e.target.value});
	}

	const doSignup = (e) => {
        e.preventDefault();
		var url = "api/auth/signup";

		const data = { usr_id: user.usr_id, pass: user.pass, token: user.token, koken: user.koken };

		fetch(url, {
		  method: 'POST', // or 'PUT'
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(data),
		})
		  .then((response) => {
            setLogin(response.ok)

            if (login){
                /*console.log(response.ok)*/
                response.json()
                    .then((data) => {
                        console.log(data);
                    })
            }
		  })		  
		  .catch((error) => {
			console.error('Error:', error);
		  });
		
    }

	return (
		<>
		{login && (
          <Navigate to="/" replace={true} />
        )}
		<Container>
			<Form onSubmit={doSignup}>
			  <Form.Group className="mb-3" controlId="useridForSignup">
			    <Form.Label>User name</Form.Label>
			    <Form.Control type="text" placeholder="Enter username" name='usr_id' value={user.usr_id} onChange={onChangeText} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="passwordForSignup">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Password" name='pass' value={user.pass} onChange={onChangeText} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="tokenForSignup">
			    <Form.Label>Token</Form.Label>
			    <Form.Control type="password" placeholder="Token" name='token' value={user.token} onChange={onChangeText} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="kokenForSignup">
			    <Form.Label>Koken</Form.Label>
			    <Form.Control type="password" placeholder="Koken" name='koken' value={user.koken} onChange={onChangeText} />
			  </Form.Group>

			  <Button variant="primary" type="submit">
			    Signup
			  </Button>
			  <br/>
				Already have an account? <Link to={'/login'}>Login</Link>
			</Form>
		</Container>
		</>
	);
}

export default Login