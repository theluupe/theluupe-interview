import React from 'react';
import { Modal } from 'react-bootstrap';
import styled from '@emotion/styled';

import { CloseButton } from '@atoms/CloseButton';
import { ModalActions } from '@atoms/ModalActions';

type IModalHeaderProps = React.PropsWithChildren<{
  as?: React.ElementType<any>;
  title: string;
  hideCloseButton?: boolean;
  onClose: () => void;
}>;

function ModalHeader({ as, title, hideCloseButton, children, onClose }: IModalHeaderProps): JSX.Element {
  return (
    <Wrapper>
      <Modal.Title as={as}>{title}</Modal.Title>
      <ModalActions>
        <ModalActionContent>{children}</ModalActionContent>
        {!hideCloseButton && <CloseButton onClick={onClose} />}
      </ModalActions>
    </Wrapper>
  );
}

ModalHeader.defaultProps = {
  as: 'h5',
  hideCloseButton: false,
};

const Wrapper = styled(Modal.Header)`
  display: flex;
  align-items: flex-start;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--gray-low-focus);
`;

const ModalActionContent = styled(ModalActions)`
  //fixes vertical alignment for fonts
  > * {
    margin-top: 2px;
  }
`;

export { ModalHeader };
