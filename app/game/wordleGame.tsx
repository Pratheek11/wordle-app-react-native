import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Coins from '../components/coins';

const index = () => {
  const router = useRouter();

  React.useEffect(() => {
    // This is where you can add any initialization logic for the game
    axios.get('https://random-word-api.herokuapp.com/word?length=5').then((response) => {
      alert(`Game word is: ${response.data[0]}`);
    }).catch((error) => {
      if (error.includes('503')) {
        alert('Service Unavailable. Please try again later.');
      } else {
        alert('Error fetching game word:');
      }
      router.back();
    });
    return () => {};
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: useSafeAreaInsets().top , alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 10, width: '100%' }}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Coins/>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>This is the game screen</Text>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})