/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import styled from 'styled-components';
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';

const GridViewCard = styled.div`
  width: 350px;
  height: 350px;
  padding: 20px 20px 12px 20px;
  margin: 10px 20px 30px 0;
  border-radius: 10px;
  background: #171717;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: #111111;
    box-shadow: 1px 1px 15px 4px rgb(54 54 50 / 25%);
  }
`;

const ListViewCard = styled.div`
  width: 900px;
  height: 50px;
  padding: 0 10px;
  margin: 20px 0;
  border-radius: 10px;
  background: #171717;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: #111111;
    box-shadow: 1px 1px 15px 4px rgb(54 54 50 / 25%);
  }
`;

const CardButton = styled.button`
  color: #cccccc;
  font-size: 14px;
  height: 28px;
  padding: 0 14px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeBox = styled.div`
  color: #444444;
  font-size: 12px;
`;

export default function Card({
  card, onRead, onDelete, viewMode,
}) {
  return (
    <div>
      { viewMode === 'GridView' && (
        <GridViewCard
          onClick={onRead}
        >
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 16,
              }}
            >
              <div
                style={{
                  background: card.color,
                  width: 40,
                  height: 8,
                  borderRadius: 5,
                }}
              />
              <TimeBox>
                {card.createdTime}
              </TimeBox>
            </div>
            <h2
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: card.title }}
            />
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: card.content }}
              style={{
                fontSize: 14,
                color: '#aaaaaa',
                maxHeight: 160,
                overflow: 'hidden',
              }}
            />
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1.5px solid #1e1e1e',
                paddingTop: 12,
              }}
            >
              <CardButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                style={{ padding: '0 5px' }}
              >
                <HiOutlineTrash size={18} />
              </CardButton>
              <CardButton
                onClick={onRead}
              >
                <HiOutlineEye size={18} style={{ marginRight: 7 }} />
                Read
              </CardButton>
            </div>
          </div>
        </GridViewCard>
      )}

      { viewMode === 'ListView' && (
        <ListViewCard
          onClick={onRead}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '75%',
            }}
          >
            <div
              style={{
                background: card.color,
                // width: 12,
                // height: 6,
                // borderRadius: 5,
                width: 5,
                height: 15,
                borderRadius: 5,
                margin: '0 10px 0 10px',
              }}
            />
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: card.title }}
              style={{
                margin: '0px 10px 0 5px',
                fontSize: 16,
                letterSpacing: 1.2,
                width: '60%',
              }}
            />
            <div style={{ color: '#666666' }}>
              {card.createdTime}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '20%',
              borderLeft: '1.5px solid #1e1e1e',
              height: '70%',
              paddingLeft: '26px',
            }}
          >
            <CardButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              style={{ padding: '0 5px' }}
            >
              <HiOutlineTrash size={18} />
            </CardButton>
            <CardButton
              onClick={onRead}
            >
              <HiOutlineEye size={18} style={{ marginRight: 7 }} />
              Read
            </CardButton>
          </div>
        </ListViewCard>
      )}
    </div>
  );
}
