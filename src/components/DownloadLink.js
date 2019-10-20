import React from 'react';
import { Button, Link } from '@chakra-ui/core';
import formHtml from '../templates/form-html';

function generateHtml(data) {
  return URL.createObjectURL(
    new Blob([formHtml(data)], {
      type: 'text/html;charset=utf-8;',
    }),
  );
}

function DownloadLink({ data }) {
  return (
    <Button
      as={Link}
      variant="outline"
      download="index.html"
      href={generateHtml(data)}
    >
      ダウンロード
    </Button>
  );
}

export default DownloadLink;
