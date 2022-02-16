import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/react-hooks';

import { Login as LoginSchema } from '@shared/validation/schemas';
import { Login } from '@lib/gql/mutations.gql';
import { setUser } from '@lib/auth';

import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { ModalHeader } from '@molecules/ModalHeader';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';

export type ILoginModalProps = {
  show: boolean;
  onClose: () => void;
};

interface ILoginData {
  email: string;
  password: string;
}

export function LoginModal({ show, onClose }: ILoginModalProps): JSX.Element {
  const [login] = useMutation(Login);
  const initialValues = {};

  const handleSubmit = useCallback(
    async (form: Partial<ILoginData>) => {
      const { data } = await login({
        variables: { data: form },
      });

      console.log('user', data.login);

      setUser(data.login);
      onClose();
    },
    [onClose, login],
  );

  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader title="Login" onClose={onClose} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={LoginSchema}>
        {() => (
          <Form>
            <Modal.Body>
              <Row>
                <ColGroup>
                  <TextField label="Email" name="email" />
                </ColGroup>
              </Row>
              <Row>
                <ColGroup>
                  <TextField label="Password" name="password" type="password" />
                </ColGroup>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <SubmitButton>Login</SubmitButton>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
