import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/react-hooks';

import { IPost } from '@dal/Post';
import { Post as PostSchema } from '@shared/validation/schemas';
import { CreateOnePost } from '@lib/gql/mutations.gql';

import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { ModalHeader } from '@molecules/ModalHeader';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';

export type IAddPostModalProps = {
  show: boolean;
  onClose: () => void;
};

export function AddPostModal({ show, onClose }: IAddPostModalProps): JSX.Element {
  const [createOnePost] = useMutation(CreateOnePost);
  const initialValues = {};

  const handleSubmit = useCallback(
    async (post: Partial<IPost>) => {
      const createResults = await createOnePost({
        variables: {
          data: post,
        },
      });
      onClose();
      return createResults;
    },
    [onClose, createOnePost],
  );

  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader title="Add a user" onClose={onClose} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Row>
                <ColGroup>
                  <TextField label="Title" name="title" />
                </ColGroup>
              </Row>
              <Row>
                <ColGroup>
                  <TextField label="Post Content" name="content" />
                </ColGroup>
              </Row>
              {/* <Row>
                <ColGroup>
                  <TextField label="Author" name="author" />
                </ColGroup>
              </Row> */}
            </Modal.Body>
            <Modal.Footer>
              <SubmitButton>Add</SubmitButton>
              <Button disabled={isSubmitting} variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
