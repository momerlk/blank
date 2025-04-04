import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#121212",
    gap: 10,
  },
  input: {
    height: 70,
    width: "75%",
    margin: 12,
    marginVertical: 20,
    borderBottomWidth: 2,
    borderColor: "#ffffff",
    color: "#ffffff",
    backgroundColor: "transparent",
    fontFamily: "Nova",
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
  textRegular: {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize: 22,
    marginVertical: 20,
    textAlign: "center",
  },
  textSmall: {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize: 14,
    marginVertical: 20,
    marginHorizontal: 30,
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
    marginHorizontal: 70,
    textAlign: "center",
  },
  leftItem: {
    alignSelf: "flex-start",
    marginHorizontal: 20
  },
  backSign: {
    color: "white",
    fontFamily: "Nova-Bold",
    textAlign: "left",
    fontSize: 25
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 50,
    marginVertical: 10,
  },
  buttonOutline: {
    borderColor: "gray",
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 15,
    marginHorizontal: 35,
  },
  buttonSelected: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 15,
    marginHorizontal: 35,
  },
  buttonOutlineText: {
    color: "white",
    fontFamily: "Nova-Bold",
    fontSize: 25,
    textAlign: "center",
  },
  buttonSelectedText: {
    color: "black",
    fontFamily: "Nova-Bold",
    fontSize: 25,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
});
