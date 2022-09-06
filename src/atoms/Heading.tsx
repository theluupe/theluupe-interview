import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

type IHeadingProps = React.PropsWithChildren<{
  type?: string;
  variant?: string;
  className?: string;
}>;

const elements: { [key: string]: string } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

export function Heading({ type, children, ...props }: IHeadingProps): JSX.Element {
  return (
    <Wrapper type={type} {...props}>
      {children}
    </Wrapper>
  );
}

Heading.defaultProps = {
  type: 'h5',
  variant: 'primary',
};

const Wrapper = styled(({ type, children, ...props }) => React.createElement(elements[type], props, children))`
  ${({ variant }) =>
    variant === 'secondary' &&
    css`
      color: var(--copy-black-high);
    `}

  ${({ variant }) =>
    variant === 'tertiary' &&
    css`
      color: var(--copy-black-low);
    `}
`;
