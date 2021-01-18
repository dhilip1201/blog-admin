import React from 'react'
import { Form } from "react-bootstrap";
/**
* @author
* @function TextArea
**/

const TextArea = (props) => {
  return(
    <Form.Group >
                {props.label && <Form.Label>{props.label}</Form.Label>}
            
                <Form.Control as="textarea" rows={3} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
                <Form.Text className="text-muted">
                    {props.error}
                </Form.Text>
     </Form.Group>
   )

 }

export default TextArea