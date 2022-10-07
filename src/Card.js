/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

const normalCard = {
  width: '350px',
  height: '350px',
  padding: '20px',
  margin: '10px 20px 30px 0',
  borderRadius: '10px',
  boxShadow: '4px 8px 10px 2px rgba(0, 0, 0, 0.15)',
  background: 'white',
};

export default function Card({
  card, onRead,
}) {
  return (
    <div>
      <div
        style={normalCard}
      >
        <div>
          {`ID: #${card.id}`}
        </div>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: card.content }}
        />
        <div
          style={{
            marginBottom: '20px',
          }}
        />

        <button
          onClick={() => {
            onRead();
          }}
        >
          Read
        </button>

      </div>
    </div>
  );
}
