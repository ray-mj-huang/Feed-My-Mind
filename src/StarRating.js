import React from 'react';
import { createArray } from './lib';
import Star from './Star';

export default function StarRating({
  totalStars = 5,
  selectedStars = 0,
  onRate = (f) => f,
}) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          selected={selectedStars > i}
          onSelect={() => onRate(i + 1)}
        />
      ))}
      <p>
        {selectedStars}
        {' '}
        of
        {' '}
        {totalStars}
        {' '}
        stars
      </p>
    </>
  );
}
