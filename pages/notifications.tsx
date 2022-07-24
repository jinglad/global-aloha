import React from 'react'
import Notification from '../src/components/Notification/Notification'
import { redirectUnAuthenticatedSSR } from '../src/utils/utils'

const NotificationsPage = () => {
  return (
    <div>
      <Notification type="notification" />
    </div>
  )
}

export default NotificationsPage

NotificationsPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);