import React, { useContext, useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import {UserContext} from '../context/UserContext';
//import Text from '../components/Text';

const LoadingScreen = () => {
    const [_, setUser] = useContext(UserContext);
    
    useEffect(() => {
        setTimeout(async () => {
            setUser((state) => ({...state, isLoggedIn: false}));
        }, 500);
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>    
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
