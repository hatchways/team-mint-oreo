import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInDays,
  endOfYesterday,
  isAfter,
} from 'date-fns';

// TODO: detect timezone and adjust times accordingly

const relativeDateFormat = timestamp => {
  let displayString = '';
  // if (differenceInSeconds(Date.now(), timestamp) < 60) {
  //   displayString = 'Just now';
  // } else if (differenceInMinutes(Date.now(), timestamp) < 5) {
  //   const diffInMinutes = differenceInMinutes(Date.now(), timestamp);
  //   displayString = `${diffInMinutes} min. ago`;
  // } else

  if (isAfter(timestamp, endOfYesterday())) {
    displayString = format(timestamp, 'h:mm a');
  } else if (differenceInDays(Date.now(), timestamp) < 365) {
    displayString = format(timestamp, 'MMM dd h:mm a');
  } else {
    displayString = format(timestamp, 'MM dd yy h:mm a');
  }
  return displayString;
};

export default relativeDateFormat;
