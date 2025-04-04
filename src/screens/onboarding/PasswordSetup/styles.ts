import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#121212",
        gap: 10,
    },
    inputContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        gap: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        color: "white",
        fontFamily: "Nova",
        fontSize: 18,
        paddingVertical: 15,
    },
    eyeIcon: {
        padding: 10,
    },
    text: {
        color: "white",
        fontFamily: "Nova",
        fontSize: 38,
        marginLeft: 20,
        marginRight: 20,
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
        marginHorizontal: 30,
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
        width: "85%",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#121212",
        paddingTop: 20,
    },
    errorText: {
        color: "#ff6b6b",
        fontFamily: "Nova",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});
