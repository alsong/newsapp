import React, { PureComponent } from 'react'
import { Alert, StyleSheet, ActivityIndicator } from 'react-native'
import { Container, Header, Body, Title, Content, List, ListItem, View, Text } from 'native-base'
import DataItem from './../../components/listitem'
import { getArticleBySource } from './../../services/news'
import Modal from './../../components/modal'
export class Index extends PureComponent {

    constructor(props) {
        super(props)

        this._handleItemDataOnPress = this._handleItemDataOnPress.bind(this),
            this._handleModalClose = this._handleModalClose.bind(this)

        this.state = {
            isLoading: true,
            data: null,
            isError: false,
            setModalVisible: false,
            modalArticleData: {}
        }
    }


    _handleItemDataOnPress(articleData) {
        this.setState({
            setModalVisible: true,
            modalArticleData: articleData
        })
    }

    _handleModalClose() {
        this.setState({
            setModalVisible: false,
            modalArticleData: {}
        })
    }

    componentDidMount() {
        getArticleBySource().then(data => {
            this.setState({
                isLoading: false,
                data: data
            })
        }, err => {
            Alert.alert(JSON.stringify(err))
        })
    }

    render() {
        const view = this.state.isLoading ? (
            <View style={styles.view1}>
                <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
                <Text style={styles.textstyle} children="Please wait..." />
            </View>
        ) : (
                <List dataArray={this.state.data}
                    renderRow={
                        (item) => {
                            return (
                                <ListItem>
                                    <DataItem data={item} onPress={this._handleItemDataOnPress} />
                                </ListItem>
                            )
                        }
                    } />
            )
        return (
            <Container>
                <Header>
                    <Body>
                        <Title children="NewsApp" />
                    </Body>
                </Header>
                <Content padder={false} contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
                    {view}
                    <Modal showModal={this.state.setModalVisible} articleData={this.state.modalArticleData} onClose={this._handleModalClose} />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textstyle: {
        marginTop: 8
    }
})