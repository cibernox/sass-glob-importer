"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _path = _interopRequireDefault(require("path"));
var _es6Map = _interopRequireDefault(require("es6-map"));
var _isGlob = _interopRequireDefault(require("is-glob"));
var _sortObject = _interopRequireDefault(require("sort-object"));
var _mapFiles = _interopRequireDefault(require("map-files"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Look for wildcard imports
 * @return {Function}         Function to be used by Dart Sass importer
 */
function _default() {
  const aliases = new _es6Map.default();
  return function (url, parent) {
    const base = _path.default.join(_path.default.dirname(parent), url);
    if (aliases.has(base)) {
      return aliases.get(base);
    }
    if ((0, _isGlob.default)(base)) {
      const files = (0, _sortObject.default)((0, _mapFiles.default)(base));
      const contents = Object.keys(files).map(key => files[key].content);
      const content = contents.join('\n');
      const result = {
        contents: content
      };
      aliases.set(base, result);
      return result;
    }
    const result = {
      file: url
    };
    aliases.set(base, result);
    return result;
  };
}