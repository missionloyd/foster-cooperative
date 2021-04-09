import React, { useReducer, useEffect } from 'react';
import { validate } from '../util/validators';
import TextField from '@material-ui/core/TextField';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const InputField = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onChange, errorText, ...other } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onChange(id, value, isValid);
  }, [id, value, isValid, onChange]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };


  const element =
    props.element === 'input' ? (
      // <input
      //   id={props.id}
      //   type={props.type}
      //   placeholder={props.placeholder}
      //   onChange={changeHandler}
      //   onBlur={touchHandler}
      //   value={inputState.value}
      // />
      <TextField 
        variant={props.variant}
        margin={props.margin}
        id={props.id}
        label={props.label}
        name={props.name}
        autoComplete={props.autoComplete}
        value={inputState.value}
        error={(!inputState.isValid && inputState.value != '') ? true : false}
        helperText={(!inputState.isValid && inputState.value != '') ? props.errorText : inputState.isTouched }
        onChange={changeHandler}
        {...other}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div>
      {element}
    </div>
  );
};

export default InputField;
