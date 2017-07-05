//使用严格模式
"use strict";

//实例对象
var ee = new EventEmitter();//EventEmitter.js 事件触发与事件监听器功能的封装

/**使用React.js 的组件功能需要注意的
 1-原生 HTML 元素名以小写字母开头，
  -而自定义的 React 类名以大写字母开头
  -比如 HelloMessage 不能写成 helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。

 2-在添加属性时
  -class 属性需要写成 className
  -for 属性需要写成 htmlFor
  -这是因为 class 和 for 是 JavaScript 的保留字

 3-ReactDOM.render(<组建名 />) 时
  -组件名是用单标签< />即带斜杠"/"的尖括号包围的, 一定要加上 "/"

*/

//创建一个名为 App 的组件,并且是一个复合组件(即把组件的不同功能点进行分离)
var App = React.createClass({
  displayName: "App",
  render: function render() {
    return React.createElement(
      "main",
      { className: "react-calculator" },
      React.createElement(InputField, null),
      React.createElement(TotalRecall, null),
      React.createElement(ButtonSetNumbers, null),
      React.createElement(ButtonSetFunctions, null),
      React.createElement(ButtonSetEquations, null)
    );
  }
});
//创建一个名为 Button 的组件
var Button = React.createClass({
  displayName: "Button",
  _handleClick: function _handleClick() {
    /*需要向组件传递参数，可以使用 this.props 对象*/
    var text = this.props.text,
        cb = this.props.clickHandler;

    if (cb) {
      cb.call(null, text);
    }
  },
  render: function render() {
    return React.createElement(
      "button",
      { className: this.props.klass, onClick: this._handleClick },
      React.createElement(
        "span",
        { className: "title" },
        this.props.text
      )
    );
  }
});
//创建一个名为 ContentEditable 的组件
var ContentEditable = React.createClass({
  displayName: "ContentEditable",
  _handleClick: function _handleClick() {
    var cb = this.props.clickHandler;

    if (cb) {
      cb.call(this);
    }
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "editable-field",
        contentEditable: this.props.initEdit,
        spellcheck: this.props.spellCheck,
        onClick: this._handleClick 
      },
      this.props.text
    );
  }
});
//创建一个名为 InputField 的组件
var InputField = React.createClass({
  displayName: "InputField",
  _updateField: function _updateField(newStr) {
    newStr = newStr.split ? newStr.split(' ').reverse().join(' ') : newStr;
    //当组件发生变化时,
    return this.setState({ text: newStr });
  },
  getInitialState: function getInitialState() {
    this.props.text = this.props.text || '0';

    return { text: this.props.text };
  },
  componentWillMount: function componentWillMount() {
    ee.addListener('numberCruncher', this._updateField);
  },
  render: function render() {
    return React.createElement(ContentEditable, { text: this.state.text, initEdit: "false", spellcheck: "false", clickHandler: this._clickBait });
  }
});
//创建一个名为 TotalRecall 的组件
var TotalRecall = React.createClass({
  displayName: "TotalRecall",
  // 如果 recall面板是显示状态,则隐藏
  _toggleMemories: function _toggleMemories() {
    this.setState({ show: !this.state.show });
  },
  _recallMemory: function _recallMemory(memory) {
    store.newInput = memory;
    ee.emitEvent('toggle-memories');
  },
  getInitialState: function getInitialState() {
    return { show: false };
  },
  componentWillMount: function componentWillMount() {
    ee.addListener('toggle-memories', this._toggleMemories);
  },
  render: function render() {
    var _this = this;

    var classNames = "memory-bank " + (this.state.show ? 'visible' : '');

    return React.createElement(
      "section",
      { className: classNames },
      React.createElement(Button, { text: "+", clickHandler: this._toggleMemories, klass: "toggle-close" }),
      store.curMemories.map(function (mem) {
        return React.createElement(Button, { klass: "block memory transparent", text: mem, clickHandler: _this._recallMemory });
      })
    );
  }
});
//创建一个名为 ButtonSetFunctions 的组件
var ButtonSetFunctions = React.createClass({
  //displayName 用于调试信息
  displayName: "ButtonSetFunctions",
  //显示recall面板
  _showMemoryBank: function _showMemoryBank() {
    ee.emitEvent('toggle-memories');
  },
  //清空输入
  _clear: function _clear() {
    store.newInput = 0;
  },

  _contentClear: function _contentClear() {
    var curInput = String(store.curInput),
        lessOne = curInput.substring(0, curInput.length - 1);

    return store.newInput = lessOne === '' ? 0 : lessOne;
  },
  render: function render() {
    return React.createElement(
      "section",
      { className: "button-set--functions" },
      React.createElement(Button, { klass: "long-text", text: "recall", clickHandler: this._showMemoryBank }),
      React.createElement(Button, { klass: "long-text", text: "clear", clickHandler: this._clear }),
      React.createElement(Button, { text: "←", clickHandler: this._contentClear })
    );
  }
});
//创建一个名为 ButtonSetEquations 的组件
var ButtonSetEquations = React.createClass({
  displayName: "ButtonSetEquations",
  _eq: function _eq(type) {
    store.newInput = store.curInput + " " + type + " ";
  },
  _equate: function _equate() {
    store.newInput = eval(store.curInput);
  },
  render: function render() {
    return React.createElement(
      "section",
      { className: "button-set--equations" },
      React.createElement(Button, { text: "+", clickHandler: this._eq }),
      React.createElement(Button, { text: "-", clickHandler: this._eq }),
      React.createElement(Button, { text: "*", clickHandler: this._eq }),
      React.createElement(Button, { text: "/", clickHandler: this._eq }),
      React.createElement(Button, { text: "=", clickHandler: this._equate })
    );
  }
});
//创建一个名为 ButtonSetNumbers 的组件
var ButtonSetNumbers = React.createClass({
  displayName: "ButtonSetNumbers",
  _number: function _number(num) {
    if (!store.curInput) {
      return store.newInput = num;
    }

    return store.newInput = "" + store.curInput + num;
  },
  render: function render() {
    return React.createElement(
      "section",
      { className: "button-set--numbers" },
      React.createElement(Button, { text: "1", clickHandler: this._number }),
      React.createElement(Button, { text: "2", clickHandler: this._number }),
      React.createElement(Button, { text: "3", clickHandler: this._number }),
      React.createElement(Button, { text: "4", clickHandler: this._number }),
      React.createElement(Button, { text: "5", clickHandler: this._number }),
      React.createElement(Button, { text: "6", clickHandler: this._number }),
      React.createElement(Button, { text: "7", clickHandler: this._number }),
      React.createElement(Button, { text: "8", clickHandler: this._number }),
      React.createElement(Button, { text: "9", clickHandler: this._number }),
      React.createElement(Button, { text: "0", clickHandler: this._number })
    );
  }
});

var store = {
  input: 0,
  memory: [],
  get curInput() {
    return this.input;
  },

  get curMemories() {
    return this.memory.filter(function (m) {
      return m !== undefined;
    });
  },

  set commitMemory(input) {
    this.memory.push(input);
  },

  set newInput(str) {
    var curInput = str,
        oldInput = this.curInput;

    if (this.curMemories.indexOf(oldInput) === -1) {
      this.commitMemory = oldInput;
    }

    this.input = curInput;
    ee.emitEvent('numberCruncher', [this.curInput]);
  }
};
//在body下实例组件类并输出信息
ReactDOM.render(
  React.createElement(App, null),
  document.querySelector('body')
);