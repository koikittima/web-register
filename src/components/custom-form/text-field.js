import React from 'react';
import { Form, Text } from 'rsuite';

const TextField = React.forwardRef((props, ref) => {
  const { name, isRequired, label, accepter, data, ...rest } = props;

  return (
    <Form.Group ref={ref}>
      <Form.ControlLabel className="!text-[14px] font-bold !flex items-center">
        {label}
        {isRequired && <Text className="!text-red-600">*</Text>}
      </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
export default TextField;
