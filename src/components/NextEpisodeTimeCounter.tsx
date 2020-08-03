import React from 'react';

interface INextEpisodeTimeCounter {
  date: {
    air_date: string
  }
}

const NextEpisodeTimeCounter: React.FC<INextEpisodeTimeCounter> = (props) => {
  const countTimeLeft = (): number => {
    const dateDifference = Date.parse(props.date.air_date) - Date.now();
    return Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
  }
  let daysPlaceHolder = 'дней'
  let daysLeft = null

  if (props.date) {
    daysLeft = countTimeLeft()
    const lastNumber = +daysLeft.toString()[daysLeft.toString().length - 1]
    if (lastNumber === 1) daysPlaceHolder = 'день'
    else if (lastNumber >= 2 && lastNumber <= 4) daysPlaceHolder = 'дня'
  }

  return props.date && <h3>
    До премьеры следующего эпизода: {daysLeft} {daysPlaceHolder} ({props.date.air_date})
  </h3>
}

export default NextEpisodeTimeCounter;
