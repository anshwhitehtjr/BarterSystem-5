import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../config';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            allRequests: [],
        }
        this.requestRef = null;
    }

    getAllRequests = () => {
        this.requestRef = db.collection("exchange_requests")
            .onSnapshot((record) => {
                var allRequests = [];
                record.forEach((doc) => {
                    allRequests.push(doc.data())
                })
                this.setState({
                    allRequests: allRequests
                })
            })
    }

    componentDidMount() {
        this.getAllRequests()
    }

    componentWillUnmount() {
        this.requestRef()
    }

    keyExtractor = (item, index) => {
        index.toString()
    }

    renderItem = ({ item, i }) => {
        console.log(item);
        return (
            <ListItem
                key={i}
                title={item.item_name}
                subtitle={item.description}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity style={styles.button} >
                        <Text style={{ color: '#fff' }} > Exchange </Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    render() {
        return (
            <View>
                <View>
                    {this.state.allRequests.length === 0 ?
                        (
                            <View><Text> List Of All Requested Items </Text></View>
                        ) : (
                            <FlatList
                                data={this.state.allRequests}
                                keyExtractor={(item) => item.requestID}
                                renderItem={this.renderItem} />
                        )}
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})