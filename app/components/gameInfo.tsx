import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type GameInfoProps = {
  setInfoModal: (value: boolean) => void;
};

const GameInfo = ({ setInfoModal }: GameInfoProps) => {
  const router = useRouter()
  return (
    <View>
      <View style={{padding: 10, flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity onPress={() => setInfoModal(false)}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text>GameInfo</Text>
    </View>
  )
}

export default GameInfo

const styles = StyleSheet.create({})