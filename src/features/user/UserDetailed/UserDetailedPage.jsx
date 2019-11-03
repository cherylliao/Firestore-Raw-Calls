import React, { useContext, useState} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import CurrentUserContext from '../../../app/contexts/current-user/current-user.context';
import {firestore, auth, storage} from '../../auth/firebase.utils';
import {Link} from 'react-router-dom'

import format from 'date-fns/format'


const UserDetailedPage =()=> {
  
   const currentUser = useContext(CurrentUserContext)
   const [url, setUrl] = useState('')
   if(currentUser)
   {
     var name = currentUser.displayName
     var location = currentUser.city
     var origin = currentUser.origin
     var about = currentUser.about
     var job = currentUser.occupation
     var likes = currentUser.interests
     var age = differenceInYears(Date.now(), currentUser.dateOfBirth.toDate())
    var storageRef = storage.ref();
    var imageRef = storageRef.child(`images/${auth.currentUser.uid}`);
    imageRef.getDownloadURL().then(function(url){
      setUrl(url)
      })
     
     
   }
  
      
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                              
                                <Item.Image avatar size='small' src={`${url}`}/> 
                             
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{name}</Header>
                                    <br/>
                                    <Header as='h3'>{job}</Header>
                                    <br/>
                                    <Header as='h3'>{}, Lives in {location}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='About Display Name'/>
                                <p>I am a: <strong>Occupation Placeholder</strong></p>
                                <p>Originally from <strong>{origin}</strong></p>
                                
                                <p>{about}</p>

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                    <Item>
                                        <Icon name='heart'/>
                                        <Item.Content>{likes}</Item.Content>
                                    </Item>
                                    
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button  as ={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/>
                    </Segment>
                </Grid.Column>

                {/* <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='image' content='Photos'/>
                        
                        <Image.Group size='small'>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                        </Image.Group>
                    </Segment>
                </Grid.Column> */}

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='calendar' content='Events'/>
                        <Menu secondary pointing>
                            <Menu.Item name='All Events' active/>
                            <Menu.Item name='Past Events'/>
                            <Menu.Item name='Future Events'/>
                            <Menu.Item name='Events Hosted'/>
                        </Menu>

                        <Card.Group itemsPerRow={5}>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    
}

export default UserDetailedPage;