import { format, differenceInSeconds, differenceInMinutes } from 'date-fns';

// TODO: detect timezone and adjust times accordingly

const relativeDateFormat = timestamp => {
  let displayString = '';
  if (differenceInSeconds(Date.now(), timestamp) < 60) {
    displayString = 'Just now';
  } else if (differenceInMinutes(Date.now(), timestamp) < 5) {
    displayString = differenceInMinutes(Date.now(), timestamp);
  } else {
    displayString = format(timestamp, 'h:mm a');
  }
  return displayString;
};

export default relativeDateFormat;
