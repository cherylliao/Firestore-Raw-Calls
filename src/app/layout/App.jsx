import React,{Fragment} from 'react'
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/event/EventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar/NavBar'
import { Route } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage'
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard'
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard'
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage'
import EventForm from '../../features/event/EventForm/EventForm'
import TestComponent from '../../features/testarea/TestComponent'
import ModalManager from '../../features/modals/ModalManager'


export default function App() {
    return (
        <Fragment>
            <ModalManager />
            <Route exact path='/' component={HomePage} />
            <Route path='/(.+)' render={()=>(
                <Fragment>
                <NavBar />
                
                <Container className="main">
                
                    <Route exact path='/events' component={EventDashboard} />
                    <Route path='/events/:id' component={EventDetailedPage} />
                    <Route path='/people' component={PeopleDashboard} />
                    <Route path='/profile/:id' component={UserDetailedPage} />
                    <Route path='/settings' component={SettingsDashboard} />
                    <Route path={['/createEvent','/manage/:id']} component={EventForm} />
                    <Route path='/test' component={TestComponent} />
                   
                </Container>
                </Fragment>

            )} />

        </Fragment>
        
    )
}
