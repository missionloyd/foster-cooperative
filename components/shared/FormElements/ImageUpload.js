import { useState } from 'react';
import { auth, storage, STATE_CHANGED } from '../../../firebase/firebase';
import Loader from '../LoadingSpinner';
import Image from 'next/image'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

// Uploads images to Firebase Storage
export default function ImageUpload({ user }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(pct);

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div styles={{marginBottom: '1rem'}}>
      <Loader show={uploading} />
      {uploading && <h1>{progress}%</h1>}

        {downloadURL && !uploading ? (
          <ImageContainer>
            <ImagePreview
              src={downloadURL}
              alt="Picture uploaded by author"
              // className="custom-img"
              ref={photoRef}
              name={name}
            />
          </ImageContainer>
        ): post?.photoURL && !uploading ? (
          <ImageContainer>
            <ImagePreview
              src={post?.photoURL}
              alt="Picture uploaded by author"
              // className="custom-img"
            />
          </ImageContainer>) 
        
        : <div></div>}

      {!uploading && (
        <>
          <Button color="primary" variant="contained" component="label">
            Upload Image
            <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" hidden />
          </Button>
        </>
      )}

      {/* {downloadURL && <code className="upload-snippet">{`![alt](${downloadURL})`}</code>} */}
    </div>
  );
}

const ImagePreview = styled.img`
  height: 100%;
  max-width: 360px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

const ImageContainer = styled.div`
  height: 15rem;
  margin-bottom: 1rem;
`;