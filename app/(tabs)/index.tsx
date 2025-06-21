import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { appConstants } from "../colors";
import Coins from '../components/coins';
import GameInfo from '../components/gameInfo';

const index = () => {
  const router = useRouter();
  const [infoModal, setInfoModal] = React.useState(false);

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
            onPress={() => setInfoModal(true)}
          >
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Modal
            visible={infoModal}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={() => setInfoModal(false)}
            >
              <GameInfo setInfoModal={setInfoModal}/>
          </Modal>
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
            onPress={() => router.push('/game')}
          >
            <Text style={{fontSize: 24, fontWeight: 'bold', letterSpacing: 5}}>PLAY</Text>
          </TouchableOpacity>
        </Animated.View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})