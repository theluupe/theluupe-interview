import React from 'react';
import Head from 'next/head';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { withApollo } from '@lib/apollo';

import { Icon } from '@atoms/Icon';
import InstagramLogo from '@assets/logos/instagram.svg';
import { PublicLayout } from '@templates/Layout';

function Error() {
  const title = 'Whoops!';
  return (
    <PublicLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <Row>
        <Col lg="8" className="pt-3">
          <h2>{title}</h2>
          <div>
            <p>
              {`
                Something went wrong and we're unable to load your experience. Don't worry, our tech team is on the
                case! In the meantime, check out our blog and Instagram for inspiring stories and images from today's
                most creative women:
              `}
            </p>
          </div>
          <ul className="links mt-4">
            <li>
              <Button
                variant="link"
                href="https://www.instagram.com/theluupe/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLogo className="mr-2" />
                Follow @TheLuupe on Instagram
              </Button>
            </li>
            <li>
              <Button variant="link" href="https://theluupe.com/blog/" target="_blank">
                <Icon icon="announcement" className="mr-2" />
                Read our blog and stay In The Luupe
              </Button>
            </li>
          </ul>
        </Col>
      </Row>
    </PublicLayout>
  );
}

// eslint-disable-next-line import/no-default-export
export default withApollo(Error);
