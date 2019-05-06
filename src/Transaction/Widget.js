import React from 'react'
import { connect } from 'react-redux'
import { actions } from './actions'

// Components
import List from './Component/List'
import Form from './Component/Form'
// @material-ui
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

const mapStateToProps = state => ({
  entity: state.transaction.entity,
  showForm: state.transaction.showForm,
  entities: state.transaction.entities
})

class Widget extends React.Component {
  handleListClick = (action, itemId) => {
    if (action === 'delete') {
      this.props.dispatch(actions.deleteTransaction(itemId))
    }
    if (action === 'edit') {
      this.props.dispatch(actions.showForm(itemId))
    }
  }

  handleAddClick = () => {
    this.props.dispatch(actions.showForm(null))
  }

  handleForm = (action, values) => {
    if (action === 'cancel') {
      this.props.dispatch(actions.hideForm())
    }
    if (action === 'create') {
      this.props.dispatch(actions.createTransaction(values))
    }
    if (action === 'edit') {
      let id = this.props.entity._id
      this.props.dispatch(actions.updateTransaction(id, values))
    }
  }

  render () {
    const {showForm, entity, entities} = this.props
    return (
      <Grid container direction="column">
        <Typography component="h2" variant="h5">
          Transactions
          {!showForm && (
            <IconButton type="button" variant="contained" color="secondary" onClick={this.handleAddClick}>
              <AddIcon/>
            </IconButton>
          )}
        </Typography>
        <Grid container>
          {showForm && <Form entity={entity} onEvent={this.handleForm}/>}
          {!showForm && <List transactions={entities} onClick={this.handleListClick}/>}
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Widget)
