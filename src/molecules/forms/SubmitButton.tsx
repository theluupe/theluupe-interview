import React from 'react';
import { useFormikContext } from 'formik';
import Button from 'react-bootstrap/Button';

type ISubmitButtonProps = React.PropsWithChildren<unknown>;

export function SubmitButton({ children }: ISubmitButtonProps): JSX.Element {
  const { isValid, submitCount, isSubmitting, validateOnMount } = useFormikContext();

  const invalidSubmissionAttempted = submitCount > 0 && !isValid;
  const hasCheckedError = validateOnMount ? !isValid : invalidSubmissionAttempted;
  const shouldDisable = isSubmitting || hasCheckedError;

  return (
    <div className="d-flex align-items-center mt-3">
      <Button type="submit" disabled={shouldDisable}>
        {children}
      </Button>
      {invalidSubmissionAttempted && <div className="text-hint text-danger ml-3">Please review the errors above.</div>}
    </div>
  );
}

SubmitButton.defaultProps = {
  children: <span>Submit</span>,
};
