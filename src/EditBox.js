import { useState } from 'react';

export default function EditBox() {
  const initialText = '哈囉，這是一段測試文字。換行看看\n\n還可以換行噢\n\n炫砲吧~~~';

  const [text, setText] = useState(initialText);

  const handleInput = (e) => {
    let ttt = '';
    e.target.childNodes.forEach((node, i) => {
      ttt += (node.innerText || node.nodeValue || '').replace(/\n/g, '');
      if (i !== e.target.childNodes.length - 1) {
        ttt += '\n';
      }
    });

    setText(ttt);
  };

  return (
    <div>
      <div
        contentEditable
        onInput={handleInput}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: initialText
            ? initialText
              .split('\n')
              .map(
                (t) => `<div>${t
                  .replace(/&/gi, '&amp;')
                  .replace(/</gi, '&lt;') || '<br />'}</div>`,
              )
              .join('')
            : null,
        }}
      />
      <hr />
      <div
        style={{
          color: '#666666',
        }}
      >
        字數統計 word count:
        {' '}
        {text.length}
      </div>
      <hr />
      <div
        style={{
          color: '#666666',
        }}
      >
        純文字形式 text:
        <p>{JSON.stringify(text)}</p>
      </div>
    </div>
  );
}
