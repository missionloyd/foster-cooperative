import btoa from 'btoa';
const jdenticon = require("jdenticon");

export function avatarGenerator(uid) {
  const size = 200;
  const icon_value = uid || 'teststest';
  //const icon_value = 'testsetset'
  const avatarUrl = 'data:image/svg+xml;base64,' + btoa(jdenticon.toSvg(icon_value, size));

  return(avatarUrl);
}