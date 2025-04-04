import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Image } from "react-native";
import { StyleSheet, View, StatusBar, Pressable } from 'react-native';

const logoSource = "../../../assets/images/juno_icon+text.png";

export function Welcome() {
    const navigation = useNavigation();
    const handleSignin = () => navigation.navigate("Signin");
    const handleCreateaccount = () => navigation.navigate("PhoneNumberEntry");
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#c80321" />
            <Image source={require(logoSource)} style={styles.logo} />
            <Text style={styles.text}>
                <Text style={styles.textBold}>It starts</Text> with {'\n'}a{' '}
                <Text style={styles.textBold}>Swipe™</Text>
            </Text>

            {/* Positioned at the bottom */}
            <View style={styles.buttonContainer}>
                <Text style={styles.textSmall}>
                    By tapping "Create account" or "Sign in" you agree to our Terms. Learn how we process your data in our 
                    Privacy Policy.
                </Text>
                <Pressable style={styles.button} onPress={handleCreateaccount}>
                    <Text style={styles.textBlackBold}>Create account</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSignin}>
                    <Text style={[styles.textBlackBold , {marginHorizontal : 110}]}>Sign in</Text>
                </Pressable>
                <Pressable >
                    <Text style={styles.textRegular}>Trouble Signing in?</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the button can be pushed to the bottom
    paddingTop: 50,
    backgroundColor: "#c80321",
    alignItems: 'center',
    gap: 10,
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
    marginHorizontal: 20,
    textAlign: "center",
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
  textBold: {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize: 38,
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

