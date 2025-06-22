import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const index = () => {
  const WELCOME_MESSAGE = "Welcome! Please fill in a few details to get started.";
  const router = useRouter();
  const { user } = useLocalSearchParams();
  const [welcomeMessage, setWelcomeMessage] = React.useState(WELCOME_MESSAGE);
  const [formData, setFormData] = React.useState({
    name: "",
    userName: "",
    age: "",
    gender: ""
  });

  React.useEffect(() => {
    if(user) {
      setWelcomeMessage("Update Details");
      setFormData(JSON.parse(user as string));
    }
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if(user){ 
      router.back();
      return;
    };
    router.push('/');
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ padding: 10, alignItems: "center", justifyContent: "center" }}>
        <Text style={{fontWeight: 'bold', fontSize: 24, textAlign: 'center'}}>
            {welcomeMessage}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
            <Text>
                Name
            </Text>
            <TextInput 
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            style={styles.input}
            placeholder="Adam..." />
        </View>
        <View style={styles.container}>
            <Text>
                Usernamme
            </Text>
            <TextInput
            value={formData.userName}
            onChangeText={(text) => handleChange('userName', text)}
            style={styles.input}
            placeholder="CoolMind..." />
        </View>
        <View style={styles.container}>
            <Text>
                Age
            </Text>
            <TextInput
            style={styles.input}
            value={formData.age}
            onChangeText={(text) => handleChange('age', text.replace(/[^0-9]/g, ''))}
            keyboardType='numeric' placeholder="25" />
        </View>
        <View style={styles.container}>
          <Text>Gender</Text>
          <TextInput
            placeholder="Male / Female / Other"
            value={formData.gender}
            onChangeText={(text) => handleChange('gender', text)}
            style={styles.input}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 10, alignItems: "center", justifyContent: "center", width: '100%', alignSelf: 'flex-end'}}>
        <TouchableOpacity 
          onPress={handleSubmit} 
          style={{
            backgroundColor: '#007BFF',
            padding: 10,
            borderRadius: 8,
            width: '100%',
            alignItems: 'center',
             opacity: !formData.name || !formData.userName || !formData.age || !formData.gender ? 0.5 : 1,
          }}
          disabled={!formData.name || !formData.userName || !formData.age || !formData.gender}
          >
            <Text 
            style={{ fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            Submit
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 'auto',
        borderRadius: 15
    },
    input: {
    marginTop: 5,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
});
