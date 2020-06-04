import { AsyncStorage } from 'react-native';

export var storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } 
  catch (e) {
    console.log(e);
  }
}

export var getData = async (key) => {
    try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return value;
    }
    else return null;
  } catch(e) {
    console.log(e);
  }
}

export var clearStorage = async() => {
  AsyncStorage.clear();
}
