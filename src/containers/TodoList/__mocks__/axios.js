// 模拟 undoList 接口返回
// 前端不需要保证后端的接口数据正确。后端的接口，应该由后端的接口测试负责处理。
const undoList = {
  data: [
    {
      status: "div",
      value: "fei",
    },
  ],
  success: true,
};

// 模拟 axios 组件, 测试文件会使用这个 axios 替换组件中的 axios
const axios = {
  // 模拟get方法
  get(url) {
    if (url === "/undoList.json") {
      return new Promise((resolve, reject) => {
        resolve(undoList);
      });
    }
  },
};

export default axios;
