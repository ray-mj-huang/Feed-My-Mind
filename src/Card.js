/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { useState } from 'react';

export default function Card({
  value, onChange, isGrab, setIsGrab, card, isEdit, setIsEdit,
}) {
  const [initialValue, setInitialValue] = useState(value);

  return (
    <div
      style={isEdit ? {
        background: 'rgba(40, 40, 40, 0.85)',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      } : null}
    >
      <div
        style={{
          width: '350px',
          height: '350px',
          padding: '20px',
          margin: isEdit ? '0' : '10px 20px 30px 0',
          borderRadius: '6px',
          background: 'white',
        }}
      >
        <div>
          {`ID: #${card.id}`}
        </div>
        <div
          contentEditable={isEdit}
          onInput={onChange}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: isGrab ? value : initialValue }}
        />
        <div
          style={{
            marginBottom: '20px',
          }}
        />
        <button
          onClick={() => {
            setIsEdit();
            setIsGrab(false);
            setInitialValue(value);
          }}
        >
          { isEdit ? '儲存' : '點此編輯' }
        </button>
      </div>
    </div>
  );
}
