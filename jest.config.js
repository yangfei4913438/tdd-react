module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    // 测试覆盖率通过分析哪些文件生成
    "src/**/*.{js,jsx,ts,tsx}", // 分析这些文件
    "!src/**/*.d.ts", // 排除这些文件
    "!src/index.js", // 排除入口文件
    "!src/App.js", // App文件
  ],
  setupFiles: [
    "react-app-polyfill/jsdom", // 测试时用来解决兼容性
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js", // 环境建立好之后，做一些额外的准备
    "./node_modules/jest-enzyme/lib/index.js",
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}", // 这些文件会被认定位测试文件
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}", // 这些文件也会被认定为测试文件
  ],
  testEnvironment: "jsdom", // 测试运行的环境，node下模拟浏览器环境
  testRunner: "<rootDir>/node_modules/jest-circus/runner.js",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/node_modules/babel-jest", // 引入的文件，会先使用babel-jest来转化
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js", // css文件使用这个对象来处理。
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js", // 剩下文件类型，进行处理
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$", // 忽略node_modules下的文件
    "^.+\\.module\\.(css|sass|scss)$", // 样式文件被忽略
  ],
  modulePaths: [], // 指定寻找位置，如果正常引入找不到
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy", // 样式模块进行处理，变成js对象。
  },
  moduleFileExtensions: [
    // 不写后缀，回来这里找
    "js",
    "ts",
    "tsx",
    "json",
    "jsx",
  ],
  watchPlugins: [
    // jest命令行中的插件, 例如 a 的扩展
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  resetMocks: true,
};
