import React, { useState } from 'react'
import { Button, StyleSheet, TextInput } from 'react-native'
import Snackbar from 'react-native-snackbar'
//import {getPhoneNumber} from 'react-native-device-info';

function PhoneSignIn({ navigation, refRBSheet }: any) {
  // If null, no SMS has been sent
  const [confirmationCode, setConfirm] = useState<any>(null)
  const [phoneNo, setPhoneNo] = useState('')
  const [code, setCode] = useState('')
  const Phone = '+91'

  // function onAuthStateChanged(user: any) {
  //   console.log('user state changed------', user)
  // }

  const Confirmed = () => {
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

  async function confirmCode() {
    console.log('code is :', code)

    try {
      //const test = await confirmationCode.confirm(code)
      Confirmed()
      console.log('this is the result     --------------------')
    } catch (error) {
      Snackbar.show({
        text: 'Invalid Code',
        duration: Snackbar.LENGTH_SHORT,
      })
    }
  }

  // useEffect(async () => {
  //  const  await getPhoneNumber();
  // });

  if (!confirmationCode) {
    return (
      <>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPhoneNo(text)}
          placeholder='Enter Your Phone No.'
          value={phoneNo}
        />
        <Button title='Send OTP' onPress={() => setConfirm('yo')} />
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
      <Button title='Confirm OTP' onPress={() => confirmCode()} />
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
