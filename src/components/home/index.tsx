import React, { useRef } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'

import PhoneSignIn from '../phone/auth/index'
const Home = ({ navigation }: any) => {
  const refRBSheet = useRef<any>(null)
  return (
    <View style={styles.AppContainer}>
      <Button
        title='Welcome to Wits Scanner'
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <PhoneSignIn navigation={navigation} refRBSheet={refRBSheet} />
      </RBSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
})

export default Home
