/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import GridViewCard from '../GridViewCard';
import ListViewCard from '../ListViewCard';

export default function Card({
  card, onRead, onDelete, viewMode,
}) {
  return (
    <div>
      { viewMode === 'GridView' && (
        <GridViewCard
          card={card}
          onDelete={onDelete}
          onRead={onRead}
        />
      )}

      { viewMode === 'ListView' && (
        <ListViewCard
          card={card}
          onDelete={onDelete}
          onRead={onRead}
        />
      )}
    </div>
  );
}
