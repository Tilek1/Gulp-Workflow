function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bar = /*#__PURE__*/function () {
  function Bar() {
    _classCallCheck(this, Bar);
  }

  _createClass(Bar, [{
    key: "print",
    value: function print(msg) {
      document.write(msg);
    }
  }]);

  return Bar;
}(); // Console log 1


console.log('This is file 1'); // Console log 2

console.log('This is file 2');
console.log('this is file 2');
alert('This is file 2');

var Foo = /*#__PURE__*/function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: "log",
    value: function log(msg) {
      console.log(msg);
    }
  }]);

  return Foo;
}();