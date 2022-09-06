import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Spinner from 'react-bootstrap/Spinner';

type ILoaderProps = React.PropsWithChildren<{
  size: 'xs' | 'sm' | 'md' | 'lg';
  color: string;
  inline?: boolean;
}> &
  React.HTMLAttributes<HTMLElement>;

export function Loader({ color, children, size, ...props }: ILoaderProps): JSX.Element {
  return (
    <Wrapper size={size} color={color} {...props}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      {children && <div className="mt-3">{children}</div>}
    </Wrapper>
  );
}

Loader.defaultProps = {
  color: 'var(--brand-black)',
  size: 'lg',
};

const getSizingProperties = (size: string) => {
  switch (size) {
    case 'xs':
      return css`
        width: 10px;
        height: 10px;
        border-width: 1px;
      `;
    case 'sm':
      return css`
        width: 1rem;
        height: 1rem;
        border-width: 3px;
      `;
    case 'md':
      return css`
        width: 2rem;
        height: 2rem;
        border-width: 5px;
      `;
    case 'lg':
      return css`
        width: 50px;
        height: 50px;
        border-width: 5px;
      `;
    default:
      return css`
        width: 50px;
        height: 50px;
        border-width: 5px;
      `;
  }
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  ${({ inline }) =>
    !inline &&
    css`
      flex: 1;
      height: 100%;
    `}

  .spinner-border {
    ${({ size }: ILoaderProps) => getSizingProperties(size)}
    ${({ color }: ILoaderProps) => css`
      color: ${color};
    `}
  }
`;
