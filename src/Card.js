/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

// const editingCardContainer = {
//   background: 'rgba(40, 40, 40, 0.85)',
//   position: 'fixed',
//   width: '100%',
//   height: '100%',
//   top: 0,
//   left: 0,
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

// const editingCard = {
//   width: '420px',
//   height: '700px',
//   padding: '20px',
//   margin: '0',
//   borderRadius: '10px',
//   background: 'white',
//   boxShadow: '4px 8px 10px 2px rgba(0, 0, 0, 0.15)',
// };

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
