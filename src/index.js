// import _ from 'lodash';
// import printMe from './print.js'
// import { cube } from './math.js';
// import Promise from 'promise-polyfill';

import './style.css';

// 处理低版本浏览器不支持promise
import Promise from 'promise-polyfill';
import setAsap from 'setasap';
Promise._immediateFn = setAsap;
Promise._unhandledRejectionFn = function (rejectError) { };
// var Promise = require('promise-polyfill').default;

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function getComponent() {
    var element = document.createElement('div');
    // var element = document.createElement('pre');
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    // var btn = document.createElement('button');
    // btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;

    // element.innerHTML = [
    //     'Hello webpack!',
    //     '5 cubed is equal to ' + cube(5)
    // ].join('\n\n');

    // return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    //     var element = document.createElement('div');
    //     var _ = _.default;
    //     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    //     return element;
    // }).catch(error => 'An error occurred while loading the component');

    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);

    // Note that because a network request is involved, some indication
    // of loading would need to be shown in a production-level site/app.
    // button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    //     var print = module.default;
    //     print();
    // });

    button.onclick = e => require.ensure(
        [],
        (require) => {
            let print = require('./print').default;
            print();
        }, 
        'print'
    )



    // button.onclick = printMe;

    return element;
}

// let element = component(); // 
// document.body.appendChild(element);
// getComponent().then(component => {
//     document.body.appendChild(component);
// })
document.body.appendChild(getComponent());

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        // printMe();
        // document.body.removeChild(element);
        // element = component(); // 重新渲染页面后，component 更新 click 事件处理
        // document.body.appendChild(element);
    })
}