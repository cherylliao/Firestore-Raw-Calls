import React, {useState, useEffect, Fragment, useContext} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card,Item} from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput'
import CropperInput from './CropperInput';
import {storage, auth, firebase} from '../../../auth/firebase.utils';
import {toast} from 'react-toastify';
import UserPhoto from './UserPhoto'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const PhotosPage =({currentUser}) => {
        const [files, setFiles] = useState([])
        const [image, setImage] =useState(null)
        

        useEffect (()=>{
            return ()=>{
                files.forEach(file => URL.revokeObjectURL(file.preview))
            }
            
        }, [files])
        const handleUploadImage =() =>{
           console.log(image)
           var storageRef = storage.ref();
        var imageRef = storageRef.child(`images/${auth.currentUser.uid}`)
           imageRef.put(image).then(function(snapshot){
            toast.success("Profile pic uploaded")
           })
           
    
        
    }
          
    const deletePhoto = e =>{
        //delete the photo from storage
        var storageRef = storage.ref();
        var imageRef = storageRef.child(`images/${auth.currentUser.uid}`)
        imageRef.delete().then(function() {
            toast.success("Profile pic deleted")
          }).catch(function(error) {
            toast.error("Cannot be deleted")
          });
        
    }     
const handleCancelCrop =() =>{
            setFiles([])
        }
        
        
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                        <DropzoneInput setFiles={setFiles}/>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                        {files.length >0 &&
                        
                        <CropperInput setImage = {setImage} imagePreview={files[0].preview}/>}
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview & Upload' />
                        {files.length > 0 &&
                        (<Fragment>
                        <div className='img-preview' 
                         style={{minHeight: '200px', minWidth:'200px', overflow:'hidden'}} />
                          <Button.Group>
                              <Button onClick = {handleUploadImage}
                              style = {{width: '100px'}}
                              positive icon='check'
                              />
                              <Button onClick = {handleCancelCrop}
                              style = {{width: '100px'}}
                               icon='close'
                              />
                          </Button.Group>
                         </Fragment>)}
                    </Grid.Column>

                </Grid>

                <Divider/>
                <Header sub color='teal' content='Delete Profile Picture'/>
                  
                   <Card>
                   <UserPhoto currentUser = {currentUser} /> 
                   </Card>
              
                   <Button onClick = {deletePhoto } basic icon='trash' color='red' />
                   
                <ToastContainer />
            </Segment>
        );
    
}

export default PhotosPage;