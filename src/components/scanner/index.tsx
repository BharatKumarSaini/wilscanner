import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import CameraScanner from '../../Camera'

export const Scanner = () => {
  const [data, setData] = useState()
  console.log(data)

  return (
    <View style={styles.ScannerContainer}>
      <CameraScanner
        apiKey='SQSKUdOMO6BcbK1I090571wsfl0JMjWPd971AIMidtIJqWkJmL13l8umXzEjQmoP'
        url='https://asli-documents-service.dev.in.affinidi.io/api/v1/documents/extract-document'
        documentType='ADHAR'
        getResponse={setData}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  ScannerContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#000',
    // justifyContent: 'center',
    alignContent: 'center',
    // position: 'relative',
  },
})

export default Scanner
