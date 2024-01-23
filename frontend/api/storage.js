import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Check if the environment is a web environment
const isWeb = Platform.OS === 'web';

// Secure storage implementation for web and native
export const saveData = async (key, value) => {
    const stringValue = JSON.stringify(value);
    if (isWeb) {
        // localStorage.setItem(key, stringValue);
        AsyncStorage.setItem(key, value);
    } else {
        await SecureStore.setItemAsync(key, stringValue);
    }
};

export const loadData = async (key) => {
    if (isWeb) {
        const stringValue = await AsyncStorage.getItem(key);
        return stringValue ? JSON.parse(stringValue) : null;
    } else {
        const stringValue = await SecureStore.getItemAsync(key);
        return stringValue ? JSON.parse(stringValue) : null;
    }
};

export const removeData = async (key) => {
    if (isWeb) {
        AsyncStorage.removeItem(key);
    } else {
        await SecureStore.deleteItemAsync(key);
    }
};

// Fill this in later
export const validateAuthToken = async () => {
    const tok = await loadData('authToken');
    // validate that ID exists in API

    // validate expiration date



}
