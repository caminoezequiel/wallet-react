import React from 'react'
// @material-ui
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import AccountBalance from '@material-ui/icons/AccountBalance'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up(350 + theme.spacing.unit * 3 * 2)]: {
      width: 350,
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
      action: props.entity._id ? 'edit' : 'create',
      disabled: false,
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({disabled: true})
    this.props.onEvent(this.state.action, {
      name: this.state.name,
      currency: this.state.currency,
      initAmount: this.state.initAmount
    })
  }

  render () {
    let {classes} = this.props
    return (
      <Paper className={classes.paper}>
        <Avatar>
          <AccountBalance/>
        </Avatar>
        <Typography component="h1" variant="h5">
          {this.state.action} Account
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Account name</InputLabel>
            <Input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange}
                   disabled={this.state.disabled} autoFocus/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="currency">Currency</InputLabel>
            <Select inputProps={{id: 'currency', name: 'currency'}} value={this.state.currency} onChange={this.handleChange}
                    disabled={this.state.disabled}>
              <MenuItem value="ARS">ARS</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="THB">THB</MenuItem>
              <MenuItem value="MYR">MYR</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="initAmount">Starting amount</InputLabel>
            <Input id="initAmount" name="initAmount" type="number" min="0" value={this.state.initAmount}
                   onChange={this.handleChange} disabled={this.state.disabled}/>
          </FormControl>
          <FormGroup>
            <Button type="submit" variant="contained" color="primary" className={classes.btnSubmit}
                    disabled={this.state.disabled}>{this.state.action}</Button>
            <Button type="button" disabled={this.state.disabled} onClick={() => this.props.onEvent('cancel')}>cancel</Button>
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
