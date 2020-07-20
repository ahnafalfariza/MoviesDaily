import React from 'react'
import {SafeAreaView, StatusBar} from 'react-native'

// eslint-disable-next-line react/prop-types
const Screen = ({children}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaView>
  )
}

export default Screen