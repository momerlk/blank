import React from "react"
import { Feather, Foundation } from "@expo/vector-icons"
import { Image } from "react-native";

const IconMap : any = {
    "home" : require("../assets/icons/home.png"),
    "home-filled" : require("../assets/icons/home-filled.png"),
} ;


export default function Icon(name: string) {

    return ({focused, size}: {focused: boolean, size: number}) => {
        const iconKey = focused ? `${name}-filled` : name;
        return (
            <Image 
                source={IconMap[iconKey]} 
                style={{
                    width: size,
                    height: size,
                }} 
            />
        );
    }
}