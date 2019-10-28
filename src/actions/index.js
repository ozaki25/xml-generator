import formatUtils from '../utils/formatUtils';

export const onInput = (state, e) => {
  return { ...state, xml: e.target.value };
};

export const onClick = state => {
  console.log(state);
  const json = formatUtils.xmlToJson(state.xml);
  console.log(json);
  const array = formatUtils.toArray(json);
  console.log(array);
  return { ...state, json: array };
};
