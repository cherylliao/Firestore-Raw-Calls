import React,{useContext, Fragment, useState} from 'react'
import {Image, Button} from 'semantic-ui-react';

import {storage, auth, firebase} from '../../../auth/firebase.utils';
import {toast} from 'react-toastify';
const UserPhoto = ({currentUser}) => {
    
   
    const [url, setUrl] = useState(' ')
    var storageRef = storage.ref();
    if(currentUser){
    var imageRef = storageRef.child(`images/${auth.currentUser.uid}`);
    imageRef.getDownloadURL().then(function(url){
        setUrl(url)
        })}
  return (
    
      <Image src={`${url}`} />
    
   
  )
}

export default UserPhoto
