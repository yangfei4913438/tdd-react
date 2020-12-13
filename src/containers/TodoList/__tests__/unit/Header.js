import React from "react";
import { shallow } from 'enzyme';
import Header from "../../components/Header";

// 定义输入框的DOM变量
let inputElem
// 定义组件对象
let wrapper
// 定义回调方法
let headerCallback
// 单元测试初始化
beforeAll(() => {
  // shallow 是一个浅渲染，只渲染父组件，不会管子组件。一般用于单元测试。
  wrapper = shallow(<Header />)
})
// 每个用例执行之前初始化
beforeEach(() => {
  // 通过属性选择器来定位对象，不要使用类名，避免类名被修改导致的测试用例失效。
  inputElem = wrapper.find('[data-test="input"]');
  // 回调方法重置
  headerCallback = jest.fn();
})

describe('Header 组件', () => {
  test('组件渲染样式不变', () => {
    // 断言快照一致
    // 主要是判断内容是否发生变化，CSS发生变化无法监控
    expect(wrapper).toMatchSnapshot();
  })

  test('组件包含一个 input 框', () => {
    // 断言dom对象存在
    expect(inputElem).toExist();
  })

  test('inout 框, 初始化应该为空', () => {
    // 断言dom存在属性value, 值为空字符串
    // 如果用户不进行任何操作，此时应该是初始状态。
    expect(inputElem).toHaveProp('value', '');
  })

  test('inout 框, 当用户输入时，值会跟随变化', () => {
    const userInput = '今天开始学习jest'
    // 模拟用户输入, 第一个参数是事件类型，第二个参数是event
    inputElem.simulate('change', {
      target: {
        value: userInput
      }
    })
    // 数据测试
    // 断言用户输入的值, 是上面定义的
    expect(wrapper).toHaveState('value', userInput);
    // dom测试
    // dom对象变更后，需要重新取值，否则取出来的就是之前未修改的值
    inputElem = wrapper.find('[data-test="input"]');
    // 断言DOM上的属性，是上面定义的
    expect(inputElem).toHaveProp('value', userInput)
  })

  test('inout 框输入回车时，如果无内容，无操作', () => {
    // 传入了回调方法
    wrapper.setProps({ addUndoItem: headerCallback })
    // 初始化state
    wrapper.setState({ value: '' });
    // dom对象变更后，需要重新取值，否则取出来的就是之前未修改的值
    inputElem = wrapper.find('[data-test="input"]');
    // 触发回车
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    // 断言，回调方法，没有被调用过
    expect(headerCallback).not.toHaveBeenCalled()
  })

  test('inout 框输入回车时，如果有内容，回调函数应该被调用', () => {
    // 传入了回调方法
    wrapper.setProps({ addUndoItem: headerCallback })
    // dom对象变更后，需要重新取值，否则取出来的就是之前未修改的值
    inputElem = wrapper.find('[data-test="input"]');

    // 定义用户要输入的内容
    const userInput = '今天开始学习jest'
    // 模拟用户输入
    inputElem.simulate('change', {
      target: {
        value: userInput
      }
    })
    // 触发回车
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    // 断言，回调方法，被调用过，参数是上面模拟的输入
    expect(headerCallback).toHaveBeenCalledWith(userInput);
    // 输入完成之后，输入框应该是重置为空
    // 数据测试
    // 断言用户输入的值, 是上面定义的
    expect(wrapper).toHaveState('value', '');
    // dom测试
    // dom对象变更后，需要重新取值，否则取出来的就是之前未修改的值
    inputElem = wrapper.find('[data-test="input"]');
    // 断言DOM上的属性，是上面定义的
    expect(inputElem).toHaveProp('value', '')
  })
})
