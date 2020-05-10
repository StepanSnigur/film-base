import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.span`
  display: block;
  margin-bottom: 10px;
`

interface IInput {
  input: any,
  meta: any
}
export const Input: React.FC<IInput> = ({ input, meta, ...props }) => {
  const isError = meta.touched && meta.error;
  return (
    <div>
      <input {...props} {...input}/>
      {isError && <ErrorMessage>{meta.error}</ErrorMessage>}
    </div>
  )
}

export const CheckboxInput: React.FC<IInput> = ({ input, meta, ...props }) => <input type="checkbox" {...props} {...input} />
