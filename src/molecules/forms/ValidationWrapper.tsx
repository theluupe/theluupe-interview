import React from 'react';
import { css } from '@emotion/core';
import { Col, Row } from '@atoms/Form';

import { FieldMetaProps } from 'formik';

import { Icon } from '@atoms/Icon';

const hintStyle = css`
  color: var(--copy-black-disabled);
`;

const defaultIconStyle = css`
  width: 15px;
  height: 15px;
  margin-bottom: 0.75rem;
`;

type IValidationWrapperProps = React.PropsWithChildren<{
  meta: FieldMetaProps<unknown>;
  hint?: React.ReactNode;
}>;

export function ValidationWrapper({ meta, hint, children }: IValidationWrapperProps): JSX.Element {
  const showError = meta.error && meta.touched;
  let icon = <div />;

  if (!meta.error && meta.touched) {
    icon = <Icon icon="success" className="text-success" />;
  } else if (showError) {
    icon = <Icon icon="error" className="text-danger" />;
  }

  return (
    <>
      <Row>
        <Col>{children}</Col>
        <Col xs="auto" className="d-flex align-items-end pb-2 position-relative">
          <div css={defaultIconStyle}>{icon}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          {showError ? (
            <div className="text-hint text-danger">{meta.error}</div>
          ) : (
            <div css={hintStyle} className="text-hint">
              {hint}
            </div>
          )}
        </Col>
        {/* Spacer so hint doesn't wrap past the input */}
        {(showError || hint) && (
          <Col xs="auto" className="d-flex align-items-end pb-2">
            <div style={{ width: 15 }} />
          </Col>
        )}
      </Row>
    </>
  );
}

ValidationWrapper.defaultProps = {
  hint: null,
  children: null,
};
