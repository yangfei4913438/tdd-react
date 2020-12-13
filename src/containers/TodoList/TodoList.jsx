import React, { Component } from 'react';
import './TodoList.css'
import Header from "./components/Header";
import UndoList from "./components/UndoList";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: []
    }
  }

  addUndoItem = (value) => {
    const { undoList } = this.state;
    this.setState({
      undoList: [].concat(undoList, [{
        status: 'div',
        value
      }])
    })
  }

  deleteItem = (index) => {
    const { undoList } = this.state;
    this.setState({
      undoList: undoList.filter((_, idx) => idx !== index)
    })
  }

  changeStatus = (index) => {
    const { undoList } = this.state;
    // 生成新数组
    const list = [].concat(undoList)
    // 生成更新后的对象
    const newItem = {...undoList[index], status: undoList[index].status === 'div' ? 'input' : 'div'}
    // 更新新数组
    list.splice(index, 1, newItem)
    // 新数组赋值
    this.setState({
      undoList: list
    })
  }

  handleBlur = index => {
    const { undoList } = this.state;
    // 生成新数组
    const list = [].concat(undoList)
    // 生成更新后的对象
    const newItem = {...undoList[index], status: 'div'}
    // 更新新数组
    list.splice(index, 1, newItem)
    // 新数组赋值
    this.setState({
      undoList: list
    })
  }

  valueChange = (index, value) => {
    const { undoList } = this.state;
    // 生成新数组
    const list = [].concat(undoList)
    // 生成更新后的对象
    const newItem = {...undoList[index], value}
    // 更新新数组
    list.splice(index, 1, newItem)
    // 新数组赋值
    this.setState({
      undoList: list
    })
  }

  render() {
    const { undoList } = this.state;
    return <div>
      <Header addUndoItem={this.addUndoItem} />
      <UndoList
        undoList={undoList}
        deleteItem={this.deleteItem}
        changeStatus={this.changeStatus}
        handleBlur={this.handleBlur}
        valueChange={this.valueChange}
      />
    </div>
  }
}

export default TodoList
