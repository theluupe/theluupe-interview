import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/react-hooks';

import { SignUp as SignUpSchema } from '@shared/validation/schemas';
import { SignUp } from '@lib/gql/mutations.gql';

import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { ModalHeader } from '@molecules/ModalHeader';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';

export type ISignUpModalProps = {
  show: boolean;
  onClose: () => void;
};

interface ISignUpData {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  passwordConfirmation: string;
}

export function SignUpModal({ show, onClose }: ISignUpModalProps): JSX.Element {
  const [signUp] = useMutation(SignUp);
  const initialValues = {};

  const handleSubmit = useCallback(
    async ({ email, firstName, lastName, password }: Partial<ISignUpData>) => {
      const { data } = await signUp({
        variables: {
          data: { email, firstName, lastName, password },
        },
      });
      onClose();
      return data.signUp;
    },
    [onClose, signUp],
  );

  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader title="Sing Up" onClose={onClose} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignUpSchema}>
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
                  <TextField label="First name" name="firstName" />
                </ColGroup>
              </Row>
              <Row>
                <ColGroup>
                  <TextField label="Last name" name="lastName" />
                </ColGroup>
              </Row>
              <Row>
                <ColGroup>
                  <TextField label="Password" name="password" type="password" />
                </ColGroup>
              </Row>
              <Row>
                <ColGroup>
                  <TextField label="Password Confirmation" name="passwordConfirmation" type="password" />
                </ColGroup>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <SubmitButton>Save</SubmitButton>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
