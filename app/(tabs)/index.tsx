import { Ionicons } from '@expo/vector-icons';
import { SplashScreen, useRootNavigationState, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import gameInfo from '../../assets/staticData/gameInfo.json';
import { appConstants } from "../colors";
import Coins from '../components/coins';
import { setCoins } from '../redux/slices/coinSlice';
import { setUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import { getCoins, getUserDetails, initUser } from '../utils/dbUtils/userUtil';

SplashScreen.preventAutoHideAsync();

const index = () => {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    const getUser = async () => {
      await initUser();
      let userDetails = await getUserDetails();
      let coins = await getCoins();
      SplashScreen.hide();
      if(!userDetails){
        router.push('/components/onBoardProfile');
        return;
      } else {
        dispatch(setUser(userDetails));
        if(coins) dispatch(setCoins(coins));
      }
    }
    getUser();
  }, []);

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