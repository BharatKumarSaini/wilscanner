import React, { useEffect, useRef, useState } from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BarcodeMask from 'react-native-barcode-mask'
import ImageResizer from 'react-native-image-resizer'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

// export const addOne = (input: number) => input + 1

interface IScannerProps {
  apiKey: string
  url: string
  documentType: 'ADHAR' | 'PANCR'
  buttonComponent?: React.ReactNode
  getResponse: any
}

export const CameraScanner = (props: IScannerProps) => {
  const [hasPermission, setHasPermission] = useState(false)
  const devices = useCameraDevices()
  const device = devices.back
  const cameraRef = useRef<Camera>(null)

  const requestCameraPermission = async () => {
    return await Camera.requestCameraPermission()
  }

  useEffect(() => {
    console.log('props from package', props)
  })

  const onPhotoCaptured = async (refference: any) => {
    const formData = new FormData()

    // const apiKey =
    //   'SQSKUdOMO6BcbK1I090571wsfl0JMjWPd971AIMidtIJqWkJmL13l8umXzEjQmoP'
    // const url =
    //   'https://asli-documents-service.dev.in.affinidi.io/api/v1/documents/extract-document'

    const headers = {
      Accept: 'application/json',
      'api-key': props.apiKey,
      'Content-Type': 'multipart/form-data',
    }

    const photo = await refference.current.takePhoto({
      flash: 'off',
    })

    const optimize = await ImageResizer.createResizedImage(
      `file://${photo.path}`,
      1000,
      1000,
      'JPEG',
      100
    )

    const uriParts = photo.path.split('.')
    const fileType = uriParts[uriParts.length - 1]

    const frontSideDoc = {
      uri: optimize?.uri,
      type: `image/${fileType}`,
      name: `${uriParts[2]}.${fileType}`,
      mimetype: `image/${fileType}`,
    }

    formData.append('docType', props.documentType)
    formData.append('frontSideDocument', frontSideDoc)

    try {
      const response = await fetch(props.url, {
        method: 'post',
        body: formData,
        headers,
      })

      const res = await response.json()

      props.getResponse(res)

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isMounted: boolean = true
    requestCameraPermission().then((permission) => {
      if (isMounted) {
        if (permission === 'denied') {
          Linking.openSettings()
        }
        setHasPermission(permission === 'authorized')
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  if (device == null || !hasPermission) {
    return <View style={styles.container} />
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        device={device}
        style={StyleSheet.absoluteFill}
        isActive={true}
        torch={'off'}
        photo={true}
      />
      <BarcodeMask
        lineAnimationDuration={2000}
        showAnimatedLine={true}
        width={280}
        height={230}
        outerMaskOpacity={0.4}
        backgroundColor='#eee'
        edgeColor={'#fff'}
        edgeBorderWidth={4}
        edgeHeight={25}
        edgeWidth={25}
        edgeRadius={5}
        animatedLineColor={'#0097AB'}
        animatedLineOrientation='horizontal'
      />
      {/* <Button
        onPress={() => {
          // captureImage(cameraRef);
          onPhotoCaptured(cameraRef)
        }}
        title='Click'
        
      /> */}
      <TouchableOpacity
        onPress={() => {
          // captureImage(cameraRef);
          onPhotoCaptured(cameraRef)
        }}
      >
        <PrimaryButton>Capture</PrimaryButton>
      </TouchableOpacity>
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

const PrimaryButton = ({ children }: any) => {
  return (
    <View style={styles2.buttonContainer}>
      <Text style={styles2.buttonText}>{children}</Text>
    </View>
  )
}

const styles2 = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'blue',
    height: 80,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
})

export default CameraScanner
