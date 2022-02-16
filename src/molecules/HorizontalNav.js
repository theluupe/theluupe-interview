import React, { useCallback, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Nav from 'react-bootstrap/Nav';
import { SignUpModal } from '@organisms/SignUpModal';
import { LoginModal } from '@organisms/LoginModal';
import { getUser, removeUser } from '@lib/auth';

import Logo from '@assets/logos/theluupe.svg';

export const HEADER_HEIGHT = '84px';

export function HorizontalNav() {
  const router = useRouter();
  const user = getUser();
  const isAuthenticated = user != null;

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const signUpModalOnCloseHandler = useCallback(() => setShowSignUpModal(false), [setShowSignUpModal]);
  const signUpModalOnOpenHandler = useCallback(() => setShowSignUpModal(true), [setShowSignUpModal]);

  const loginModalOnCloseHandler = useCallback(async () => {
    setShowLoginModal(false);
    await router.push('/');
  }, [setShowLoginModal, router]);
  const loginModalOnOpenHandler = useCallback(() => setShowLoginModal(true), [setShowLoginModal]);

  const onClickLogout = async () => {
    removeUser();

    await router.push('/');
  };

  return (
    <header>
      <Wrapper className="py-2 px-4">
        <div className="d-flex align-items-center">
          <Nav.Item className="mr-4">
            <Link href="/">
              <a>
                <Logo css={{ color: 'var(--brand-red)' }} />
              </a>
            </Link>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/about">
              ABOUT
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/brands">
              BRANDS
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/our-artists">
              PHOTOGRAPHERS
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/blog">
              MAGAZINE
            </a>
          </Nav.Item>
        </div>
        {isAuthenticated && (
          <Dropdown variant="success" id="dropdown-basic">
            <Toggle id="dropdown-basic">{user.fullName}</Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onClickLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!isAuthenticated && (
          <div className="d-flex align-items-center">
            <Nav.Item className="mr-1">
              <Nav.Link className="btn btn-secondary" onClick={loginModalOnOpenHandler}>
                Log in
              </Nav.Link>
              <LoginModal show={showLoginModal} onClose={loginModalOnCloseHandler} />
            </Nav.Item>
            <Nav.Item className="mr-1">
              <Nav.Link className="btn btn-primary text-white ml-3" onClick={signUpModalOnOpenHandler}>
                Sign up
              </Nav.Link>
              <SignUpModal show={showSignUpModal} onClose={signUpModalOnCloseHandler} />
            </Nav.Item>
          </div>
        )}
      </Wrapper>
    </header>
  );
}

const Wrapper = styled(Nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${HEADER_HEIGHT};
  border-bottom: 1px solid var(--gray-low-surface);
  background-color: white;
  position: fixed;
  width: 100%;
  top: 0;
`;

const Toggle = styled(Dropdown.Toggle)`
  color: #f77b78 !important;
  text-transform: uppercase;
  font-family: 'Sailec';
  font-weight: 700;
  font-size: 12px;
  border-radius: 0px;
  border-color: white !important;
  outline: 0;
  ::after {
    content: '';
  }
  :focus {
    border-color: white !important;
    box-shadow: unset !important;
  }
`;