import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MenssageScreen from '../screens/MenssageScreen';
import PostScreen from '../screens/PostScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

    const MainStackScreen = () => {
    const MainStack = createBottomTabNavigator();

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: '#222222',
        },
    };

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = 'ios-home';
              } else if (route.name === 'Profile') {
                iconName = 'ios-person';
              }else if (route.name === 'Menssage') {
                iconName = 'ios-chatbox';
              }else if (route.name === 'Notification') {
                iconName = 'ios-notifications';
              }
              
              if (route.name === 'Post') {
                return(
                    <Ionicons 
                        name='ios-add-circle' 
                        size={48} 
                        color ='#23a8d9' 
                        style={{
                            shadowColor:'#23a8d9',
                            shadowOffset: {width: 0, height: 10 },
                            shadowRadius: 10,
                            shadowOpacity: 0.3
                        }}
                    />);
            }

            return <Ionicons name={iconName} size={24} color={focused ? '#fff' : '#666'}/>;
        },
    });

    return(
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <MainStack.Screen name='Home' component={HomeScreen} />
            <MainStack.Screen name='Menssage' component={MenssageScreen} />
            <MainStack.Screen name='Post' component={PostScreen} />
            <MainStack.Screen name='Notification' component={NotificationScreen} />
            <MainStack.Screen name='Profile' component={ProfileScreen} />
        </MainStack.Navigator>
    );
};

export default MainStackScreen;