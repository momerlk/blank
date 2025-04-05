import { Button, Text } from '@react-navigation/elements';
import { StatusBar, View, Image } from 'react-native';
import { styles } from './styles';

import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

export function Profile() {
  const user = useSelector((state: RootState) => state.user);

  const pfp = user.profilePicture !== null ? { uri: user.profilePicture } : {uri : "https://cdn-icons-png.flaticon.com/512/149/149071.png"};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'}/>
      <Image source={pfp} style={{width : 100, height : 100,borderRadius : 100}}/>
      <Text>{`${user.firstName === "" ? "Omer Malik" : user.firstName}`}</Text>
      <Button screen="Settings" params={{ user: 'jane' }}>Go to Settings</Button>
    </View>
  );
}


