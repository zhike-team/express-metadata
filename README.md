Express 元数据收集插件
=========================

###  [English read me](./english.readme.md)
### 有哪些功能?
1.  注册项目中的路由
2.  注册改项目的作者, 版本以及依赖


### 通过这个可以干什么?
服务化后收集本项目相关的元数据信息(metadata)来注册到配置中心来给其他的服务调用.

### 参数?
metadata(router, prefix | option);

### 如何使用?

```javascript
const express = require('express');
const metadata = require('express-metadata');
const app = metadata(express())

app.get('/awesome-uri', foo)
app.post('/awesome-uri-2', 'createUser' foo2)
.
.
.
console.log(app.metadata())
{
routersSetting:
    [
      { name: '', url: '/awesome-uri' },
      { name: 'createUser', url: '/awesome-uri-2' }
    ],
projectInfo:
    {
      name: '',
      version: '',
      author: '',
      dependencies: ''
    }
}

```

**或者**

```javascript
const metadata = require('express-metadata');
const router = metadata(express.Router());

router.get('/xx', foo)
.
.
.

```
