import React from 'react'
// material ui
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
// my components
import Service from '../Service'

const styles = theme => ({
  grid: {
    [theme.breakpoints.up(450 + theme.spacing.unit * 3 * 2)]: {
      width: 450,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.password !== this.state.rePassword) {
      return
    }
    Service.signUp(this.state.name, this.state.email, this.state.password).then(response => {
      if (response.success) {
        this.props.history.push('/auth/sign-in')
      }
    })
  }

  render () {
    const {classes} = this.props
    return (
      <Grid container direction="column" justify="center" alignItems="center" className={classes.grid}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" name="name" type="text" autoComplete="name" value={this.state.name} onChange={this.handleChange} autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="email" type="text" autoComplete="email" value={this.state.email} onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="rePassword">Confirm password</InputLabel>
              <Input id="rePassword" name="rePassword" type="password" value={this.state.rePassword} onChange={this.handleChange}/>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    )
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(SignUp)
