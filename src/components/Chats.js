import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const Chats = () => {
  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };
  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>FiendlyChat</div>
        <div className='logout-tab' onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh - 66px)'
        projectId='
f60faabf-2917-420d-bd08-d73f5a14f220'
        userName='.'
        userSecret='.'
      />
    </div>
  );
};

export default Chats;
