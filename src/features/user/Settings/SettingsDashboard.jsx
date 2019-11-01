import React, {useContext} from 'react'
import { Grid } from 'semantic-ui-react'
import SettingsNav from './SettingsNav'
import { Route, Redirect, Switch } from 'react-router-dom'
import BasicPage from './BasicPage'
import AboutPage from './AboutPage'
import PhotosPage from './Photos/PhotosPage'
import AccountPage from './AccountPage'
import CurrentUserContext from '../../../app/contexts/current-user/current-user.context';


const SettingsDashboard = () => {
  const currentUser = useContext(CurrentUserContext)
  
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch> 
          <Redirect exact from= '/settings' to='/settings/basic'/>
        <Route path='/settings/basic' >
        <BasicPage currentUser={currentUser} />
        </Route>
        <Route path='/settings/about' component={AboutPage} />
        <Route path='/settings/photos' component={PhotosPage} />
        <Route path='/settings/account' component={AccountPage} />
        </Switch>
       

      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />

      </Grid.Column>
    </Grid>
  )
}

export default SettingsDashboard
