Register express metadata
=========================

### Features?
1.  register routers in project
2.  register project owners, version, and dependencies


### What can be done by this?
Collect express metadata information for other services

### Args?
metadata(router, prefix | option);

### How to use?

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

**OR**

```javascript
const metadata = require('express-metadata');
const router = metadata(express.Router());

router.get('/xx', foo)
.
.
.

```
