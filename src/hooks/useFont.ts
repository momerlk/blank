import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Helvetica': require('../assets/fonts/Helvetica/HelveticaNeueRoman.otf'),
        'Helvetica-Bold': require('../assets/fonts/Helvetica/HelveticaNeueBold.otf'),
        'Helvetica-Italic': require('../assets/fonts/Helvetica/HelveticaNeueItalic.ttf'),
        'Helvetica-Light': require('../assets/fonts/Helvetica/HelveticaNeueLight.otf'),
        "Nova" : require("../assets/fonts/ProximaNova/ProximaNova-Regular.otf"),
        "Nova-Bold" : require("../assets/fonts/ProximaNova/Proxima Nova Bold.otf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return fontsLoaded;
};
