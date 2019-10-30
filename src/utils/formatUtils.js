import convert from 'xml-js';

function entries(obj) {
  var ownProps = Object.keys(obj),
    i = ownProps.length,
    resArray = new Array(i);
  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

  return resArray;
}

const xmlToJson = xml => {
  const json = convert.xml2json(xml, {
    compact: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreAttributes: true,
    ignoreComment: true,
    ignoreCdata: true,
    ignoreDoctype: true,
  });
  return JSON.parse(json);
};

const toArray = obj => {
  // prettier-ignore
  return entries(obj).map(([key, value]) => ({
    [key]:
      // objectじゃなかったらそのまか返す
      typeof value !== 'object' ? value :
      // keyがなかったら空文字を返す
      !Object.keys(value).length ? '' :
      // _texとというkeyを持ってたらその値を返す
      '_text' in value ? value['_text'] :
      // そうでなかったらtoArrayの結果を返す
      toArray(value),
  }));
};

export default {
  xmlToJson,
  toArray,
};
