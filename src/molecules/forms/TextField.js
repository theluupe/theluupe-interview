/**
 * Material Design inspired text input with animated label on focus.
 * This is required to be in a FormikContext.
 */

import React, { useEffect, useState, useRef } from 'react';
import { useField } from 'formik';
import { IMaskInput } from 'react-imask';
import Form from 'react-bootstrap/Form';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';
import uniqid from 'uniqid';
import autosize from 'autosize';
import isEqual from 'react-fast-compare';

import { ValidationWrapper } from './ValidationWrapper';

const containerStyle = css`
  position: relative;
  padding-top: 1.5rem;

  .form-label {
    cursor: text;
    position: absolute;
    transition: all 100ms ease-in-out;
  }
`;

const labelStyleBase = css`
  pointer-events: none;
`;

const labelStyleBlur = css`
  font-size: 1rem;
  top: 0.4rem;
`;

const labelStyleFocus = css`
  top: -1.1rem;
  font-size: 0.75rem;
`;

export const UnmemoizedTextField = React.forwardRef(
  (
    {
      className,
      controlId: suppliedControlId,
      field,
      hint,
      label,
      meta,
      multiline,
      onBlur,
      onClick,
      onFocus,
      as: Component,
      beforeComponent: Before,
      afterComponent: After,
      ...props
    },
    ref,
  ) => {
    const [controlId, setControlId] = useState(suppliedControlId);
    const [isFocus, setIsFocus] = useState(false);
    const containerRef = useRef(ref);
    const componentRef = useRef();
    const multilineProps = multiline ? { as: 'textarea', rows: 1 } : {};
    const labelFocused = isFocus || !!field.value?.toString().trim();

    const labelStyle = label && labelFocused ? labelStyleFocus : labelStyleBlur;

    useEffect(() => {
      const { current: container } = containerRef;
      const { current: component } = componentRef;
      let imaskInst;

      // Set id
      if (!controlId) {
        setControlId(uniqid());
      }

      const handleFocusin = e => {
        setIsFocus(true);
        if (isFunction(onFocus)) onFocus(e);
      };

      const handleFocusout = e => {
        setIsFocus(false);
        // Call Formik blur
        field.onBlur(e);
        // Call onBlur if it is passed in (e.g. for react-day-picker)
        if (isFunction(onBlur)) onBlur(e);
      };

      container.addEventListener('focusout', handleFocusout);
      container.addEventListener('focusin', handleFocusin);
      if (isFunction(onClick)) container.addEventListener('click', onClick);

      if (multiline && component) {
        autosize(component);
      }

      // Cleanup function
      return () => {
        container.removeEventListener('focusout', handleFocusout);
        container.removeEventListener('focusin', handleFocusin);
        if (isFunction(onClick)) container.removeEventListener('click', onClick);
        autosize.destroy(component);
        if (imaskInst) {
          imaskInst.destroy();
        }
      };
    }, [controlId, onBlur, onClick, onFocus, field.onBlur, multiline]);

    return (
      <Form.Group
        ref={containerRef}
        controlId={controlId}
        css={containerStyle}
        className={className}
        data-label-focused={labelFocused}
      >
        <ValidationWrapper meta={meta} hint={hint}>
          <div className="d-flex align-items-center position-relative">
            {Before && <Before field={field} />}
            <Component ref={componentRef} {...multilineProps} {...field} {...props} />
            {After && After}
          </div>
          {label && <Form.Label css={[labelStyleBase, labelStyle]}>{label}</Form.Label>}
        </ValidationWrapper>
      </Form.Group>
    );
  },
);

UnmemoizedTextField.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  controlId: PropTypes.string,
  field: PropTypes.object.isRequired,
  hint: PropTypes.node,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  multiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  beforeComponent: PropTypes.elementType,
  afterComponent: PropTypes.elementType,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
};

UnmemoizedTextField.defaultProps = {
  as: Form.Control,
  className: null,
  controlId: null,
  beforeComponent: null,
  afterComponent: null,
  hint: null,
  label: null,
  multiline: false,
  onBlur: null,
  onClick: null,
  onFocus: null,
  onKeyUp: null,
  type: 'text',
};

const areFieldPropsEqual = (prev, next) => {
  const compareFields = ['field', 'meta', 'label', 'afterComponent'];
  const comparePrev = pick(prev, compareFields);
  const compareNext = pick(next, compareFields);
  return isEqual(comparePrev, compareNext);
};

const MemoizedTextField = React.memo(UnmemoizedTextField, areFieldPropsEqual);

export function TextField(props) {
  const [field, meta] = useField(props);
  return <MemoizedTextField field={field} meta={meta} {...props} />;
}

export function InstagramField(props) {
  return (
    <MaskedField
      {...props}
      label="Instagram handle"
      name="instagramHandle"
      className="w-100"
      // NOTE: here we specify the prefix and the format we want, this means that the input
      // will force the format to start @ and have a maximum of 28 characters, but we can't
      // set multiple types of values to the format, so instead of expecting a string or number,
      // we need to use '*' which also allows symbols that are not valid for instagram, therefore
      // we need to make sure to validate this on formik by using the correct handle name
      mask={{ mask: '@****************************' }}
    />
  );
}

const UnmemoizedMaskField = React.forwardRef(({ mask, helpers, ...props }, ref) => {
  const { value } = props;
  return (
    <IMaskInput
      ref={ref}
      type="text"
      className="form-control"
      {...mask}
      {...props}
      value={value.toString()}
      onAccept={_value => helpers.setValue(_value)}
    />
  );
});

const MemoizedMaskField = React.memo(UnmemoizedMaskField, areFieldPropsEqual);

const ConfiguredMaskField = React.forwardRef((props, ref) => {
  const [field, meta, helpers] = useField(props);
  return <MemoizedMaskField ref={ref} field={field} meta={meta} helpers={helpers} {...props} />;
});

export function MaskedField(props) {
  return <TextField as={ConfiguredMaskField} {...props} />;
}
