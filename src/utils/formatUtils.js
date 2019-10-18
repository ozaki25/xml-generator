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

export default {
  xmlToJson,
};
