import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#121212",
        alignItems: 'center',
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
        fontSize: 24,
    },
    text: {
        marginTop : 50,
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
    textError: {
        color: "#ff6b6b",
        fontFamily: "Nova",
        fontSize: 14,
        marginTop: 5,
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
    textBlackBoldDisabled: {
        color: "#777777",
    },
    leftItem: {
        position: "absolute",
        left: 50,
        top: 50,
    },
    backSign: {
        color: "white",
        fontFamily: "Nova-Bold",
        textAlign: "left",
        fontSize: 25,
    },
    button: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 50,
        marginVertical: 10,
        width: "75%",
    },
    buttonDisabled: {
        backgroundColor: "#2E2E2E",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        alignItems: "center",
    },
    forgotPasswordButton: {
        marginTop: 10,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    errorContainer: {
        width: "75%",
        alignItems: "flex-start",
    },
});
