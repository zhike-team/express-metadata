'use strict';

const fs = require('fs');
const path = require('path');
const projectPath = path.resolve(__dirname, '../..');

const methods = ['head', 'get', 'post', 'put', 'delete', 'patch'];
const slice = [].slice;

function getProjectInfo() {
  let needData = ['name', 'version', 'author', 'dependencies'];
  let filePath = path.join(projectPath, 'package.json');
  let packageJson = fs.readFileSync(filePath, 'utf8');
  packageJson = JSON.parse(packageJson);
  let projectInfo = {};
  for(let i = 0; i < needData.length; i++) {
    projectInfo[needData[i]] = packageJson[needData[i]];
  }
  return projectInfo;
}


// parse Array to ArrayLike
function array2ArrayLike(array) {
  let arrayLike = {
    length: 0
  };

  for(let i = 0; i < array.length; i++) {
    arrayLike[i] = array[i];
    arrayLike.length++;
  }
  return arrayLike;
}

function metadata(originRouter, prefix) {
  let _appDefaultSettings;
  if(originRouter.settings) {
    _appDefaultSettings = originRouter.settings;
  }

  let metadataInfo = {
    routersSetting: [],
    projectInfo : getProjectInfo()
  };

  for(let i = 0; i < methods.length; i++) {
    let originRouterMethod = originRouter[methods[i]];
    originRouter[methods[i]] = function() {
      let args = slice.call(arguments);
      // for express default settings, such as app.get('trust proxy') or app.get('env') and so on
      if(args.length === 1) {
        return _appDefaultSettings[args[0]];
      }
      let isName = false;
      let _args = [args[0]]; // for express router arguments
      if(typeof args[1] === 'string') {
        isName = true;
        _args.push(args.slice(2));
      }
      else {
        _args.push(args.slice(1));
      }

      let routerArg = {
        name: isName === true ? args[1] : '',
        method: methods[i],
        url: `${(prefix || '') + args[0]}`
      };

      metadataInfo.routersSetting.push(routerArg);

      originRouterMethod.apply(originRouter, array2ArrayLike(_args));
    }
  }

  originRouter.metadata = function() {
    return metadataInfo;
  }

  return originRouter;
}

module.exports = metadata;
