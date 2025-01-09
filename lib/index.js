import path from 'path';
import Map from 'es6-map';
import isGlob from 'is-glob';
import sort from 'sort-object';
import mapFiles from 'map-files';

/**
 * Look for wildcard imports
 * @return {Function}         Function to be used by Dart Sass importer
 */
export default function () {
  const aliases = new Map();
  return function (url, parent) {
    const base = path.join(path.dirname(parent), url);
    if (aliases.has(base)) {
      return aliases.get(base);
    }
    if (isGlob(base)) {
      const files = sort(mapFiles(base));
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