// import randomize from 'randomatic';

export function userNameGenerator(string) {

  let result = string.replace(/\s+/g, "_").toLowerCase();
  //result += `#${randomize('0', 4)}`;

  return(result)
}