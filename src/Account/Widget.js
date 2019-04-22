import React from 'react'
import Form from './Component/Form'
import Account from './Model/Account'
import Service from './Service'
import AccountCard from './Component/AccountCard'
// @material-ui
import Grid from '@material-ui/core/Grid/Grid'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

export default class Widget extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      entity: new Account(),
      entities: [],
      showForm: false
    }
  }

  componentDidMount () {
    Service.retrieve().then(entities => {
      this.setState({entities: entities})
    })
  }

  handleListClick = (action, itemId) => {
    if (action === 'delete') {
      this.delete(itemId)

    }
    if (action === 'edit') {
      let entity = this.state.entities.find(e => e._id === itemId)
      this.setState({entity, showForm: true})
    }
  }

  handleAddAccountClick = () => {
    this.setState({entity: new Account(), showForm: true})
  }

  handleForm = (action, values) => {
    if (action === 'cancel') {
      this.setState({entity: null, showForm: false})
    }
    if (action === 'create' || action === 'edit') {
      this[action](values)
    }
  }

  create = (values) => {
    Service.create(values).then(entity => {
      this.setState({
        entity: null,
        showForm: false,
        entities: [...this.state.entities, entity]
      })
    })
  }

  edit = (values) => {
    let id = this.state.entity._id
    Service.update(id, values).then(entity => {
      this.setState({
        entity: null,
        showForm: false,
        entities: this.state.entities.map(e => (e._id === id) ? entity : e)
      })
    })
  }

  delete = (id) => {
    Service.remove(id).then(wasSuccess => {
      if (wasSuccess) {
        this.setState({
          entities: this.state.entities.filter(e => e._id !== id)
        })
      }
    })
  }

  render () {
    return (
      <Grid container direction="column">
        <Typography component="h2" variant="h5">
          Accounts
          {!this.state.showForm && (
            <IconButton type="button" variant="contained" color="secondary" onClick={this.handleAddAccountClick}>
              <AddIcon/>
            </IconButton>
          )}
        </Typography>
        <Grid container>
          {this.state.showForm && <Form entity={this.state.entity} onEvent={this.handleForm}/>}
          {!this.state.showForm && this.state.entities.length === 0 && <Typography component="h5">There are no accounts yet!</Typography>}
          {!this.state.showForm && this.state.entities.length > 0 && this.state.entities.map(item => {
            return <AccountCard key={item._id} account={item} onClick={this.handleListClick}/>
          })}
        </Grid>
      </Grid>
    )
  }
}
