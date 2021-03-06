import { h } from 'hyperapp';
import { onInput, onClick } from '../actions';
import formHtml from '../templates/form-html';

const styles = {
  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80%',
  },
  textarea: {
    width: '100%',
    outline: 'none',
    fontSize: '1rem',
    padding: '4px',
    height: '50vh',
    borderRadius: '0.25rem',
    border: '1px solid',
    backgroundColor: '#fff',
    minHeight: '300px',
    marginBottom: '.5rem',
  },
  button: {
    cursor: 'pointer',
    borderRadius: '0.25rem',
    height: '2.5rem',
    width: '100%',
    minWidth: '2.5rem',
    fontSize: '1rem',
    backgroundColor: '#c5caE9',
    marginBottom: '0.5rem',
  },
  link: {
    color: '#1565c0',
    cursor: 'pointer',
    display: 'block',
    textAlign: 'center',
    height: '2.5rem',
    width: '100%',
    minWidth: '2.5rem',
    fontSize: '1rem',
  },
};

const generateHtml = data =>
  URL.createObjectURL(
    new Blob([formHtml(data)], {
      type: 'text/html;charset=utf-8;',
    }),
  );

const Generator = ({ xml, json }) => (
  <div style={styles.container}>
    <h2>XMLを入力してください</h2>
    <textarea style={styles.textarea} value={xml} onInput={onInput} />
    <button style={styles.button} onClick={onClick}>
      入力フォームを生成
    </button>
    {json && (
      <a style={styles.link} download="index.html" href={generateHtml(json)}>
        ダウンロード
      </a>
    )}
  </div>
);

export default Generator;
