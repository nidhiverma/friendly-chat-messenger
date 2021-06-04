import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import axios from 'axios';

const Chats = () => {
  const didMountRef = useRef(false);
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  // get image file for profile avatar
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push('/');
        return;
      }

      axios
        .get('https://api.chatengine.io/users/me/', {
          headers: {
            'project-id': 'f60faabf-2917-420d-bd08-d73f5a14f220',
            'user-name': user.email,
            'user-secret': user.uid,
          },
        })
        .then(() => {
          // if user is valid, set loading to false
          setLoading(false);
        })
        .catch((e) => {
          // if chat engine profile doesn't exist
          let formData = new FormData();
          formData.append('email', user.email);
          formData.append('username', user.email);
          formData.append('secret', user.uid);

          getFile(user.photoURL).then((avatar) => {
            formData.append('avatar', avatar, avatar.name);
            axios
              .post('https://api.chatengine.io/users/', formData, {
                headers: {
                  'private-key': 'e740c2ca-f4de-46b4-b8fb-dd3e675bb439',
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log('e', e.response));
          });
        });
    }
  }, [user, history]);

  if (!user || loading) return '...loading';
  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>FriendlyChat</div>
        <div className='logout-tab' onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='
f60faabf-2917-420d-bd08-d73f5a14f220'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
