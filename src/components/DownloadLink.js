import React from 'react';
import { Button, Link } from '@chakra-ui/core';

const formItem = ([label, value]) => `
<input name="${label}" value="${value}" />
`;

const section = ([label, value]) => `<section>
  <label>${label}</label>
  ${typeof value === 'object' ? items(value) : formItem([label, value])}
</section>
`;

const items = data =>
  data
    .map(obj =>
      Object.entries(obj)
        .map(section)
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
    </form>
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
