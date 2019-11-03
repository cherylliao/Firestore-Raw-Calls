// import React, {Fragment, useState} from 'react'
// import {Image, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';
// import {storage, auth, firebase} from '../../../auth/firebase.utils';
// const UserPhotos = ({currentUser}) => {
//     const [url, setUrl] = useState('')
//     const display =() =>{    
//     var imageRef= storage.ref(`images/${auth.currentUser.uid}`)
//     imageRef.getDownloadURL().then(function(url){
//         setUrl(url)

//     })}
//   return (
//       <Fragment>
//     <Header sub color='teal' content='All Photos'/>

//                 <Card.Group itemsPerRow={5}>
//                     <Card>
//                         <Image src={`${url}`} />
//                         <Button positive onClick={display}>Main Photo</Button>
//                     </Card>

//                         <Card >
//                             <Image
//                                 src='https://randomuser.me/api/portraits/men/20.jpg'
//                             />
//                             <div className='ui two buttons'>
//                                 <Button basic color='green'>Main</Button>
//                                 <Button basic icon='trash' color='red' />
//                             </div>
//                         </Card>
//                 </Card.Group>
//                 </Fragment>
//   )
// }

// export default UserPhotos
