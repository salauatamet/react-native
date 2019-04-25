import React, { Component } from 'react';

import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    View,
    Alert,
    RefreshControl,
    Dimensions
} from 'react-native';
import xmlParse from 'xml2json-light';

const { width: WIDTH } = Dimensions.get('window')

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { refreshing: true };
        this.GetData();
    }

    GetData = () => {
        return fetch('https://www.w3schools.com/Xml/plant_catalog.xml', {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0
            }
        })
            .then(response => response.text())
            .then(responseXml => {
                var dataSource = xmlParse.xml2json(responseXml).CATALOG.PLANT;
                console.log(dataSource)
                // if (!Array.isArray(dataSource)) {
                //     dataSource = [dataSource.PLANT];
                // }
                // else {
                //     dataSource = dataSource.map(d => d.PLANT);
                // }

                this.setState({
                    dataSource,
                    refreshing: false,
                });
            })
            .catch(error => {
                console.error(error);
            });
    };
    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.2,
                    width: '90%',
                    backgroundColor: '#808080',
                }}
            />
        );
    };
    onRefresh() {
        this.setState({ dataSource: [] });
        this.GetData();
    }
    render() {
        if (this.state.refreshing) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    enableEmptySections={true}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.rowViewContainer}
                                onPress={() => alert(item.COMMON)}>
                                {item.COMMON}
                            </Text>
                            <Text style={styles.rowViewContainer}
                                onPress={() => alert(item.BOTANICAL)}>
                                {item.BOTANICAL}
                            </Text>
                            <Text style={styles.rowViewContainer}
                                onPress={() => alert(item.PRICE)}>
                                {item.PRICE}
                            </Text>
                            <Text style={styles.bodyContainer}
                                onPress={() => alert(item.AVAILABILITY)}>
                                {item.AVAILABILITY}
                            </Text>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 20,
    },
    rowViewContainer: {
        fontSize: 18,
        padding: 10,
        color: '#000000'
    },
    bodyContainer: {
        width: WIDTH - 50,
        height: null,
        borderRadius: 0,
        backgroundColor: '#dddddd',
        fontSize: 18,
        padding: 15,
        color: '#000000'
    }
});
