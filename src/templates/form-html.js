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

function xml(obj) {
  const xmlItem = ([key, value]) =>
    `<${key}>${typeof value === 'object' ? xmlItems(value) : value}</${key}>`;
  const xmlItems = obj =>
    Object.entries(obj)
      .map(([key, value]) => xmlItem([key, value]))
      .join('');
  return `<?xml version="1.0"?>
${xmlItems(obj)}`;
}

const scripts = `
${onSubmit.toString()}
${setValue.toString()}
${download.toString()}
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
