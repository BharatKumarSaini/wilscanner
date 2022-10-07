import React from 'react'
import { NativeModules, StyleSheet, View } from 'react-native'

import App from './App'

// export const addOne = (input: number) => input + 1

export const WitsScanner = () => {
  return (
    <View style={styles.container}>
      <App />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#000',
    // justifyContent: 'center',
    alignContent: 'center',
    // position: 'relative',

    //paddingVertical: 50,
  },
})

export default NativeModules.witsdocsscannerModule
