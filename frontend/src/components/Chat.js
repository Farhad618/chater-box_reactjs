import React, { useContext } from 'react';

import UserContext from '../contexts/user/UserContext';

const Chat = (props) => {
	const context = useContext(UserContext);
	const { user } = context;

    const {usr_id, chat} = props.chat;
    return (
        <>
            <div className='clearfix'>
                <div className={user.usr_id === usr_id?'float-end':'float-start'}>
                    <div className='fw-bold text-danger'>{user.usr_id === usr_id?'':usr_id+':'}</div>
                    <div className={"fs-6 p-2 rounded my-1 bg-"+(user.usr_id === usr_id?'light':'info')+" text-"+(user.usr_id === usr_id?'dark':'light')}>                        
                        <div>{chat}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;