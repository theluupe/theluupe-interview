import React from 'react';
import styled from '@emotion/styled';

import { Icon } from '@atoms/Icon';

type ICloseButtonProps = {
  onClick: () => void;
};

function CloseButton({ onClick, ...props }: ICloseButtonProps): JSX.Element {
  return (
    <CloseWrapper role="button" onClick={onClick} tabIndex={0} {...props}>
      <Icon icon="close" size={12} color="var(--brand-bubble)" />
    </CloseWrapper>
  );
}

const CloseWrapper = styled.div`
  cursor: pointer;
`;

export { CloseButton };
