import React from 'react';
import useSWR from 'swr';

import fetcher from '../../lib/fetcher';

function Unsplash() {
  const { data } = useSWR('/api/unsplash', fetcher);

  const url = (data?.result.response.urls.regular);
  console.log(url)

  return (
    <>
      {url}
    </>
  );
}

export default Unsplash;