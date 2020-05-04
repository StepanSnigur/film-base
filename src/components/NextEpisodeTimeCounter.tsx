import React from 'react';

interface INextEpisodeTimeCounter {
  date: {
    air_date: string
  }
}

const NextEpisodeTimeCounter: React.FC<INextEpisodeTimeCounter> = (props) => {
  const countTimeLeft = () => {
    const dateDifference = Date.parse(props.date.air_date) - Date.now();
    return Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
  }

  return props.date && <h3>До премьеры следующего эпизода: {countTimeLeft()} дней ({props.date.air_date})</h3>
}

export default NextEpisodeTimeCounter;
