import { createApi } from 'unsplash-js';

const unsplash = createApi({ accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY });

const Ids = ['1390381', '1586650', '2364441', '352248', '8243429']

export default async function getUnsplash(req, response) {
  await unsplash.photos
    .getRandom({ 
      collectionIds: [Ids[getRandomInt(Ids.length)]]
    })
    .then(result => {
      if (result.errors) {
        // handle error here
        console.log('error occurred: ', result.errors[0]);
        
        return response.status(400).json({ 
          photo: result.errors[0] 
        });
      } else {
        // handle success here
        
        return response.status(200).json({
          result
        });
      }
  });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}