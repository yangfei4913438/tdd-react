import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleInputKeyUp = (e) => {
    const { value } = this.state;
    if (e.keyCode === 13 && value) {
      // 调用回调
      this.props.addUndoItem(value)
      // 重置为空
      this.setState({
        value: ''
      })
    }
  }

  render() {
    const  { value } = this.state;
    return <div className={'header'}>
      <div className={'header_content'}>
        TodoList
        <input
          className={'header_input'}
          data-test={'input'}
          value={value}
          placeholder={'请输入Todo'}
          onChange={this.handleInputChange}
          onKeyUp={this.handleInputKeyUp}
        />
      </div>

    </div>
  }
}

export default Header
