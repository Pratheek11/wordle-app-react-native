import { Ionicons } from '@expo/vector-icons';
import { useRootNavigationState, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import gameInfo from '../../assets/staticData/gameInfo.json';
import { appConstants } from "../colors";
import Coins from '../components/coins';

const index = () => {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  React.useEffect(() => {
  if (!navigationState?.key) return;
  
  const user = null; // or pull from AsyncStorage, context, etc.

  if (!user) {
    setTimeout(() => {
      // router.replace('/components/onBoardProfile');
    }, 0);
  }
  }, [navigationState?.key]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end', padding: 10 }}>
        <Coins/>
      </View>
      <Animated.View
       entering={FadeInRight.springify().damping(80).stiffness(200)}
       style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
         <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: appConstants.borderRadius,
              padding: 10,
              elevation: 2,
            }}
            onPress={() => router.push({pathname: '/components/gameInfo', params: {data: JSON.stringify(gameInfo)}})}
          >
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              width: 120,
              backgroundColor: '#fff',
              borderRadius: appConstants.borderRadius,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
            }}
            onPress={() => router.push('/game/wordleGame')}
          >
            <Text style={{fontSize: 24, fontWeight: 'bold', letterSpacing: 5}}>PLAY</Text>
          </TouchableOpacity>
        </Animated.View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})