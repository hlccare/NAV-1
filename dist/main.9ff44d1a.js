// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.site-list');
var $lastLi = $siteList.find('.last');
var infoString = localStorage.getItem('website-info');
var infoObject = JSON.parse(infoString);
var hashMap = infoObject || [{
  logo: 'A',
  logotype: 'text',
  url: 'https://www.acfun.cn'
}, // { logo: '../static/bilibili-logo.jpeg', logotype: 'text', url: 'https://bilibili.com' }
{
  logo: 'B',
  logotype: 'text',
  url: 'https://bilibili.com'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n            <!-- <a href=\"".concat(node.url, "\"> --!>\n            <div class=\"site\">\n                <div class=\"logo\">").concat(node.logo, "</div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class='del-icon'>\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icon-delete2\"></use>\n                    </svg>\n                </div>\n            </div>\n            <!-- </a> --!>\n            </li>")).insertBefore($lastLi);
    $li.on('click', function (e) {
      window.open(node.url); //代替a标签
    });
    $li.on('click', '.del-icon', function (e) {
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.add-btn').on('click', function (e) {
  var url = window.prompt('新增网址').trim();

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logotype: 'text',
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  console.log('页面即将关闭，保存hashMap至localStorage');
  var string = JSON.stringify(hashMap);
  localStorage.setItem('website-info', string);
}; //document.addEventListener


$(document).on('keypress', function (e) {
  var upperKey = e.key.toUpperCase(); //将字符串转换为大写

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo === upperKey) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9ff44d1a.js.map