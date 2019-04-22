import React from 'react'
// @material-ui
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

// App components

const styles = theme => ({
  card: {
    display: 'flex',
    direction: 'row',
    margin: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
    maxWidth: 400,
  },
  avatar: {
    padding: theme.spacing.unit * 3,
    // backgroundColor: theme.palette.secondary.main,
  },
  actions: {
    display: 'flex',
    direction: 'column'
  }
})

class AccountCard extends React.Component {
  amount () {
    let acc = this.props.account
    return (acc.initAmount + acc.incomeAmount) - acc.expenseAmount
  }

  render () {
    const {account, classes} = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {account.currency}
            </Avatar>
          }
          title={account.name}
          subheader={`${account.currency} ${this.amount()}`}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton type="button" onClick={() => this.props.onClick('edit', account._id)}>
            <EditIcon/>
          </IconButton>
          <IconButton type="button" onClick={() => this.props.onClick('delete', account._id)}>
            <DeleteIcon/>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

AccountCard.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(AccountCard)
