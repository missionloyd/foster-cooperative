import { createApi } from 'unsplash-js';


const unsplash = createApi({ accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY });

export default async function getUnsplash(req, response) {
  await unsplash.photos
    .getRandom({ 
      collectionIds: ['1390381', '1586650', '2364441', '352248', '8243429']
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
        //const photo = result.response.status(200).json({});

        return response.status(200).json({
          result
        });
      }
  });
};
