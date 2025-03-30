import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Image } from "react-native";
import { StyleSheet, View, StatusBar, Pressable, TextInput, Keyboard } from 'react-native';

import React, { useEffect, useState } from "react"
import OTPInput from './OTPInput';

const logoSource = "../../assets/images/juno_icon+text.png";

export default function OTPVerification () {
    const navigation = useNavigation();
    

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
    
    
    const handleNext = () => navigation.navigate("OTPVerification");
    const handleBack = () => navigation.goBack();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
              <Text style={styles.backSign}>{"← back"}</Text>
            </Pressable>
            <Text style={styles.text}>
                <Text style={styles.textBold}>Enter the code we sent you</Text>
            </Text>

            <OTPInput />

            {/* Positioned at the bottom */}
            {!isKeyboardVisible ? 
            <View style={styles.buttonContainer}>
                <Text style={styles.textSmall}>
                    We'll text you a code to verify you're really you. Message and data rates may apply.
                </Text>
                <Pressable style={styles.button} onPress={handleNext}>
                    <Text style={[styles.textBlackBold , {marginHorizontal : 110}]}>Next</Text>
                </Pressable>
                <Pressable >
                    <Text style={styles.textRegular}>Trouble Receiving a Code?</Text>
                </Pressable>
            </View>
            : <></>}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the button can be pushed to the bottom
    paddingTop: 50,
    backgroundColor: "#121212",
    alignItems: 'center',
    gap: 10,
  },

  input: {
    height: 70,
    width : 180,
    margin: 12,
    marginVertical : 20,
    borderBottomWidth: 2, // Only underline at the bottom
    borderColor: "#ffffff", // White underline for dark mode
    color: "#ffffff", // White text color
    backgroundColor: "transparent", // No background
    paddingHorizontal: 10,
    fontSize: 19,
  },

  logo: {
    width: 100,
    height: 50,
    marginBottom: 25,
  },


  text: {
    color: "white",
    fontFamily: "Nova",
    fontSize: 38,
    marginHorizontal: 0,
  },
  textBold: {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize: 38,
  },
  textRegular : {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize : 22,
    marginVertical: 20,
    textAlign: "center",
  },
  textSmall : {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize : 14,
    marginVertical: 20,
    marginHorizontal : 30,
    textAlign: "center",

  },
  

  textBlack: {
    color: "black",
    fontFamily: "Nova",
    fontSize: 28,
    textAlign: "center",
  },
  textBlackBold: {
    color: "black",
    fontFamily: "Nova-Bold",
    fontSize: 22,
    marginHorizontal : 70,
    textAlign: "center",
  },


  leftItem : {
    alignSelf : "left" , 
    marginHorizontal : 50

  },
  backSign : {
    color: "white",
    fontFamily: "Nova-Bold",
    textAlign :"left", 
    fontSize : 25
  },
  
  button : {
    backgroundColor : "white",
    padding : 15,
    borderRadius : 50,
    marginVertical : 10,
  },
  buttonContainer: {
    position: "absolute", // Positions it at the bottom
    bottom: 40, // Space from the bottom
    width: "100%", // Makes sure the button spans the width
    alignItems: "center", // Center the button horizontally
  },
});

