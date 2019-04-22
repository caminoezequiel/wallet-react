import React from 'react'
import moment from 'moment'
// @material-ui
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
})

class List extends React.Component {
  render () {
    let {classes, transactions} = this.props
    if (transactions.length === 0) {
      return <Typography component="h5">There are no transactions yet!</Typography>
    }
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell component="th">Account</TableCell>
              <TableCell component="th">Category</TableCell>
              <TableCell component="th">Amount</TableCell>
              <TableCell component="th">Datetime</TableCell>
              <TableCell component="th" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(row => (
              <TableRow key={row._id}>
                <TableCell scope="row">{row.account.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{`${row.account.currency} ${row.amount}`}</TableCell>
                <TableCell>{moment(row.datetime).format('lll')}</TableCell>
                <TableCell align="right">
                  <IconButton type="button" onClick={() => this.props.onClick('edit', row._id)}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton type="button" onClick={() => this.props.onClick('delete', row._id)}>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(List)
