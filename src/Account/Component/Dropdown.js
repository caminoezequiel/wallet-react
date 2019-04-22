import React from 'react'
import AccountService from '../Service'
// @material-ui
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export default class Dropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value || '',
      accounts: []
    }
  }

  componentDidMount () {
    AccountService.retrieve().then(entities => {
      this.setState({accounts: entities})
    })
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
    this.props.onChange({target: {name: event.target.name, value: event.target.value}})
  }

  render () {
    let options = this.state.accounts.map(a => {
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
