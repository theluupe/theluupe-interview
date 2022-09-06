import React from 'react';
import { Formik, Form } from 'formik';
import BootstrapForm from 'react-bootstrap/Form';
import { FormGroupProps } from 'react-bootstrap/FormGroup';
import Col from 'react-bootstrap/Col';

const { Row, Group, Label } = BootstrapForm;

type IColGroupProps = React.PropsWithChildren<FormGroupProps>;

function ColGroup({ children, ...props }: IColGroupProps): JSX.Element {
  return (
    <Group as={Col} {...props}>
      {children}
    </Group>
  );
}

export { Formik, Form, Row, Col, Group, ColGroup, Label };
