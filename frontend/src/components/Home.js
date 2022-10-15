// Home.js

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navigate } from "react-router-dom";

import LoginContext from '../contexts/user/LoginContext';
import UserContext from '../contexts/user/UserContext';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Chat from './Chat';

const Home = () => {
	const bottomRef = useRef(null);
		const context = useContext(UserContext);
		const { user } = context;
		const { login } = useContext(LoginContext);
		
		const [chat, setChat] = useState('');
		const [allChats, setAllChats] = useState([]);
		const [chatCount, setChatCount] = useState(0);
	
	const onChangeText = (e) => {
		setChat(e.target.value);
	}


	useEffect(() => {				
		const interval = setInterval(() => {
			let url = "api/chat/viewchat";

			const data = { usr_id: user.usr_id, pass: user.pass, koken: user.koken };
	
			fetch(url, {
			  method: 'POST', // or 'PUT'
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(data),
			})
			  .then((response) => {
				if (response.ok){
					/*console.log(response.ok)*/
					response.json()
						.then((data) => {
							// console.log("home.js "+data);
							setAllChats(data);
							setChatCount(data.length)
						})
				}
			  })		  
			  .catch((error) => {
				console.error('Error:', error);
			  });
		}, 900);
		
		return () => {
		  clearInterval(interval);
		};
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);

	  useEffect(()=>{
		bottomRef.current?.scrollIntoView({behavior: 'smooth'});
	  }, [chatCount]);
	  
	const doChat = (e)=>{
		e.preventDefault();
		if (login) {
			let url = "api/chat/insertchat";

			const data = { usr_id: user.usr_id, pass: user.pass, koken: user.koken, chat: chat };

			fetch(url, {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			}).catch((error) => {
				console.error('Error:', error);
			});	
		}
		setChat('');
	}

	return (
		<>
		{!login && (
          <Navigate to="/login" replace={true} />
        )}
		
		{/* <Container> */}
			<Navbar fixed='top' expand="lg" variant="light" bg="light" className='nav-head'>
				<Container>
					<Navbar.Brand href="#">chater-box</Navbar.Brand>
					<Navbar.Text>
						Logout from: <a href="login">{user.usr_id}</a>
					</Navbar.Text>
				</Container>
			</Navbar>
			<div className='msg-area '>
				<Container>
					{allChats.map(oneChat=>{
						// console.log(oneChat)
						return <Chat key={oneChat._id} chat={oneChat} />
					})}	
					<div ref={bottomRef} />
				</Container>				
			</div>
			<Navbar fixed='bottom' expand="lg" variant="mute" bg="light" className='text-nav'>
				<Container>
					<Form onSubmit={doChat}>
						<InputGroup className="" size="lg">
							<Form.Control
								placeholder="Enter something..."
								aria-label="Enter something..."
								aria-describedby="basic-addon2"
								value={chat}
								onChange={onChangeText}
								required={true}
							/>
							<Button variant="outline-secondary" id="button-addon2" type="submit">
								Send
							</Button>
						</InputGroup>							
					</Form>			
				</Container>
			</Navbar>
		{/* </Container> */}
		</>
	);
}
export default Home