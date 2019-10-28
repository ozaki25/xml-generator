import { h, app } from 'hyperapp';
import './index.css';
import state from './state';
import Generator from './components/Generator';

app({
  init: state,
  view: Generator,
  node: document.getElementById('root'),
});
