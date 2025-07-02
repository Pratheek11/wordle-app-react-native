import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOut,
  FadeOutRight,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import Coins from "../components/coins";
import { removeCoins, setCoins } from "../redux/slices/coinSlice";
import { RootState } from "../redux/store";
import { Endpoints } from "../utils/apiUtils/endpoints";
import { storeCoinValue } from "../utils/dbUtils/userUtil";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => (state.coins.total));
  const user = useSelector((state: RootState) => (state.user));
  const [currentWord, setCurrentWord] = React.useState<string>("CAKES");
  const [currentGuessIndex, setCurrentGuessIndex] = React.useState<number>(0);
  const [guessWords, setGuessWords] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [wordsBg, setWordsBg] = React.useState<string[]>(["", "", "", "", ""]);
  const [keyBg, setKeyBg] = React.useState<{
    trueKey: string[];
    presentKey: string[];
    falseKey: string[];
  }>({
    trueKey: [],
    presentKey: [],
    falseKey: [],
  });
  const [winner, setWinner] = React.useState(false);
  const [earnedCoins, setEarnedCoins] = React.useState<number>(0);

  React.useEffect(() => {
    getGuessWord();
    return () => {};
  }, []);

  const getGuessWord = () => {
    axios
      .get(Endpoints.getWord)
      .then((response) => {
        const resp: string = response.data[0];
        alert(`Game word is: ${resp.toUpperCase()}`);
        setCurrentWord(resp.toUpperCase());
      })
      .catch((error) => {
        if (error.includes("503")) {
          alert("Service Unavailable. Please try again later.");
        } else {
          alert("Error fetching game word:");
        }
        router.push('/');
      });
  }

   const handleCheckValidWord = () : boolean => {
    if(guessWords[currentGuessIndex].length < 5)  return false;
    axios.get(Endpoints.dictonary + guessWords[currentGuessIndex])
      .then((response) => {
        return false;
      })
      .catch((error) => {
        return true;
      });
    return false;
  }

  const handleBackgroundColor = (symbol: string) => {
    if (symbol.toUpperCase() === "T") {
      return "#5bc783";
    } else if (symbol.toUpperCase() === "P") {
      return "#FBC503";
    } else if (symbol.toUpperCase() === "F") {
      return "grey";
    }
    return "#fff";
  };

  const handleSubmit = () => {
    var guessWrd = guessWords[currentGuessIndex].split("");
    if (guessWrd.length < 5) return;
    var currentWrd = currentWord.split("");
    var wordsBackg = [...wordsBg];
    const keysBackground = { ...keyBg };
    let feedback = "";
    guessWrd.forEach((letter, i) => {
      if (currentWrd[i] === letter) {
        feedback += "T"; // Correct position
        keysBackground.trueKey.push(letter);
        currentWrd[i] = "0";
      } else if (currentWrd.includes(letter)) {
        feedback += "P"; // Wrong position
        keysBackground.presentKey.push(letter);
        currentWrd[currentWrd.indexOf(letter)] = "0";
      } else {
        feedback += "F"; // Not in word
        keysBackground.falseKey.push(letter);
      }
    });
    wordsBackg[currentGuessIndex] = feedback;
    setWordsBg(wordsBackg);
    const index = currentGuessIndex + 1;
    setCurrentGuessIndex(index);
    if (feedback === "TTTTT") {
      handleWinnerPrice(index);
    }
  };

  const handleWinnerPrice = (index: number) => {
    var price = (guessWords.length - index) * 1;
    setEarnedCoins(price);
    const totalCoins = coins + price;
    dispatch(setCoins(totalCoins));
    setWinner(true);
  }

  const handleKeyClick = (key: string) => {
    const newGuessWords = [...guessWords];
    if (key === "DEL") {
      newGuessWords[currentGuessIndex] = newGuessWords[currentGuessIndex].slice(
        0,
        -1
      );
    } else {
      if (newGuessWords[currentGuessIndex].length == 5) return;
      newGuessWords[currentGuessIndex] += key;
    }
    setGuessWords(newGuessWords);
  };

  const handleKeyBgColor = (key: string) => {
    if (keyBg.trueKey.includes(key)) return "#5bc783";
    if (keyBg.falseKey.includes(key)) return "grey";
    if (keyBg.presentKey.includes(key)) return "#FBC503";
    return "#ddd";
  };

  const handleWordHint = () => {
    if(coins < 100) {
      Toast.show({
        type: 'error',
        text1: 'Letter Hint',
        text2: 'Not enough coins!',
        position: 'top',
        autoHide: false
      });
      return;
    }
    handleRemoveCoins(100);
    Toast.show({
      type: 'info',
      text1: 'Letter Hint',
      text2: 'It is the forth letter',
      position: 'top',
      autoHide: false
    });
  }

  const handleRemoveWordsHint = () => {
    if(coins < 50) {
      Toast.show({
        type: 'error',
        text1: 'Remove letters',
        text2: 'Not enough coins!',
        position: 'top',
        autoHide: false
      });
      return;
    }
    handleRemoveCoins(50);
    Toast.show({
      type: 'info',
      text1: 'Remove letters',
      text2: 'These letters have been removed',
      position: 'top',
    });
  }

  const handleRemoveCoins = (val: number) => {
    dispatch(removeCoins(val));
    const newCoins = coins - val;
    setTimeout(() => {
      storeCoinValue(user, newCoins);
    }, 0)
  }

  const handleGameReset = () => {
    setWinner(false);
    setCurrentWord("");
    getGuessWord();
    setCurrentGuessIndex(0);
    setGuessWords([
      "",
      "",
      "",
      "",
      "",
    ]);
    setWordsBg(["", "", "", "", ""]);
    setKeyBg({
      trueKey: [],
      presentKey: [],
      falseKey: [],
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toast
        topOffset={useSafeAreaInsets().top}
      />
      <View
        style={{
          position: "absolute",
          top: useSafeAreaInsets().top,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Coins />
      </View>
      <Animated.View
        entering={FadeInRight.springify().delay(200)}
        exiting={FadeOutRight.springify()}
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.helpBtn}
          onPress={() => handleWordHint()}
        >
          <Octicons name="codescan-checkmark" size={24} color="black" />
          <Text>
            100 <FontAwesome6 name="coins" size={12} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpBtn}
          onPress={() => handleRemoveWordsHint()}
        >
          <MaterialCommunityIcons
            name="selection-remove"
            size={24}
            color="black"
          />
          <Text>
            50 <FontAwesome6 name="coins" size={12} color="black" />
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          marginTop: 20,
        }}
      >
        {guessWords.map((word, index) => {
          return (
            <Animated.View
              entering={FadeInRight.springify().delay(200)}
              exiting={FadeOutRight.springify()}
              key={index}
              style={{ flexDirection: "row", gap: 10 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <Animated.Text
                  entering={FadeIn.springify().damping(80).stiffness(200)}
                  exiting={FadeOut.springify().damping(80).stiffness(200)}
                  layout={FadeIn.springify()}
                  key={i + "-" + guessWords[index]}
                  style={[
                    styles.word,
                    {
                      backgroundColor: handleBackgroundColor(
                        wordsBg[index].charAt(i)
                      ),
                    },
                  ]}
                >
                  {word.charAt(i)}
                </Animated.Text>
              ))}
            </Animated.View>
          );
        })}
      </View>
      <Animated.View
        entering={FadeInRight.springify().delay(200)}
        exiting={FadeOutRight.springify()}
        style={styles.keyboardContainer}
      >
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={[styles.key, { backgroundColor: handleKeyBgColor(key) }]}
                onPress={() => handleKeyClick(key)}
              >
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.key, { flex: 1.5 }]}
            disabled={handleCheckValidWord()}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.keyText}>ENTER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.key, { flex: 1.5 }]}
            onPress={() => handleKeyClick("DEL")}
          >
            <Text style={styles.keyText}>DEL</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {winner && (
        <View style={StyleSheet.absoluteFillObject}>
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            style={styles.overlay}
          >
            <Text style={styles.winnerText}>🎉 Guessed Right! 🎉</Text>
            <View style={{gap: 5,}}>
              <Text style={styles.details}>Chances Left - {guessWords.length - currentGuessIndex} * 1 <FontAwesome6 name="coins" size={12} color="#fff" /> = {earnedCoins} <FontAwesome6 name="coins" size={12} color="#fff" /></Text>
              {/* <Text style={styles.details}>Guessed Under 2min - {} <FontAwesome6 name="coins" size={12} color="#fff" /> </Text> */}
              <Text style={styles.details}>Total Coins - {coins - earnedCoins} + {earnedCoins} = {coins} <FontAwesome6 name="coins" size={12} color="#fff" /></Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#007BFF',
                padding: 10,
                borderRadius: 15,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => handleGameReset()}
            >
              <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>Next</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
      {!winner && (currentGuessIndex >= guessWords.length) && (
        <View style={StyleSheet.absoluteFillObject}>
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            style={styles.overlay}
          >
            <Text style={styles.winnerText}>☹️ Couldn't Guess! ☹️</Text>
            <View style={{gap: 5,}}>
              <Text style={styles.details}>No Chances Left!</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#E27429',
                  padding: 10,
                  borderRadius: 15,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => handleGameReset()}
              >
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>
                  Retry {"      "}
                  100 <FontAwesome6 name="coins" size={10} color="#fff" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#007BFF',
                  padding: 10,
                  borderRadius: 15,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => handleGameReset()}
              >
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>Next</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  word: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
  helpBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#F2D5CE",
    padding: 5,
    width: 70,
    gap: 5,
    elevation: 2,
  },
  keyboardContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  key: {
    backgroundColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginHorizontal: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    zIndex: 999,
  },
  winnerText: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    color: '#fff'
  }
});
