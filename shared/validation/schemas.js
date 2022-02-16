import * as yup from 'yup';

export const User = yup.object().shape({
  firstName: yup.string().required('Please enter your first name.'),
  lastName: yup.string().required('Please enter your last name.'),
  email: yup.string().email('Please enter a valid email address.'),
});

export const SignUp = yup.object().shape({
  firstName: yup.string().required('Please enter your first name.'),
  lastName: yup.string().required('Please enter your last name.'),
  email: yup.string().email('Please enter a valid email address.'),
  password: yup.string().required('Please enter your password.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const Login = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email.')
    .email('Please enter a valid email address.'),
  password: yup.string().required('Please enter your password.'),
});
