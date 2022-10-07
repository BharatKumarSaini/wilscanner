import React, { useState } from 'react'
import { Button, StyleSheet, TextInput } from 'react-native'
import Snackbar from 'react-native-snackbar'

function PhoneSignIn({ navigation, refRBSheet }: any) {
  // If null, no SMS has been sent
  const [confirmationCode, setConfirm] = useState<any>(null)
  const [phoneNo, setPhoneNo] = useState('')
  const [code, setCode] = useState('')

  // function onAuthStateChanged(user: any) {
  //   console.log('user state changed------', user)
  // }

  const Clicked = () => {
    refRBSheet.current.close()
    navigation.navigate('Scanner')
  }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
  //   return subscriber // unsubscribe on unmount
  // }, [])

  // Handle the button press
  // async function signInWithPhoneNumber(phoneNumber: string) {
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
  //   setConfirm(confirmation)
  // }

  const confirmOTP = () => {
    console.log('code is :', code)

    try {
      //const test = await confirmationCode.confirm(code)
      Clicked()
      console.log('Opening Scanner')
    } catch (error) {
      Snackbar.show({
        text: 'Invalid Code',
        duration: Snackbar.LENGTH_SHORT,
      })
    }
  }

  if (!confirmationCode) {
    return (
      <>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPhoneNo(text)}
          placeholder='Enter Your Phone No.'
          value={phoneNo}
        />
        <Button title='Send OTP' onPress={() => setConfirm('pressed')} />
      </>
    )
  }

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCode(text)}
        value={code}
        placeholder='Enter OTP'
        keyboardType='numeric'
      />
      <Button title='Confirm OTP' onPress={() => confirmOTP()} />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default PhoneSignIn
