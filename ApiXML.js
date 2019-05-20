import React, { Component } from 'react';

import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    Alert,
    RefreshControl,
    StatusBar,
    Image
} from 'react-native';

import styles from '../src/css/Styles'

import xmlParse from 'xml2json-light';
import { Container, Header, Left, Body, Right, Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png'

export default class API extends Component {
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
            <Container style={{ backgroundColor: 'rgba(110, 207, 246, 0.2)' }}>
                <View style={styles.BlogContent}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="#00A1E4"
                    />
                    <FlatList
                        data={this.state.dataSource}
                        enableEmptySections={true}
                        renderItem={({ item }) => (
                            <View style={styles.Contents}>
                                <View>
                                    <Text style={styles.BlogTitle}>
                                        {item.COMMON}
                                    </Text>
                                </View>
                                <Text style={styles.rowViewContainer}
                                    onPress={() => alert(item.BOTANICAL)}>
                                    <Text style={styles.Price}>Название:</Text>  {item.BOTANICAL}
                                </Text>
                                <Text style={styles.rowViewContainer}
                                    onPress={() => alert(item.BOTANICAL)}>
                                    <Text style={styles.Price}>Описание:</Text>  {item.BOTANICAL}
                                </Text>
                                <Text style={styles.rowViewContainer}
                                    onPress={() => alert(item.PRICE)}>
                                    <Text style={styles.Price}>Цена:</Text>  {item.PRICE}
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
                <Footer>
                    <FooterTab style={{ backgroundColor: '#0066B3' }}>
                        <Button vertical style={styles.Calling}>
                            <Icon name={'md-call'} size={20} color={'#ffffff'} />
                            <Text style={{ color: '#ffffff' }}>Связаться</Text>
                        </Button>
                        <Button vertical style={styles.Blog} onPress={() => this.props.navigation.navigate('Блог')}>
                            <Icon name={'md-book'} size={20} color={'#ffffff'} />
                            <Text style={{ color: '#ffffff' }}>Новости</Text>
                        </Button>
                        <Button vertical style={styles.Active} onPress={() => this.props.navigation.navigate('Кабинет')}>
                            <Icon name={'md-person'} size={20} color={'#ffffff'} />
                            <Text style={{ color: '#ffffff' }}>Кабинет</Text>
                        </Button>
                        <Button vertical style={styles.FAQ}>
                            <Icon name={'md-help-buoy'} size={20} color={'#ffffff'} />
                            <Text style={{ color: '#ffffff' }}>Помощь</Text>
                        </Button>
                        <Button vertical style={styles.Buy} onPress={() => this.props.navigation.navigate('Услуги')}>
                            <Icon name={'md-card'} size={20} color={'#ffffff'} />
                            <Text style={{ color: '#ffffff' }}>Купить</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
