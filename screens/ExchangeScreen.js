import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class ExchangeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            itemName: '',
            description: '',
            userID: firebase.auth().currentUser.email,
            requestID: ''
        }
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    addItem = async (itemID, description) => {
        var userID = this.state.userID;
        var randomRequestID = this.createUniqueId()
        db.collection("exchange_requests").add({
            "username": userID,
            "item_name": itemID,
            "description": description,
            "request_id": randomRequestID,
            "item_status": "requested",
            "Date": firebase.firestore.FieldValue.serverTimestamp()
        })
        this.setState({
            itemName: '',
            description: '',
            requestID: randomRequestID
        })
        return Alert.alert(
            'item ready to exchange',
            '',
            [
                {
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate('HomeScreen')
                    }
                }
            ]
        )
    }

    // recievedItem(itemName) {
    //     var userID = this.state.userID;
    //     var requestID = this.state.requestID;
    //     db.collection("recieved_books").add({
    //         "user_id": userID,
    //         "itemName": itemName,
    //         "request_id": requestID,
    //         "bookStatus": 'recieved'
    //     })
    // }

    render() {
        return (
            <View style={styles.keyBoardStyle} >
                <TextInput style={styles.formTextInput} placeholder="Item Name" onChangeText={(text) => {
                    this.setState({
                        itemName: text
                    })
                }} />
                <TextInput style={styles.formTextInput} placeholder="Description" onChangeText={(text) => {
                    this.setState({
                        description: text
                    })
                }} />
                <TouchableOpacity style={styles.button} onPress={
                    () => {
                        this.addItem(this.state.itemName, this.state.description)
                    }} >
                    <Text> AddItem </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    button: {
        width: "75%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },
}
)