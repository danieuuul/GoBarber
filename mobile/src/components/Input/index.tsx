import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProperties } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon: string;
}

interface TextInputValueReference {
  value: string;
}

interface TextInputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<TextInputRef, InputProps> = (
  { name, icon, ...restProps },
  ref,
) => {
  const textInputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const textInputValueRef = useRef<TextInputValueReference>({
    value: defaultValue,
  });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!textInputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      textInputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: textInputValueRef.current,
      path: 'value',
      setValue(valueRef: any, value) {
        textInputValueRef.current.value = value;
        textInputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        textInputValueRef.current.value = '';
        textInputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={textInputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          textInputValueRef.current.value = value;
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...restProps}
      />
    </Container>
  );
};

export default forwardRef(Input);
