import React from 'react';
import styled from 'styled-components';

let ErrorMessage = styled.span`
    display: block;
    margin-bottom: 10px;
`

export let Input = ({ input, meta, ...props }) => {
    let isError = meta.touched && meta.error;
    return (
        <div>
            <input {...props} {...input}/>
            { isError && <ErrorMessage>{meta.error}</ErrorMessage> }
        </div>
    )
}