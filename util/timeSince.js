import { serverTime } from '../firebase/firebase';

export function timeSince(date) {
  date = new Date(date);
  const seconds = Math.floor((new Date(serverTime) - date) / 1000);
  let intervalType;
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'y';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'mo';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'd';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "h";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "m";
          } else {
            interval = seconds;
            intervalType = "now";
          }
        }
      }
    }
  }

  // if (interval > 1 || interval === 0) {
  //   intervalType += 's';
  // }

  if (intervalType == "now") {
    return "now"
  }

  return interval + '' + intervalType;
};