import React from 'react'
// @material-ui
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  accounts: state.account.entities
})

class Dropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value || '',
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
    this.props.onChange({target: {name: event.target.name, value: event.target.value}})
  }

  render () {
    let options = this.props.accounts.map(a => {
      return <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
    })
    return (
      <Select inputProps={{id: this.props.id, name: this.props.name}} value={this.state.value} onChange={this.handleChange}
              disabled={this.props.disabled}>
        {options}
      </Select>
    )
  }
}

export default connect(mapStateToProps)(Dropdown)
