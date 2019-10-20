import React from 'react';
import { Button, Link } from '@chakra-ui/core';

function onload() {
  return `document.querySelector('form').addEventListener('submit', onSubmit)`;
}

function onSubmit(e) {
  e.preventDefault();
  console.log(e.target.querySelectorAll('input[type="text"]'));
}

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
    section {
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
    }
    </style>
  </head>
  <body>
    <h1>XML Generator</h1>
    <form>
      ${items(data)}
      <input type="submit" value="xmlを出力" />
    </form>
    <script>
    ${onSubmit.toString()}
    ${onload().toString()}
    </script>
  </body>
</html>
`;

function generateHtml(data) {
  return URL.createObjectURL(
    new Blob([html(data)], {
      type: 'text/html;charset=utf-8;',
    }),
  );
}

function DownloadLink({ data }) {
  const href = generateHtml(data);
  return (
    <Button as={Link} variant="outline" download="index.html" href={href}>
      ダウンロード
    </Button>
  );
}

export default DownloadLink;
