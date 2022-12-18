/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import styled from 'styled-components';
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';

const GridViewCard = styled.div`
  width: 320px;
  height: 320px;
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
  @media screen and (max-width: 900px ) {
    
  }
`;

const ListViewCard = styled.div`
  width: 900px;
  height: 50px;
  padding: 0 10px;
  margin: 20px auto;
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
  @media screen and (max-width: 900px ) {
    width: 95%;
    margin: 10px auto;
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

const CardReadButton = styled.button`
  color: #cccccc;
  font-size: 14px;
  height: 28px;
  padding: 0 14px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const TimeBox = styled.div`
  color: #444444;
  font-size: 12px;
`;

const ListViewInfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 88%;
`;

const ListViewToolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  border-left: 1.5px solid #1e1e1e;
  height: 70%;
  padding-left: 26px;
  @media screen and (max-width: 900px) {
    width: 12%;
    padding-left: 3%;
  }
`;

const ListTitleBox = styled.div`
  margin: 0px 10px 0 5px;
  font-size: 16px;
  letter-spacing: 1.2px;
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  @media screen and (max-width: 900px) {
    width: 155px;
  }
`;

const ListTimeBox = styled.div`
  color: #666666;
  @media screen and (max-width: 900px) {
    width: 150px;
    font-size: 12px;
  }
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
          <ListViewInfoBox>
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
            <ListTitleBox
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: card.title }}
            />
            <ListTimeBox>
              {card.createdTime}
            </ListTimeBox>
          </ListViewInfoBox>

          <ListViewToolBox>
            <CardButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              style={{ padding: '0 5px' }}
            >
              <HiOutlineTrash size={18} />
            </CardButton>
            <CardReadButton
              onClick={onRead}
            >
              <HiOutlineEye size={18} style={{ marginRight: 7 }} />
              Read
            </CardReadButton>
          </ListViewToolBox>
        </ListViewCard>
      )}
    </div>
  );
}
