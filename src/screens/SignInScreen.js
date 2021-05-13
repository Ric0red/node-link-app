import React, {useState} from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

import Text from '../components/Text'

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    return (
         <Container>
         <ScrollView>    
            <Main>
                <Text center title semi >Bienvenido.</Text>
            </Main>
            <Auth>
                <AuthContainer>
                    <AuthTitle>Direccion Email</AuthTitle>
                    <AuthField 
                        autoCapitalize='none' 
                        autoCompleteType='email'
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='email-address'
                        onChangeText={email => setEmail(email.trim())}
                        value ={email}
                        />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Password</AuthTitle>
                    <AuthField 
                        autoCapitalize='none' 
                        autoCompleteType='password'
                        autoCorrect={false}
                        autoFocus={true}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password.trim())}
                        value ={password}
                        />
                </AuthContainer>
            </Auth>   

            <SigInContainer disabled={loading}>
                {loading ? (
                    <Loading/>
                ) : (
                    <Text bold center medium color='#fff'>Sign In</Text> 
                )}
            </SigInContainer>

            <SignUp onPress={() => navigation.navigate('Sign Up')}>
                <Text center smaill>Nuevo en NodeLink?{' '} <Text heavy color='#8022d9'>Sign Up</Text></Text>
            </SignUp>

            <HeaderGraphic>
                <RightCircle/>
                <LeftCircle/>
            </HeaderGraphic>
            <StatusBar barStyle='light-content'/>
        </ScrollView>
        </Container>   
    );
}
export default SignInScreen;
 const Container = styled.View`
    flex: 1;
`;
const Main = styled.View`
    margin-top: 192px;
`;
const Auth = styled.View`
    margin: 64px 32px 32px;
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
const SigInContainer = styled.TouchableOpacity`
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
const SignUp = styled.TouchableOpacity`
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