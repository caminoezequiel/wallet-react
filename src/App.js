import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Home from './Views/Home'
import SignIn from './Auth/Component/SignIn'
import SignUp from './Auth/Component/SignUp'
import PrivateRoute from './Auth/Component/PrivateRoute'

class App extends React.Component {
  render () {
    return (
      <Fragment>
        <CssBaseline/>
        <Router>
          <Switch>
            <Redirect exact from="/auth" to="/auth/sign-in"/>
            <Route path="/auth/sign-in" component={SignIn}/>
            <Route path="/auth/sign-up" component={SignUp}/>
            <PrivateRoute>
              <Route path="/" component={Home} exact/>
            </PrivateRoute>
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default App
