// Login.js
import React, { useContext, useState } from 'react'
import { Navigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert, Container } from 'react-bootstrap'

import UserContext from '../contexts/user/UserContext';
import LoginContext from '../contexts/user/LoginContext';

const Login = () => {
	const context = useContext(UserContext);
	const { user, setUser } = context;
	const {login, setLogin} = useContext(LoginContext);
	// console.log(user)

	const [validationErrors, setValidationErrors] = useState([])
	const [userError, setUserError] = useState('')
	const [alertShow, setAlertShow] = useState(false)

	const onChangeText = (e) => {
		setUser({...user, [e.target.name]: e.target.value});
	}

	const doLogin = async (e) => {
        e.preventDefault();
		var url = "api/auth/login";

		const data = { usr_id: user.usr_id, pass: user.pass, koken: user.koken };

		fetch(url, {
		  method: 'POST', // or 'PUT'
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(data),
		})
		  .then((response) => {
			setLogin(response.ok)

            if (!response.ok){
                /*console.log(response.ok)*/
                response.json()
                    .then((data) => {
                        // console.log(data);
						if (data.erro) {
							setUserError(data.erro);
							setAlertShow(true)
						}
						
						setValidationErrors(data.errors);
                    })
            }
		  })		  
		  .catch((error) => {
			console.error('Error: ', error);
		  });
		
    }

		
	return (
		<>
		{login && (
          <Navigate to="/" replace={true} />
        )}
		<Container>
			<Alert variant='danger' show={alertShow} onClose={() => setAlertShow(false)} dismissible>
				{userError}
			</Alert>
			<Form onSubmit={ doLogin }>
			  <Form.Group className="mb-3" controlId="formBasicEmail">
			    <Form.Label>User name</Form.Label>
			    <Form.Control type="text" placeholder="Enter username" name='usr_id' value={user.usr_id} onChange={onChangeText} />
				<Form.Text className={'text-danger'}>
        			{validationErrors && validationErrors.map((validationError)=>{
						return validationError.param === 'usr_id'? validationError.msg:''; 
					})}
      			</Form.Text>
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Password" name='pass' value={user.pass} onChange={onChangeText} />
				<Form.Text className={'text-danger'}>
        			{validationErrors && validationErrors.map((validationError)=>{
						return validationError.param === 'pass'? validationError.msg:''; 
					})}
      			</Form.Text>
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="formBasicKoken">
			    <Form.Label>Koken</Form.Label>
			    <Form.Control type="password" placeholder="Koken" name='koken' value={user.koken} onChange={onChangeText} />
				<Form.Text className={'text-danger'}>
        			{validationErrors && validationErrors.map((validationError)=>{
						return validationError.param === 'koken'? validationError.msg:''; 
					})}
      			</Form.Text>
			  </Form.Group>

			  <Button variant="primary" type="submit">
			    Login
			  </Button>
			  <br/>
				Do not have an account? <Link to={'/signup'}>Signup</Link>
			</Form>
		</Container>
		</>
	);
}

export default Login