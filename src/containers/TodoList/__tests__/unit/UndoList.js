import React from "react";
import { shallow } from 'enzyme';
import UndoList from "../../components/UndoList";

// 统计元素
let countElem
// 列表元素
let listItems
// 定义组件对象
let wrapper
// 定义回调方法
let callback
// 单元测试初始化
beforeAll(() => {
  // shallow 是一个浅渲染，只渲染父组件，不会管子组件。一般用于单元测试。
  wrapper = shallow(<UndoList />)
})
// 每个用例执行之前初始化
beforeEach(() => {
  // 通过属性选择器来定位对象，不要使用类名，避免类名被修改导致的测试用例失效。
  countElem = wrapper.find('[data-test="count"]');
  listItems = wrapper.find('[data-test="list-item"]');
  // 定义回调方法
  callback = jest.fn();
})

describe('UndoList 组件', () => {
  test('初始化状态测试', () => {
    // 断言统计元素显示的值为0
    expect(countElem).toHaveText('0');
    // 断言列表元素的数量为0
    expect(listItems).toHaveLength(0);
  })

  test('外部有值进来的时候测试', () => {
    // 外部传值
    wrapper.setProps({ undoList: [{ status: 'div',  value: 'hi'}, { status: 'div',  value: 'hello'}] })
    // 传值后，会重新渲染，所以需要重新获取对象
    countElem = wrapper.find('[data-test="count"]');
    listItems = wrapper.find('[data-test="list-item"]');
    // 断言统计元素显示的值为0
    expect(countElem).toHaveText('2');
    // 断言列表元素的数量为0
    expect(listItems).toHaveLength(2);
  })

  test('存在删除按钮', () => {
    // 外部传值，确保有数据
    wrapper.setProps({ undoList: [{ status: 'div',  value: 'hi'}, { status: 'div',  value: 'hello'}] })
    // 删除按钮获取
    const deleteItems = wrapper.find('[data-test="delete-item"]');
    // 断言存在按钮的数量和对象一致
    expect(deleteItems).toHaveLength(2)
  })

  test('点击删除按钮测试', () => {
    // 外部传值
    wrapper.setProps({ undoList: [{ status: 'div',  value: 'hi'}, { status: 'div',  value: 'hello'}], deleteItem: callback })
    // 要点击的对象索引
    const clickIndex = 1;
    // 删除按钮获取
    const deleteItems = wrapper.find('[data-test="delete-item"]');
    // 点击第一个删除按钮
    deleteItems.at(clickIndex).simulate('click')
    // 断言调用了回调方法, 参数是对象的索引
    expect(callback).toHaveBeenLastCalledWith(clickIndex)
  })

  test('当某项被点击时，触发 changeStatus 函数', () => {
    // 外部传值
    wrapper.setProps({ undoList: [{ status: 'div',  value: 'hi'}, { status: 'div',  value: 'hello'}], changeStatus: callback })
    // 要点击的对象索引
    const clickIndex = 1;
    // 编辑对象获取
    const editItems = wrapper.find('[data-test="edit-item"]');
    // 点击第一个编辑对象
    editItems.at(clickIndex).simulate('click')
    // 断言调用了回调方法, 参数是对象的索引
    expect(callback).toHaveBeenLastCalledWith(clickIndex)
  })

  test('当编辑对象的旁边空白被点击时，触发 changeStatus 函数', () => {
    // 外部传值
    wrapper.setProps({ undoList: [{ status: 'input',  value: 'hi'}, { status: 'div',  value: 'hello'}], changeStatus: callback })
    // 编辑对象获取
    const editItems = wrapper.find('[data-test="edit-item2"]');
    // 点击第一个编辑对象, 只有编辑对象的旁边，才能被点击，所以索引只能是0
    editItems.at(0).simulate('click')
    // 断言调用了回调方法, 参数是对象的索引
    expect(callback).toHaveBeenLastCalledWith(0)
  })

  test('当某项状态是input时，展示输入框', () => {
    // 外部传值
    wrapper.setProps({ undoList: [{ status: 'input',  value: 'hi'}, { status: 'div',  value: 'hello'}] })
    // 编辑对象获取
    const inputItems = wrapper.find('[data-test="edit-item-input"]');
    // 断言编辑对象中的输入框数量为1
    expect(inputItems).toHaveLength(1);
  })

  test('当某个输入框失去焦点时，触发 handleBlur 函数', () => {
    // 外部传值
    wrapper.setProps({ undoList: [{ status: 'input',  value: 'hi'}, { status: 'div',  value: 'hello'}], handleBlur: callback })
    // 编辑对象获取
    const inputItems = wrapper.find('[data-test="edit-item-input"]');
    // 让对象失去焦点
    inputItems.at(0).simulate('blur');
    // 断言调用了回调方法, 参数是对象的索引
    expect(callback).toHaveBeenLastCalledWith(0)
  })

  it('当输入框变更时，触发 valueChange 方法', () => {
    // 外部传值
    wrapper.setProps({ undoList: [{ status: 'input',  value: 'hi'}, { status: 'div',  value: 'hello'}], valueChange: callback })
    // 编辑对象获取
    const inputItems = wrapper.find('[data-test="edit-item-input"]');
    // 改变新数据
    inputItems.at(0).simulate('change', {
      target: {
        value: '学习 jest'
      }
    });
    // 断言调用了回调方法, 参数是对象的索引
    expect(callback).toHaveBeenLastCalledWith(0, '学习 jest')
  })
})
