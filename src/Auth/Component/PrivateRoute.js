import React from 'react'
import { Redirect } from 'react-router-dom'
import Session from '../../Common/Session'

class PrivateRoute extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logged: undefined
    }
  }

  componentDidMount () {
    // todo: if it has token, validate token before
    this.setState({logged: Session.getUser() !== null})
  }

  render () {
    if (this.state.logged === undefined) {
      return (
        <div>Loading...</div>
      )
    }

    if (!this.state.logged) {
      return (
        <Redirect
          to={{
            pathname: '/auth/sign-in',
            state: {from: this.props.location}
          }}
        />
      )
    }
    return this.props.children
  }
}

export default PrivateRoute
