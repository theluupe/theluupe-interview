import React from 'react';
import styled from '@emotion/styled';

import { Loader } from '@atoms/Loader';

interface ISectionLoader {
  text?: string;
  simple?: boolean;
}

export function SectionLoader({ text, simple, ...props }: ISectionLoader): JSX.Element {
  return (
    <Wrapper {...props}>
      <Loader>
        {!simple && (
          <>
            <h5 className="text-center text-brand-black mb-3 mt-2">Loading...</h5>
            <div>Please wait while we finish loading your experience.</div>
          </>
        )}
      </Loader>
      {text && <div className="text-nowrap align-self-center ml-1">{text}</div>}
    </Wrapper>
  );
}
SectionLoader.defaultProps = {
  text: null,
  simple: false,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
