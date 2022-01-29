import React from 'react';

import styled from '@emotion/styled';

import { HorizontalNav, HEADER_HEIGHT } from '@molecules/HorizontalNav';
import { SectionLoader } from '@molecules/SectionLoader';

type ISimpleLayout = React.PropsWithChildren<{
  loading: boolean;
}>;

export function PublicLayout({ loading, children }: ISimpleLayout): JSX.Element {
  return (
    <>
      <HorizontalNav />
      {loading ? <Loader /> : <Wrapper>{children}</Wrapper>}
    </>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: ${HEADER_HEIGHT};
  padding: 40px;
`;

const Loader = styled(SectionLoader)`
  height: calc(100vh - ${HEADER_HEIGHT});
`;
