import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

// FormControl is a styled component
const FormControl = styled.div`  // will be used as a component in JSX, so it should start with a capital letter

margin: 0.5rem 0;

& label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.invalid ? 'red' : '#000'}
}

& input {
  display: block;
  width: 100%;
  border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
  background: ${props => props.invalid ? '#ffd7d7' : '#fff'}
  font: inherit;
  line-height: 1.5rem;
  padding: 0 0.25rem;
}

& input:focus {
  outline: none;
  background: #fad0ec;
  border-color: #8b005d;
}
`;

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');

  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim()) {
      props.onAddGoal(enteredValue);
      setEnteredValue('');
    } else {
      setIsValid(false);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <FormControl invalid={!isValid}>
        <label>Course Goal</label>
        <input value={enteredValue} style={{border: isValid ? '1px solid black':'1px solid red'}} type="text" onChange={goalInputChangeHandler} />
      </FormControl>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
