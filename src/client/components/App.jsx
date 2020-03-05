import React from 'react'
import AppBar from './AppBar'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'

// routes
import Home from './Home'
import Location from './criterias/Location'
import Mood from './criterias/Mood'
import Ranking from './criterias/Ranking'
import Budget from './criterias/Budget'
import Explore from './Explore/index'
import Destination from './Destination'
import SignIn from './SignIn'
import About from './About'
import Forums from './Forums'
import SignUp from './SignUp'
import UserProfile from './UserProfile'
import UserInfo from './UserInfo'
import Invitations from './InvitationsList'
import Popularity from './criterias/Popularity'

const App = () =>
  <HashRouter>
    <AppBar/>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/explore' component={Explore}/>
      <Route exact path='/explore-location' component={Location}/>
      <Route exact path='/explore-mood' component={Mood}/>
      <Route exact path='/explore-ranking' component={Ranking}/>
      <Route exact path='/explore-budget' component={Budget}/>
      <Route exact path='/explore-popularity' component={Popularity}/>
      <Route exact path='/destination/:id' render={props => <Destination {...props}/>}/>
      <Route exact path='/forums' component={Forums}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/sign-in' component={SignIn}/>
      <Route exact path='/sign-up' component={SignUp}/>
      <Route exact path='/user-profile' component={UserProfile}/>
      {/* <Route exact path='/user-info' component={UserInfo}/> */}
      <Route render={() => <Redirect to='/'/>}/>
    </Switch>
  </HashRouter>

export default App
