/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';
import {
  ListViewCardBox,
  CardButton,
  CardReadButton,
  ListViewInfoBox,
  ListViewToolBox,
  ListTitleBox,
  ListTimeBox,
} from './ListViewCard.style';

export default function ListViewCard({ card, onRead, onDelete }) {
  return (
    <ListViewCardBox
      onClick={onRead}
    >
      <ListViewInfoBox>
        <div
          style={{
            background: card.color,
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
    </ListViewCardBox>
  );
}
