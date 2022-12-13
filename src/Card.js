/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import styled from 'styled-components';

const GridViewCard = styled.div`
  width: 350px;
  height: 350px;
  padding: 20px;
  margin: 10px 20px 30px 0;
  border-radius: 10px;
  // box-shadow: 1px 1px 15px 4px rgb(54 54 50 / 25%);
  background: #171717;
`;

const ListViewCard = styled.div`
  width: 900px;
  height: 50px;
  padding: 10px;
  margin: 20px 0;
  border-radius: 10px;
  // box-shadow: 1px 1px 15px 4px rgb(54 54 50 / 25%);
  background: #171717;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Card({
  card, onRead, onDelete, viewMode,
}) {
  return (
    <div>
      { viewMode === 'GridView' && (
        <GridViewCard>
          <div style={{ background: card.color, width: 15, height: 15 }} />
          <div>
            {`ID: #${card.id}`}
          </div>
          <div>
            {card.createdTime}
          </div>
          <div>
            {card.editedTime}
          </div>
          <h2
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: card.title }}
          />
          <div
          // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: card.content }}
          />
          <div
            style={{
              marginBottom: '20px',
            }}
          />
          <button onClick={onRead}>Read</button>

          <button onClick={onDelete}>Delete</button>
        </GridViewCard>
      )}
      { viewMode === 'ListView' && (
        <ListViewCard>
          <div style={{ background: card.color, width: 15, height: 15 }} />
          <div>
            {`ID: #${card.id}`}
          </div>
          <div>
            {card.createdTime}
          </div>
          <div>
            {card.editedTime}
          </div>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: card.title }}
          />
          <button onClick={onRead}>Read</button>
          <button onClick={onDelete}>Delete</button>
        </ListViewCard>
      )}
    </div>
  );
}
