import { ValidationError } from 'yup';

interface MyYupErrors {
  [key: string]: string;
}

export default function getValidationErros(err: ValidationError): MyYupErrors {
  const validationErrors: MyYupErrors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
}
