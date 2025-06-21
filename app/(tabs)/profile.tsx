import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Coins from '../components/coins'

const profile = () => {
  return (
    <View style={{ flex: 1}}>
      <View style={{ marginTop: useSafeAreaInsets().top, padding: 10, justifyContent: 'center', alignItems: 'flex-end'}}>
        <Coins/>
      </View>
      <View>
        <Text>
          This is the profile screen
        </Text>
      </View>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})