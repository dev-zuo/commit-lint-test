# commit-lint-test

规范化 husky + commit lint（提交消息校验、StyleLint、ESLint、Prettier、Lint staged 等）

1. 安装 husky
2. 使用 commitlint 拦截提交信息，分支 [commit-msg-lint](https://github.com/dev-zuo/commit-lint-test/tree/commit-msg-lint)
3. 使用 stylelint 拦截不规范 style 样式，分支 [stylelint](https://github.com/dev-zuo/commit-lint-test/tree/stylelint)
4. 使用 eslint+prettier+lint-staged 校验 js/vue 格式化代码，提交拦截（综合前面几点），分支 [eslint-prettier](https://github.com/dev-zuo/commit-lint-test/tree/eslint-prettier)

## husky 提交拦截

> You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.

当在 git commit 或 git push 时，可以使用 [husky](https://typicode.github.io/husky/getting-started.html) 校验提交消息、运行测试、lint 代码等。 Husky 支持所有 Git 钩子。

### 安装

安装 husky，并自动完成初始化

```js
npx husky-init
```

::: warning
安装 husky 时，需要项目是一个 git 管理的项目（如果不是，请先运行 git init）

因为 husky 是基于 [git hooks](https://git-scm.com/docs/githooks) （比如 pre-commit）来做提交拦截、校验
:::

它会自动完成以下操作

1. Add prepare script to package.json（`"prepare": "husky install"`）
2. Create a sample pre-commit hook that you can edit (by default, npm test will run when you commit)
3. Configure Git hooks path

会自动创建 .husky 目录，结构如下

```bash
├── .husky
│   ├── _
│   │   ├── .gitigore
│   │   └── husky.sh
└── pre-commit # 提交钩子，提交前默认执行 npm test
```

执行安装 log

```bash
C:\Users\Administrator\Desktop\commit-lint-test> npx husky-init
# Need to install the following packages:
#  husky-init@8.0.0
# Ok to proceed? (y) y（选择 y 安装）
# husky-init updating package.json
#   setting prepare script to command "husky install"
# husky - Git hooks installed
# husky - created .husky/pre-commit

# please review changes in package.json
```

### 运行

安装完成后，运行 `git commit -m 'xx'` 时会执行默认创建的 `.husky/pre-commit` shell 文件。

其中默认的脚本是 `npm test`，如果项目中没有引入单元测试，该命令会不存在，提交会失败，**我们可以暂时先注释**。

### 添加 commit-msg lint

可以使用 husky add 添加添加其他的钩子，比如 commit-msg 钩子

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

上面的命令中，使用了 [commitlint](https://commitlint.js.org/#/)，用于校验 commit msg，需要先安装

```bash
# 安装 commitlint 依赖
npm install --save-dev @commitlint/cli @commitlint/config-conventional
# 创建 commitlint.config.js，并写入内容 module.exports = {extends: ['@commitlint/config-conventional']}
# 注意：如果是 windows，不建议使用命令，建议手动创建文件并复制内容到文件
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

配置完成后，执行 `git commit -m 'xxx'` 会被成功拦截，并给出提示。log 如下

```bash
C:\Users\x\commit-lint-test> git commit -m 'xxx'
# ⧗   input: xxx
# ✖   subject may not be empty [subject-empty]
# ✖   type may not be empty [type-empty]
#
# ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
#
# husky - commit-msg hook exited with code 1 (error)
```
