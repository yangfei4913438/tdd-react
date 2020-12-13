import React, { Component } from "react";
import "./Header.css";
import { connect } from "react-redux";
import { actions } from "../containers/TodoList/todoStore";

// 映射state
const mapState = (state) => {
  // 使用这种方法，为了方便有需要全局state的操作
  const { todo } = state;
  return {
    value: todo.inputValue,
  };
};
// 映射action
const mapDispatch = (dispatch) => ({
  // 修改输入框内容
  handleInputChange(value) {
    dispatch(actions.changeInputValue(value));
  },
});
/**
 * 封装一下连接方法
 * 注意：这里的 connect 不能被封装成函数返回值，否则运行报错！
 * */
const connStore = connect(mapState, mapDispatch);

/**
 * Header 组件
 * @param value 输入框的默认值
 * */
class Header extends Component {
  handleInputKeyUp = (e) => {
    const { value } = this.props;
    // 13表示回车键
    if (e.keyCode === 13 && value) {
      // 调用回调
      this.props.addUndoItem(value);
      // 重置为空
      this.props.handleInputChange("");
    }
  };

  render() {
    const { value, handleInputChange } = this.props;
    return (
      <div className={"header"}>
        <div className={"header_content"}>
          TodoList
          <input
            className={"header_input"}
            data-test={"header_input"}
            value={value}
            placeholder={"请输入Todo"}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    );
  }
}

export default connStore(Header);
