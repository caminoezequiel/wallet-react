import React from 'react'
import List from './Component/List'
import Service from './Service'
import Transaction from './Model/Transaction'
import Form from './Component/Form'
// @material-ui
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

export default class Widget extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showForm: false,
      entities: []
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
      this.setState({
        entity: new Transaction(entity._id, entity.type, entity.amount, entity.account._id || entity.account, entity.category, entity.datetime),
        showForm: true
      })
    }
  }

  handleAddClick = () => {
    this.setState({entity: new Transaction(), showForm: true})
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
          Transactions
          {!this.state.showForm && (
            <IconButton type="button" variant="contained" color="secondary" onClick={this.handleAddClick}>
              <AddIcon/>
            </IconButton>
          )}
        </Typography>
        <Grid container>
          {this.state.showForm && <Form entity={this.state.entity} onEvent={this.handleForm}/>}
          {!this.state.showForm && <List transactions={this.state.entities} onClick={this.handleListClick}/>}
        </Grid>
      </Grid>
    )
  }
}
