import React, { useState } from 'react';
import axios from 'axios';

import { Button } from '../UI/Button/button.component';

import * as Styled from './form.styles';

export const Form = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [form, setForm] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessMessage(false);
    setErrorMessage(false);
    axios({
      method: 'POST',
      url: 'http://localhost:3002/send',
      // url: 'https://pawanjs.herokuapp.com/send',
      data: values,
      mode: 'cors',
    }).then((response) => {
      if (response.data.status === 'success') {
        setValues({
          name: '',
          email: '',
          message: '',
        });
        setForm(false);
        setSuccessMessage(true);
      } else if (response.data.status === 'fail') {
        setErrorMessage(true);
      }
    });
  };

  return (
    <Styled.FormBlock>
      <Styled.FormWrapper>
        {form && (
          <form onSubmit={handleSubmit}>
            <label className="scr-reader" htmlFor="name">
              name
            </label>
            <Styled.Input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <label className="scr-reader" htmlFor="email">
              email
            </label>
            <Styled.Input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <label className="scr-reader" htmlFor="message">
              message
            </label>
            <Styled.TextArea
              type="email"
              id="message"
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder="Message"
              required
            />
            <Styled.FormButtonWrapper>
              <Button text="Send Message" type="submit" />
            </Styled.FormButtonWrapper>
          </form>
        )}
        {successMessage && (
          <Styled.FormSuccessMessage>
            Thank you! Your submission has been received!
          </Styled.FormSuccessMessage>
        )}
        {errorMessage && (
          <Styled.FormFailureMessage>
            Oops! May be you are offline or our server is busy.
          </Styled.FormFailureMessage>
        )}
      </Styled.FormWrapper>
    </Styled.FormBlock>
  );
};
