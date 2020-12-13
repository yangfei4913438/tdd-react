// 返回捕获的元素
export function findTestElem(wrapper, key)  {
  return wrapper.find(`[data-test='${key}']`);
}
