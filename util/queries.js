export const queries = (params, option) => {
  let url = null;

  switch(option) {
    // href={`/users/${post.username}`}>
    case 0:
      url = `/users/query?id=${params?.id}&user=${params?.user}`
      break;
    case 1:
      url = `/nextsteps/query?id=${params?.id}&user=${params?.user}`
      break;
    default: 
      url = '/404'
  }

  return url;
}