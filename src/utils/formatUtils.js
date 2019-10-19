import convert from 'xml-js';

function xmlToJson(xml) {
  const json = convert.xml2json(xml, {
    compact: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreAttributes: true,
    ignoreComment: true,
    ignoreCdata: true,
    ignoreDoctype: true,
  });
  return json;
}

function toArray(obj) {
  return Object.entries(obj).map(([key, value]) => ({
    [key]: typeof value === 'object' ? toArray(value) : value,
  }));
}

export default {
  xmlToJson,
  toArray,
};
