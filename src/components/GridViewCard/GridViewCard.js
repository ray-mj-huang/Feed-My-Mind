/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';
import {
  GridViewCardBox,
  CardButton,
  TimeBox,
} from './GridViewCard.style';

export default function GridViewCard({ card, onRead, onDelete }) {
  return (
    <GridViewCardBox
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
    </GridViewCardBox>
  );
}
