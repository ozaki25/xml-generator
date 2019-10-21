function babel() {
  return `
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
`;
}

function onload() {
  return `document.querySelector('form').addEventListener('submit', onSubmit)`;
}

function onSubmit(e) {
  e.preventDefault();
  const obj = {};
  const items = e.target.querySelectorAll('input[type="text"]');
  items.forEach(function(item) {
    const names = item.name.split('.');
    const value = item.value;
    setValue(obj, names, value);
  });
  download(obj);
}

function setValue(obj, keys, value) {
  const key = keys.shift();
  if (!obj[key]) obj[key] = {};
  if (keys.length) {
    setValue(obj[key], keys, value);
  } else {
    obj[key] = value;
  }
}

function download(data) {
  console.log(data);
  const link = document.createElement('a');
  const href = URL.createObjectURL(
    new Blob([xml(data)], { type: 'text/xml;charset=utf-8;' }),
  );
  link.href = href;
  link.style.display = 'none';
  link.setAttribute('download', 'index.xml');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function space(size) {
  return [...Array(size)].map(() => ' ').join('');
}

function xml(obj) {
  const size = 2;

  const xmlItem = ([key, value], level, last) =>
    `${space(size * level)}<${key}>
${
  typeof value === 'object'
    ? `${xmlItems(value, level + 1)}`
    : `${space(size * level + size)}${value}`
}
${space(size * level)}</${key}>${
      last
        ? ``
        : `
`
    }`;

  const xmlItems = (obj, level) =>
    Object.entries(obj)
      .map(([key, value], i) =>
        xmlItem([key, value], level, Object.entries(obj).length - 1 === i),
      )
      .join('');

  return `<?xml version="1.0"?>
${xmlItems(obj, 0)}`;
}

const scripts = `
${babel().toString()}
${onSubmit.toString()}
${setValue.toString()}
${download.toString()}
${space.toString()}
${xml.toString()}
${onload().toString()}
`;

const css = `section {
    border: 1px solid #bbb;
}
section > section {
  margin-left: 1em;
  border-right: none;
}
section > section:last-child {
  border-bottom: none;
}
section ~ section {
  border-top: none;
}`;

const formItem = ([label, value]) =>
  `<input type="text" name="${label}" value="${value}" />`;

const section = ([label, value], parents = '') => `<section>
  <label>${label}</label>
  ${
    typeof value === 'object'
      ? items(value, `${parents}${label}.`)
      : formItem([`${parents}${label}`, value])
  }
</section>
`;

const items = (data, parents = '') =>
  data
    .map(obj =>
      Object.entries(obj)
        .map(([key, value]) => section([key, value], parents))
        .join(''),
    )
    .join('');

const html = data => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>xml generator</title>
    <style>
    ${css}
    </style>
  </head>
  <body>
    <h1>XML Generator</h1>
    <form>
      ${items(data)}
      <input type="submit" value="xmlを出力" />
    </form>
    <script>
    ${scripts}
    </script>
  </body>
</html>
`;

export default html;
