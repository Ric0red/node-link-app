import React, {useContext, useState} from 'react';
import {ImagePickerIOS, Platform} from 'react-native'
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';

import Text from '../components/Text'

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState();
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const getPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
         return status;
        }
    }

    const pickImage = async () => {
        try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5            
        });

        if (!result.cancelled) {
            setProfilePhoto(result.uri)
        }

        } catch (error) {
            console.log('error @pickImage: ', error)
        }
    };

    const addProfilePhoto = async () => {
        const status = await getPermissions();
        if (status !== 'granted') {
            alert( 'Necesitamos permiso para acceder a tu galeria');
            
            return;
        }
        pickImage();
    };

    const signUp = async () => {
        setLoading(true);

        const user = { username, email, password, profilePhoto };

        try {
            const createdUser = await firebase.createUser(user);

            setUser({...createdUser, isLoggedIn: true});
        } catch (error) {
            console.log('Error @signUp: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
         <Container>
         <ScrollView>    
            <Main>
                <Text center title semi >Registrate para empezar.</Text>
            </Main>

            <ProfilePhotoContainer onPress={addProfilePhoto}>
                {profilePhoto ? (
                    <ProfilePhoto source={{uri: profilePhoto}} />
                ) : (
                    <DefaultProfilePhoto>
                        <AntDesign name='plus' size={24} color='#fff' />
                    </DefaultProfilePhoto> 
                )}
            </ProfilePhotoContainer>

            <Auth>
            <AuthContainer>
                    <AuthTitle>User Name</AuthTitle>
                    <AuthField 
                        autoCapitalize='none' 
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='email-address'
                        onChangeText={(username) => setUsername(username.trim())}
                        value ={username}
                        />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Direccion Email</AuthTitle>
                    <AuthField 
                        autoCapitalize='none' 
                        autoCompleteType='email'
                        autoCorrect={false}
                        keyboardType='email-address'
                        onChangeText={(email) => setEmail(email.trim())}
                        value ={email}
                        />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Password</AuthTitle>
                    <AuthField 
                        autoCapitalize='none' 
                        autoCompleteType='password'
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password.trim())}
                        value={password}
                        />
                </AuthContainer>
            </Auth>   

            <SigUpContainer onPress={signUp} disabled={loading}>
                {loading ? (
                    <Loading/>
                ) : (
                    <Text bold center medium color='#fff'>Registrarse</Text> 
                )}
            </SigUpContainer>

            <SignIn onPress={() => navigation.navigate('Sign In')}>
                <Text center smaill>Ya tienes una cuenta? <Text heavy color='#8022d9'>Sign In</Text></Text>
            </SignIn>

            <HeaderGraphic>
                <RightCircle/>
                <LeftCircle/>
            </HeaderGraphic>
            <StatusBar barStyle='light-content'/>
        </ScrollView>
        </Container>   
    );
}
export default SignUpScreen;
 const Container = styled.View`
    flex: 1;
`;
const Main = styled.View`
    margin-top: 160px;
`;
const ProfilePhotoContainer = styled.TouchableOpacity`
    background-color: #e1e2e6;
    width: 80px;
    height: 80px;
    border-radius: 48px;
    align-self: center;
    margin-top: 16px;
    overflow: hidden;
`;
const DefaultProfilePhoto = styled.View`
    align-items: center;
    flex: 1;
    justify-content: center;
`;
const ProfilePhoto = styled.Image`
    flex: 1;
`;
const Auth = styled.View`
    margin: 16px 32px 32px;
`;
const AuthContainer = styled.View`

`;
const AuthTitle = styled(Text)`
    color: #8e93a1;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`;
const AuthField = styled.TextInput`
    border-bottom-color: #8e93a1;
    border-bottom-width: 0.5px;
    height: 40px;
`;
const SigUpContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #8022d9;
    border-radius: 6px;
`;
const Loading = styled.ActivityIndicator.attrs((props) => ({
    color: '#fff',
    size: 'small',
}))``;
const SignIn = styled.TouchableOpacity`
    margin-top: 16px;
`;
const HeaderGraphic = styled.View`
    position: absolute;
    width: 100%;
    top: -50px;
    z-index: -100;
`;
const RightCircle = styled.View`
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 200px;
    background-color: #8022d9;
    right: -100px;
    top: -200px;
`;
const LeftCircle = styled.View`
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: #23A6d5;
    left: -50px;
    top: -50px;
`; 
const StatusBar = styled.View``