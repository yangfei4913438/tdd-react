import React from "react";
import { shallow } from 'enzyme';
import TodoList from "../../TodoList";

// 定义组件对象
let wrapper
// 单元测试初始化
beforeAll(() => {
  // shallow 是一个浅渲染，只渲染父组件，不会管子组件。一般用于单元测试。
  wrapper = shallow(<TodoList />)
})

describe('TodoList 组件', () => {
  test('组件渲染样式不变', () => {
    // 断言快照一致
    // 主要是判断内容是否发生变化，CSS发生变化无法监控
    expect(wrapper).toMatchSnapshot();
  })

  test('初始化列表为空', () => {
    // 断言dom对象存在
    expect(wrapper).toHaveState('undoList', [])
  })

  test('Header组件，存在 addUndoItem 属性，值是是实例的 addUndoItem 方法', () => {
    // 找到 Header 组件
    const Header = wrapper.find('Header');
    // 断言dom对象, 存在对象实例上的方法 => 所有的组件方法，都是组件实例上的方法
    expect(Header).toHaveProp('addUndoItem', wrapper.instance().addUndoItem);
  })

  test('当 addUndoItem 方法被调用时，undoList 应该新增内容', () => {
    // 触发回调
    wrapper.instance().addUndoItem('学习 jest');
    // 断言状态 undoList 的值为 [{ status: 'div',  value: '学习 jest'}]
    expect(wrapper).toHaveState('undoList',[{
      status: 'div',
      value: '学习 jest'
    }])
  })

  test('应该给 UndoList 传递渲染列表 undoList, 以及回调方法 deleteItem, changeStatus，handleBlur, valueChange', () => {
    // 找到 UndoList 组件
    const UndoList = wrapper.find('UndoList');
    // 断言dom对象, 存在对象实例上的数据
    expect(UndoList).toHaveProp('undoList', wrapper.instance().state.undoList);
    // 断言dom对象上，存在对象实例上的方法 => 所有的组件方法，都是组件实例上的方法
    expect(UndoList).toHaveProp('deleteItem', wrapper.instance().deleteItem);
    // 断言DOM对象上，存在 changeStatus
    expect(UndoList).toHaveProp('changeStatus', wrapper.instance().changeStatus);
    // 断言DOM对象上，存在 handleBlur
    expect(UndoList).toHaveProp('handleBlur', wrapper.instance().handleBlur);
    // 断言DOM对象上，存在 valueChange
    expect(UndoList).toHaveProp('valueChange', wrapper.instance().valueChange);
  })

  test('当 deleteItem 方法被调用时，undoList 应该删除内容', () => {
    // 设置初始列表
    wrapper.setState({undoList: [{ status: 'div',  value: 'hi'}, { status: 'div',  value: 'hello'}]});
    // 触发删除回调
    wrapper.instance().deleteItem(1);
    // 断言最后的 undoList 数组
    expect(wrapper).toHaveState('undoList', [{ status: 'div',  value: 'hi'}])
  })

  test('当 changeStatus 方法被调用时，undoList 应该修改内容', () => {
    // 设置初始列表, 测试的时候
    wrapper.setState({undoList: [{ status: 'div',  value: 'hi'}, { status: 'div',  value: 'hello'}]});
    // 触发修改回调, 指定修改第二个
    wrapper.instance().changeStatus(1);
    // 断言最后的 undoList 数组
    expect(wrapper).toHaveState('undoList', [{ status: 'div',  value: 'hi'}, { status: 'input',  value: 'hello'}])
    // 针对代码中的处理，这里需要执行两次不同的。
    // const newItem = {...undoList[index], status: undoList[index].status === 'div' ? 'input' : 'div'}
    // 触发修改回调, 指定修改第二个
    wrapper.instance().changeStatus(1);
    // 断言最后的 undoList 数组
    expect(wrapper).toHaveState('undoList', [{ status: 'div',  value: 'hi'}, { status: 'div',  value: 'hello'}])
  })

  test('当 handleBlur 方法被调用时，undoList 应该修改内容', () => {
    // 设置初始列表, 测试的时候
    wrapper.setState({undoList: [{ status: 'input',  value: 'hi'}, { status: 'div',  value: 'hello'}]});
    // 触发修改回调, 指定修改第二个
    wrapper.instance().handleBlur(0);
    // 断言最后的 undoList 数组
    expect(wrapper).toHaveState('undoList', [{ status: 'div',  value: 'hi'}, { status: 'div',  value: 'hello'}])
  })

  test('当 valueChange 方法被调用时，undoList 应该修改内容', () => {
    // 设置初始列表, 测试的时候
    wrapper.setState({undoList: [{ status: 'input',  value: 'hi'}, { status: 'div',  value: 'hello'}]});
    // 触发修改回调, 指定修改第1个
    wrapper.instance().valueChange(0, 'ok');
    // 断言最后的 undoList 数组
    expect(wrapper).toHaveState('undoList', [{ status: 'input',  value: 'ok'}, { status: 'div',  value: 'hello'}])
  })
})
