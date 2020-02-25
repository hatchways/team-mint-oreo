import { format, differenceInSeconds, differenceInMinutes, differenceInDays } from 'date-fns';

// TODO: detect timezone and adjust times accordingly

const relativeDateFormat = timestamp => {
  let displayString = '';
  // if (differenceInSeconds(Date.now(), timestamp) < 60) {
  //   displayString = 'Just now';
  // } else if (differenceInMinutes(Date.now(), timestamp) < 5) {
  //   const diffInMinutes = differenceInMinutes(Date.now(), timestamp);
  //   displayString = `${diffInMinutes} min. ago`;
  // } else

  if (differenceInDays(Date.now(), timestamp) < 1) {
    displayString = format(timestamp, 'h:mm a');
  } else if (differenceInDays(Date.now(), timestamp) < 365) {
    displayString = format(timestamp, 'MM DD h:mm a');
  } else {
    displayString = format(timestamp, 'MM DD YY h:mm a');
  }
  return displayString;
};

export default relativeDateFormat;
