import React, { Component } from "react";
import "./UndoList.css";

class UndoList extends Component {
  static defaultProps = {
    undoList: [],
  };

  render() {
    const {
      undoList,
      deleteItem,
      changeStatus,
      handleBlur,
      valueChange,
    } = this.props;
    return (
      <div className={"undo_list"}>
        <div className={"undo_list_title"}>
          正在进行
          <div data-test={"count"} className={"undo_list_count"}>
            {undoList.length}
          </div>
        </div>
        <ul className={"undo_list_content"}>
          {undoList.map((item, idx) => {
            return (
              <li
                key={idx}
                data-test={"list-item"}
                className={"undo_list_item"}
              >
                {item.status === "input" ? (
                  <>
                    <input
                      className={"undo_list_item_input"}
                      data-test={"edit-item-input"}
                      value={item.value}
                      onBlur={() => handleBlur(idx)}
                      onChange={(e) => valueChange(idx, e.target.value)}
                    />
                    <div
                      className={"undo_list_item_input_bak"}
                      data-test={"edit-item2"}
                      onClick={() => changeStatus(idx)}
                    />
                  </>
                ) : (
                  <div
                    className={"undo_list_item_text"}
                    data-test={"edit-item"}
                    onClick={() => changeStatus(idx)}
                  >
                    {item.value}
                  </div>
                )}
                <div
                  data-test={"delete-item"}
                  className={"undo_list_del"}
                  onClick={() => deleteItem(idx)}
                >
                  -
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UndoList;
