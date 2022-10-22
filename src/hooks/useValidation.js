import { useEffect, useState } from "react";


export const useValidation = (value, validations) => {

    const [errorText, setErrorText] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(false);
  
    useEffect(() => {
      for (const validation in validations) {
        switch(validation) {
          case 'minLength':
            value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
            break;
          case 'maxLength':
            value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
            break;
          case 'isEmpty':
            value ? setIsEmpty(false) : setIsEmpty(true);
            break;
          case 'isEmail':
            const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            reg.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
            break;
          default:
            console.log('Oh no, Validation Error!');
        }
      }
    }, [value]);
  
    useEffect(() => {
      if (isEmpty || minLengthError || maxLengthError || emailError) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
    }, [isEmpty, minLengthError, maxLengthError, emailError]);

    useEffect(() => {
      if (isEmpty) {
        setErrorText('field is empty');
      }
      else if (minLengthError) {
        setErrorText('min length is 6');
      }
      else if (maxLengthError) {
        setErrorText('max length is ...');
      }
      else if (emailError) {
        setErrorText('email is invalid');
      } else {
        setErrorText('');
      }
    }, [isEmpty, minLengthError, maxLengthError, emailError]);

    return { errorText, isEmpty, minLengthError, maxLengthError, emailError, inputValid };
  }