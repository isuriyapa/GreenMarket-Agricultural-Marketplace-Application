import { View, Text } from 'react-native'
import React from 'react'
import BiddingRequestsTopNavigation from '../Navigations/BiddingRequestsTopNavigation';

import Header from '../SharedComponents/Header';

export default function BiddingView() {
  return (
    <>
    <Header/>
    <BiddingRequestsTopNavigation />
    </>
  )
}