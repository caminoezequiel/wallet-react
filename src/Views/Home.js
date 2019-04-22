import React, { Fragment } from 'react'
// @material-ui
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

// app components
import AccountWidget from '../Account/Widget'
import TransactionWidget from '../Transaction/Widget'

const styles = theme => ({
  container: {
    paddingLeft:  theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 10,
  },
  gridItem: {
    // width: theme.spacing.unit * 100,
  }
})

class Home extends React.Component {
  render () {
    const {classes} = this.props
    return (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" alignItems="center" justify="center" className={classes.container}>
          <AccountWidget/>
          <TransactionWidget/>
        </Grid>
      </Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Home)
