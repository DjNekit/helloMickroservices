import React from 'react'
import { Form } from 'react-bootstrap-v5'
import { useField } from 'formik'

export const FieldInput = props => {
    const [field] = useField(props);
    return (
        <Form.Control {...field} {...props} />
    )
}