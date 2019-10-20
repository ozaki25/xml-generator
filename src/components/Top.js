import React, { useState } from 'react';
import { Button, Stack, Heading, Textarea } from '@chakra-ui/core';
import DownloadLink from './DownloadLink';
import formatUtils from '../utils/formatUtils';

const defaultXml = `<?xml version="1.0"?>
<Layer1>
  <Layer2a>テスト1</Layer2a>
  <Layer2b>
    <Layer3a>テスト2</Layer3a>
  </Layer2b>
</Layer1>
`;

function Top() {
  const [input, setInput] = useState(defaultXml);
  const [result, setResult] = useState(null);

  const onChange = e => {
    setInput(e.target.value);
  };

  const onClick = () => {
    console.log(input);
    const json = formatUtils.xmlToJson(input);
    console.log(json);
    const array = formatUtils.toArray(json);
    console.log(array);
    setResult(array);
  };

  return (
    <Stack mr="auto" ml="auto" width={['100%', '80%', '70%', '60%']}>
      <Heading as="h2" size="lg">
        XMLを入力してください
      </Heading>
      <Textarea height="60vh" value={input} onChange={onChange} />
      <Button onClick={onClick}>入力フォームを生成</Button>
      {result && <DownloadLink data={result}>ダウンロード</DownloadLink>}
    </Stack>
  );
}

export default Top;
