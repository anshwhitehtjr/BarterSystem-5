import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
                    console.log(doc.data())
                    allRequests.push(doc.data())
                })
                this.setState({
                    allRequests: allRequests
                })
            })

    }

    componentDidMount() {
        this.getAllRequests();
    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor = (item, index) => {
        index.toString()
    }

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.item_name}
                subtitle={item.description}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity>
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
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allRequests}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}