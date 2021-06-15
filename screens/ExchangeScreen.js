import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class ExchangeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            itemName: '',
            description: '',
            userID: firebase.auth().currentUser.email,
        }
    }

    addItem = async (itemID, description) => {
        var userID = this.state.userID;
        db.collection("exchange_requests").add({
            "username": userID,
            "item_name": itemID,
            "description": description
        })
        this.setState({
            itemName: itemID,
            description: description
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

    render() {
        return (
            <View>
                <TextInput placeholder="Item Name" onChangeText={(text) => {
                    this.setState({
                        itemName: text
                    })
                }} />
                <TextInput placeholder="Description" onChangeText={(text) => {
                    this.setState({
                        description: text
                    })
                }} />
                <TouchableOpacity onPress={
                    () => {
                        this.addItem(this.state.itemName, this.state.description)
                    }} >
                    <Text> AddItem </Text>
                </TouchableOpacity>
            </View>
        )
    }
}