import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AuthStackScreen = () => {
    const AuthStack = createStackNavigator();
    return (
        <AuthStack.Navigator headerMode='none'>
            <AuthStack.Screen name='Sign In' component={SignInScreen}/>
            <AuthStack.Screen name='Sign Up' component={SignUpScreen}/>
        </AuthStack.Navigator>
    );
}
export default AuthStackScreen;