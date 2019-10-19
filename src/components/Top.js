import React, { useState } from 'react';
import { Button, Stack, Heading, Textarea } from '@chakra-ui/core';
import formatUtils from '../utils/formatUtils';

const defaultXml = `<?xml version="1.0"?>  
<PurchaseOrder PurchaseOrderNumber="99503" OrderDate="1999-10-20">  
  <Address Type="Shipping">  
    <Name>Ellen Adams</Name>  
    <Street>123 Maple Street</Street>  
    <City>Mill Valley</City>  
    <State>CA</State>  
    <Zip>10999</Zip>  
    <Country>USA</Country>  
    <Test />
  </Address>  
  <DeliveryNotes>Please leave packages in shed by driveway.</DeliveryNotes>  
  <Items>  
    <Item PartNumber="872-AA">  
      <ProductName>Lawnmower</ProductName>  
      <Quantity>1</Quantity>  
      <USPrice>148.95</USPrice>  
      <Comment>Confirm this is electric</Comment>  
    </Item>  
  </Items>  
</PurchaseOrder>`;

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
      <Textarea height="80vh" value={input} onChange={onChange} />
      <Button onClick={onClick}>送信</Button>
      {result && <div>{JSON.stringify(result)}</div>}
    </Stack>
  );
}

export default Top;
