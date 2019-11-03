import React,{Fragment} from 'react'
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/event/EventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar/NavBar'
import { Route, Redirect } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage'
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard'
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard'
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage'
import EventForm from '../../features/event/EventForm/EventForm'
import TestComponent from '../../features/testarea/TestComponent'
import ModalManager from '../../features/modals/ModalManager'

import { auth, createUserProfileDocument } from '../../features/auth/firebase.utils';
import CurrentUserContext from '../../app/contexts/current-user/current-user.context'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser: null
    }

  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          this.setState({currentUser:{
            id: snapShot.id,
            
            ...snapShot.data()
          }});
          
        });
        
      }
      
      this.setState({currentUser: userAuth})
      

      
    });
    
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();

  }
 
    render() {
    return (
        <Fragment>
            <ModalManager />
            <Route exact path='/' component={HomePage} />
            <Route path='/(.+)' render={()=>(
                <Fragment>
                  <CurrentUserContext.Provider value={this.state.currentUser}>
                <NavBar />
                </CurrentUserContext.Provider>
                <Container className="main">
                
                    <Route exact path='/events' component={EventDashboard} />
                    <Route path='/events/:id' component={EventDetailedPage} />
                    <Route path='/people' component={PeopleDashboard} />
                    <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Route path='/profile/:id' component={UserDetailedPage} />
                    </CurrentUserContext.Provider>
                    <Route path='/settings' />
                    <CurrentUserContext.Provider value={this.state.currentUser}>
                    <SettingsDashboard />
                     </CurrentUserContext.Provider>
                     <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Route path={['/createEvent','/manage/:id']} component={EventForm} />
                    </CurrentUserContext.Provider>
                    <Route path='/test' component={TestComponent} />
                    </Container>
                    <ToastContainer />
                
                </Fragment>

            )} />
          
        </Fragment>
        
        
    )
}
}

export default App;