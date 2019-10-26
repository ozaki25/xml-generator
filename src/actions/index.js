import formatUtils from '../utils/formatUtils';

export default {
  onChange: e => state => {
    return { ...state, xml: e.target.value };
  },
  onClick: () => state => {
    console.log(state);
    const json = formatUtils.xmlToJson(state.xml);
    console.log(json);
    const array = formatUtils.toArray(json);
    console.log(array);
    return { ...state, json: array };
  },
};
