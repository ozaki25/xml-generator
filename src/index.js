import { h, app } from 'hyperapp';
import './index.css';
import App from './App';

function Hello(state) {
  return (
    <main>
      <h1>{state.text}</h1>
    </main>
  );
}

app({
  init: { text: 'Hello!!!' },
  view: Hello,
  node: document.getElementById('root'),
});
