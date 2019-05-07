import React from 'react'
import { connect } from 'react-redux'
import { actions } from './actions'
// components
import Form from './Component/Form'
import AccountCard from './Component/AccountCard'
// @material-ui
import Grid from '@material-ui/core/Grid/Grid'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const mapStateToProps = state => ({
  entity: state.account.entity,
  showForm: state.account.showForm,
  entities: state.account.entities
})

class Widget extends React.Component {
  handleListClick = (action, itemId) => {
    if (action === 'delete') {
      this.props.dispatch(actions.deleteAccount(itemId))
    }
    if (action === 'edit') {
      this.props.dispatch(actions.showForm(itemId))
    }
  }

  handleAddAccountClick = () => {
    this.props.dispatch(actions.showForm(null))
  }

  handleSubmit = (action, values) => {
    if (action === 'cancel') {
      this.props.dispatch(actions.hideForm())
    }
    if (action === 'create') {
      this.props.dispatch(actions.createAccount(values))
    }
    if (action === 'edit') {
      this.props.dispatch(actions.updateAccount(this.props.entity._id, values))
    }
  }

  render () {
    let {showForm, entity, entities} = this.props
    return (
      <Grid container direction="column">
        <Typography component="h2" variant="h5">
          Accounts
          {!showForm && (
            <IconButton type="button" variant="contained" color="secondary" onClick={this.handleAddAccountClick}>
              <AddIcon/>
            </IconButton>
          )}
        </Typography>
        <Grid container>
          {showForm && <Form entity={entity} onEvent={this.handleSubmit}/>}
          {!showForm && entities.length === 0 && <Typography component="h5">There are no accounts yet!</Typography>}
          {!showForm && entities.length > 0 && entities.map(item => {
            return <AccountCard key={item._id} account={item} onClick={this.handleListClick}/>
          })}
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Widget)
