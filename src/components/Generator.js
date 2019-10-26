import { h } from 'hyperapp';
import formHtml from '../templates/form-html';

function generateHtml(data) {
  return URL.createObjectURL(
    new Blob([formHtml(data)], {
      type: 'text/html;charset=utf-8;',
    }),
  );
}

function Generator({ xml, json }, { onChange, onClick }) {
  console.log({ xml, json }, { onChange, onClick });
  return (
    <div mr="auto" ml="auto" width={['100%', '80%', '70%', '60%']}>
      <h2>XMLを入力してください</h2>
      <textarea value={xml} onchange={onChange} />
      <button onclick={onClick}>入力フォームを生成</button>
      {json && (
        <a download="index.html" href={generateHtml(json)}>
          ダウンロード
        </a>
      )}
    </div>
  );
}

export default Generator;
