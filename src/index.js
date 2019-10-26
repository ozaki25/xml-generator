import { h, app } from 'hyperapp';
import './index.css';
import state from './state';
import actions from './actions';
import Generator from './components/Generator';

app(state, actions, Generator, document.getElementById('root'));
