import admin from '../firebase/nodeApp';

export default async function getStaticProps(uid) {
  admin
  .auth()
  .createCustomToken(uid)
  .then((customToken) => {
    return(customToken);
  })
  .catch((error) => {
    console.log('Error creating custom token:', error);
    return(error);
  });
}
