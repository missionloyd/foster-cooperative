export function joinUserName(string) {

  let result = string.replace(/\s+/g, "_").toLowerCase();

  return(result)
}