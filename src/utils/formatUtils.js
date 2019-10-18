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
  return Object.keys(obj).map(key => obj[key]);
}

export default {
  xmlToJson,
  toArray,
};
