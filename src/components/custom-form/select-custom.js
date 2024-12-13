import React from 'react';
import { SelectPicker, VStack } from 'rsuite';

const Select = React.forwardRef((props, ref) => {
  const { name, label, selectLabel, placeholder, isRequired, data, value, labelKey, valueKey, className, ...rest } =
    props;
  return (
    <VStack>
      <label className="!text-[14px] font-bold !flex items-center">{label}</label>
      <SelectPicker
        {...rest}
        data={data}
        label={selectLabel}
        placeholder={placeholder}
        name={name}
        value={value}
        labelKey={labelKey}
        valueKey={valueKey}
        className={className}
      />
    </VStack>
  );
});

export default Select;
