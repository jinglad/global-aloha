import React from 'react'
import Notification from '../src/components/Notification/Notification'
import { redirectUnAuthenticatedSSR } from '../src/utils/utils';

const RequestPage = () => {
  return (
    <Notification type='request' />
  )
}

export default RequestPage;

RequestPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);