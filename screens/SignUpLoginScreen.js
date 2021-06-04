import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignUpLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            FirstName: '',
            LastName: '',
            Address: '',
            EmailId: '',
            Password: '',
            ConfirmPassword: '',
            isModalVisible: false,
            MobileNumber: '',
        }
    }

    showModal = () => {
        return (
            <View>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.isModalVisible}
                >
                    <View style={styles.modalContainer} >
                        <View>
                            <TextInput
                                placeholder={"First Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        FirstName: text
                                    })
                                }}
                            />
                            <TextInput
                                placeholder={"Second Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        LastName: text
                                    })
                                }}
                            />
                            <TextInput
                                placeholder={"Phone Number"}
                                onChangeText={(text) => {
                                    this.setState({
                                        MobileNumber: text
                                    })
                                }}
                            />
                            <TextInput
                                placeholder={"Address"}
                                onChangeText={(text) => {
                                    this.setState({
                                        Address: text
                                    })
                                }}
                            />
                            <TextInput
                                placeholder={"Email ID"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({
                                        EmailId: text
                                    })
                                }}
                            />
                            <TextInput
                                placeholder={"Enter A Password"}
                                secureTextEntry={true}
                                maxLength={16}
                                onChangeText={(text) => {
                                    this.setState({
                                        Password: text
                                    })
                                }}
                            />
                            <TextInput
                                placeholder={"Confirm your password"}
                                secureTextEntry={true}
                                maxLength={16}
                                onChangeText={(text) => {
                                    this.setState({
                                        ConfirmPassword: text
                                    })
                                }}
                            />
                        </View>
                        <TouchableOpacity style={styles.registerButton} onPress={() => {
                            this.userSignUp(this.state.EmailId, this.state.Password, this.state.ConfirmPassword)
                        }} >
                            <Text> Register </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                isModalVisible: false
                            })
                        }} >
                            <Text> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )

    }

    userSignUp = async (EmailId, Password, confirmPassword) => {
        if (Password !== confirmPassword) {
            return alert(" password doesn't match\nCheck your password. ")
        } else {
            firebase.auth().createUserWithEmailAndPassword(EmailId, Password)
                .then((response) => {
                    db.collection('users').add({
                        first_name: this.state.FirstName,
                        last_name: this.state.LastName,
                        mobile_number: this.state.MobileNumber,
                        EmailId: this.state.EmailId
                    })
                    return alert(
                        'User Added Successfully',
                        '',
                        [
                            { text: 'OK', onPress: () => this.setState({ isModalVisible: false }) },
                        ]
                    )
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return alert(errorMessage + errorCode);
                })
        }
    }

    login = (EmailId, Password) => {
        firebase.auth().signInWithEmailAndPassword(EmailId, Password)
            .then(() => {
                this.props.navigation.navigate('HomeScreen')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return alert(errorMessage + errorCode)
            })
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.inputBox}
                    keyboardType="email-address"
                    placeholder="abc@gmail.com"
                    onChange={(text) => {
                        this.setState({
                            EmailId: text
                        })
                    }}
                />
                <TextInput
                    style={styles.inputBox}
                    secureTextEntry={true}
                    placeholder="Enter your passwords"
                    onChange={
                        (text) => {
                            this.setState({ Password: text })
                        }}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.login(this.state.EmailId, this.state.Password)
                    }}
                >z
                    <Text> Log In </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.setState({
                            isModalVisible: true
                        })
                    }}
                >
                    <Text> Sign Up </Text>
                </TouchableOpacity>
                <View>

                    {this.showModal()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 2,
        borderColor: '#FF8A65',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        alignSelf: 'center',
        margin: 10
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#FF9800',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.3,
        shadowRadius: 11,
        elevation: 15,
        alignSelf: 'center',
        margin: 15
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffff",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30
    },
});
