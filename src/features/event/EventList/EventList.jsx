import React,{Fragment} from 'react'
import EventListItem from './EventListItem'

export default function EventList(props) {
    const {events,deleteEvent}=props
    return (
        <Fragment>
            {events && events.map(event =>(
                <EventListItem key={event.id} event ={event} 
              
                deleteEvent={deleteEvent}
                />

            ))}
            
        
        </Fragment>
    )
            
}
