import React, {Fragment, useState, useContext} from 'react'
import {Image, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';
import {storage, auth, firebase} from '../../../auth/firebase.utils';
import PhotoContext from '../../../../app/contexts/current-user/photo.context'
const UserPhotos = () => {
    const url = useContext(PhotoContext)
    
   
  return (
    
     
    <Image src={`${url}`} />
    



               
  )
}

export default UserPhotos
