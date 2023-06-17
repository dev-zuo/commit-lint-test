module.exports = {
  extends: [
    "stylelint-config-standard", // 普通css，默认
    "stylelint-config-standard-scss", // scss 支持
  ],
  rules: {
    "max-empty-lines": 1, // css 最大空白行 1
    "max-nesting-depth": 2, // 样式最大嵌套层数，总共最多 3 层
  },
  overrides: [
    {
      files: ["**/*.{html,vue}"],
      customSyntax: "postcss-html", // 支持 HTML 包括 Vue SFC
    },
  ],
};
