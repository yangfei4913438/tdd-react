import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import TodoList from "../TodoList";
import { findTestElem } from "../../../utils";
// 全局的Store
import store from "../../../store";

// 列表元素
let listItems;
// 定义输入框的DOM变量
let inputElem;
// 定义组件对象
let wrapper;
// 定义组件查询元素的方法
let findElem = () => {};
// 单元测试初始化
beforeAll(() => {
  // mount 会连子组件一起渲染出来，用于集成测试。
  // redux的包裹要单独做一次，否则会识别出错。
  wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  // 进一步封装一下，避免每次都要传两个值
  findElem = (key) => {
    return findTestElem(wrapper, key);
  };
});

beforeEach(() => {
  // 输入框获取
  inputElem = findElem("header_input");
  // 列表元素
  listItems = findElem("list-item");
});

it("测试异步请求的结果", () => {
  // 获取组件对象
  const TodoList = wrapper.find("TodoList");
  // 打印实例对象
  // console.log(TodoList.instance().state);
  // 断言获取了更新数据的列表
  expect(TodoList).toHaveState("undoList", [
    {
      status: "div",
      value: "fei",
    },
  ]);
});

it("用户行为测试:\n\t1、Header 输入框输入内容\n\t2、点击回车\n\t3、列表中展示用户输入的内容项", () => {
  // 定义用户输入内容
  const content = "yang";
  // 模拟输入
  inputElem.simulate("change", {
    target: { value: content },
  });
  // dom对象变更后，需要重新取值，否则取出来的就是之前未修改的值
  inputElem = findElem("header_input");
  // 触发回车
  inputElem.simulate("keyUp", {
    keyCode: 13,
  });
  // 列表元素，数据变化后，要重新获取
  listItems = findElem("list-item");
  // 断言，列表里面有两个元素
  expect(listItems).toHaveLength(2);
  // 断言，对象的值, 因为有个 - ，所以这里要加上
  expect(listItems.at(1)).toHaveText(content + "-");
});
