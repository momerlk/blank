import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Image } from "react-native";
import { StyleSheet, View, StatusBar, Pressable, TextInput, Keyboard } from 'react-native';

import React, { useEffect, useState } from "react"

// TODO : add form validation and Redux
export default function GenderSelection () {
    const navigation = useNavigation();
    const [disabled , setDisabled] = useState(false);
    

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
    
    
    const handleNext = () => navigation.navigate("AgeEntry");
    const handleBack = () => navigation.goBack();

    return (
        <View style={styles.container}  >
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
              <Text style={styles.backSign}>{"← back"}</Text>
            </Pressable>
            <Text style={styles.text}>
                <Text style={styles.textBold}>What's your gender?</Text>
            </Text>


            <Pressable style={[styles.buttonOutline]} onPress={handleNext}>
                  <Text style={styles.buttonOutlineText}>Male</Text>
            </Pressable>

            <Pressable style={[styles.buttonOutline]} onPress={handleNext}>
                  <Text style={styles.buttonOutlineText}>Female</Text>
            </Pressable>

            <Pressable style={[styles.buttonOutline]} onPress={handleNext}>
                  <Text style={styles.buttonOutlineText}>Other</Text>
            </Pressable>

            {/* Positioned at the bottom */}
            {!isKeyboardVisible ? 
            <View style={styles.buttonContainer}>
                <Text style={styles.textSmall}>
                    This is how it'll appear on your profile. You can't change it later.
                </Text>
                <Pressable style={[styles.button, disabled ? {backgroundColor : "#2E2E2E"} : {}]} onPress={handleNext}>
                    <Text style={[styles.textBlackBold , {marginHorizontal : 110},
                      disabled ? {color : "#777777"} : {}
                    ]}>Next</Text>
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
    gap: 10,
  },

  input: {
    height: 70,
    width : "75%",
    margin: 12,
    marginVertical : 20,
    borderBottomWidth: 2, // Only underline at the bottom
    borderColor: "#ffffff", // White underline for dark mode
    color: "#ffffff", // White text color
    backgroundColor: "transparent", // No background
    fontFamily : "Nova",
    paddingHorizontal: 10,
    fontSize: 30,
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
    marginLeft: 20,
  },
  textBold: {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize: 33,
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
    marginHorizontal : 20

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
  buttonOutline : {
    borderColor : "gray",
    borderWidth : 1,
    paddingVertical : 15,
    borderRadius : 50,
    marginVertical : 15,
    marginHorizontal : 35,
  },
  buttonOutlineText : {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize: 25,
    textAlign : "center",
  },
  buttonContainer: {
    position: "absolute", // Positions it at the bottom
    bottom: 40, // Space from the bottom
    width: "100%", // Makes sure the button spans the width
    alignItems: "center", // Center the button horizontally
  },
});

