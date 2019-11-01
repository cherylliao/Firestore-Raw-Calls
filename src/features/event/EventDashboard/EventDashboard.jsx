import React, {useState} from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList'

import cuid from 'cuid';
import {connect} from 'react-redux'
import {deleteEvent,updateEvent,createEvent} from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { firestoreConnect } from 'react-redux-firebase';

const mapState = state =>({
  events:state.events,
  loading: state.async.loading
})
const actions = {
  createEvent,
  deleteEvent,
  updateEvent
} 


const EventDashboard=({events,deleteEvent,updateEvent,createEvent,loading})=> {
    
 

    const handleDeleteEvent = id =>{
        deleteEvent(id)
        }
        if(loading) return <LoadingComponent  />
    return (
        <div>
            <Grid>
                <Grid.Column width={10}>
                    <EventList 
                    
                    events={events} 
                    deleteEvent={handleDeleteEvent}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity />
                </Grid.Column>
            </Grid>
        </div>
    )
}
export default connect(mapState,actions)(EventDashboard);