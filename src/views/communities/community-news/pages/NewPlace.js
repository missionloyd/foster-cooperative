import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

import Input from '../../../../components/shared/FormElements/Input';
import Button from '../../../../components/shared/FormElements/Button';
import ErrorModal from '../../../../components/shared/UIElements/ErrorModal';
import LoadingSpinner from '../../../../components/shared/UIElements/LoadingSpinner';
import ImageUpload from '../../../../components/shared/FormElements/ImageUpload';
import {
  //VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../../components/shared/util/validators';
import { useForm } from '../../../../components/shared/hooks/form-hook';
import { useHttpClient } from '../../../../components/shared/hooks/http-hook';
import { AuthContext } from '../../../../components/shared/context/auth-context';
import './PlaceForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const Navigate = useNavigate();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      Navigate.push('/');
    } catch (err) {}
  };

  return (
    <div className="page-container">
      <div className="form-header">
        <h1>New Post 📩</h1>
      </div>
      <div className="form-container">
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          <form className="place-form" onSubmit={placeSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              id="description"
              element="textarea"
              label="Post Content"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (at least 5 characters)."
              onInput={inputHandler}
            />
            <ImageUpload
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
            <Button type="submit" disabled={!formState.isValid}>
              Save Post
            </Button>
          </form>
        </React.Fragment>
      </div>
    </div>
  );
};

export default NewPlace;
