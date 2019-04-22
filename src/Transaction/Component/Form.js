import React from 'react'
import AccountService from '../../Account/Service'
import AccountSelect from '../../Account/Component/Dropdown'
// @material-ui
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import AccountBalance from '@material-ui/icons/AccountBalance'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input/Input'
import Select from '@material-ui/core/Select/Select'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

const styles = theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  datetime: {
    justifyContent: 'space-between',
    display: 'flex'
  },
  btnSubmit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1
  }
})

class Form extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      ...props.entity,
      accounts: [],
      action: props.entity._id ? 'edit' : 'create',
      submitting: false,
    }
  }

  componentDidMount () {
    AccountService.retrieve().then(entities => {
      this.setState({accounts: entities})
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleDateChange = (value) => {
    this.setState({datetime: value.format()})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({submitting: true})
    this.props.onEvent(this.state.action, {
      type: this.state.type,
      amount: this.state.amount,
      account: this.state.account,
      category: this.state.category,
      datetime: this.state.datetime,
    })
    return false
  }

  render () {
    let {classes} = this.props
    return (
      <Paper className={classes.paper}>
        <Avatar>
          <AccountBalance/>
        </Avatar>
        <Typography component="h1" variant="h5">
          {this.state.action} transaction
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="type">Type</InputLabel>
            <Select inputProps={{id: 'type', name: 'type'}} value={this.state.type} onChange={this.handleChange}
                    disabled={this.state.submitting}>
              <MenuItem value="expense">expense</MenuItem>
              <MenuItem value="income">income</MenuItem>
              <MenuItem value="transfer">transfer</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input id="amount" name="amount" type="number" min="0" value={this.state.amount} onChange={this.handleChange}
                   disabled={this.state.submitting}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="account">Account</InputLabel>
            <AccountSelect id="account" name="account" value={this.state.account} onChange={this.handleChange}
                           disabled={this.state.submitting}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="category">Cagtegory</InputLabel>
            <Input id="category" name="category" type="text" value={this.state.category} onChange={this.handleChange}
                   disabled={this.state.submitting}/>
          </FormControl>
          <div className={classes.datetime}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker margin="normal" label="Date" value={this.state.datetime} onChange={this.handleDateChange}
                          disabled={this.state.submitting}/>
              <TimePicker margin="normal" label="Time" value={this.state.datetime} onChange={this.handleDateChange}
                          disabled={this.state.submitting}/>
            </MuiPickersUtilsProvider>
          </div>
          <FormGroup>
            <Button type="submit" variant="contained" color="primary" disabled={this.state.submitting}>{this.state.action}</Button>
            <Button type="button" disabled={this.state.submitting} onClick={() => this.props.onEvent('cancel')}>cancel</Button>
          </FormGroup>
        </form>
      </Paper>
    )
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Form)
