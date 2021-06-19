import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { red } from 'color-name';
import { Header } from 'react-native-elements';

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
                            <Text style={styles.modalTitle} > Registeration </Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"First Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        FirstName: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Second Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        LastName: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Phone Number"}
                                onChangeText={(text) => {
                                    this.setState({
                                        MobileNumber: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Address"}
                                onChangeText={(text) => {
                                    this.setState({
                                        Address: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Email ID"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({
                                        EmailId: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
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
                                style={styles.formTextInput}
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
                        <TouchableOpacity style={styles.cancelButton} onPress={() => {
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
            return alert(" password doesn't match \n Check your password. ")
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
                    var errorMessage = error.message;
                    return alert(errorMessage);
                })
        }
    }

    login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('BookRequest')
            })
            .catch((error) => {
                var errorMessage = error.message;
                return alert(errorMessage)
            })
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.title} > BarterSystem App </Text>
                <TextInput
                    style={styles.loginBox}
                    keyboardType="email-address"
                    placeholder="abc@gmail.com"
                    onChangeText={(text) => {
                        this.setState({
                            EmailId: text
                        })
                    }}
                />
                <TextInput
                    style={styles.loginBox}
                    secureTextEntry={true}
                    placeholder="Enter your passwords"
                    onChangeText={
                        (text) => {
                            this.setState({ Password: text })
                        }}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.login(this.state.EmailId, this.state.Password)
                    }}
                >
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
        backgroundColor: '#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: '#ff3d00',
        flex: 1,
        justifyContent: 'center',
    },
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    KeyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: '#ff5722',
        margin: 50
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
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10
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
    registerButtonText: {
        color: '#ff5722',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },

    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20
    }
});
