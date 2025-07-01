import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Coins from "../components/coins";
import { RootState } from "../redux/store";

const profile = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: useSafeAreaInsets().top,
          padding: 10,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Coins />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "90%",
            marginHorizontal: 'auto',
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            padding: 5,
          }}
        >
          <View style={{flexDirection: 'row', width: '80%', margin: 5, alignItems: 'center', justifyContent: 'space-between'}}>
            <FontAwesome name="user-circle-o" size={40} />
            <TouchableOpacity 
              onPress={() => router.push({pathname: '/components/onBoardProfile', params: { user : JSON.stringify(user)}})}
            >
              <Feather name="edit-2" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text style={styles.fieldName}>Name:</Text>
            <TextInput value={user.name} editable={false} />
          </View>
          <View style={styles.container}>
            <Text style={styles.fieldName}>Username:</Text>
            <TextInput value={user.username} editable={false} />
          </View>
          <View style={styles.container}>
            <Text style={styles.fieldName}>Age:</Text>
            <TextInput value={user.age + ""} editable={false} />
          </View>
          <View style={styles.container}>
            <Text style={styles.fieldName}>Gender:</Text>
            <TextInput value={user.gender} editable={false} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    borderRadius: 15,
    width: "45%",
    backgroundColor: '#f0f0f0'
  },
  fieldName: {
    color: 'grey'
  }
});
