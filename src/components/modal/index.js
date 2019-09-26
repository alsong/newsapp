import React, { PureComponent } from 'react'
import {
    Dimensions,
    Modal,
    Share,
    Image,
    StyleSheet
} from 'react-native'

import {
    Header,
    Content,
    Container,
    Body,
    Left,
    Right,
    Title,
    Button
} from 'native-base'

import { WebView } from 'react-native-webview'

const WebViewHeight = Dimensions.get('window').height - 56

export default class Index extends PureComponent {

    constructor(props) {
        super(props)

        this._handleClose =  this._handleClose.bind(this)
        this._handleShare = this._handleShare.bind(this)
    }

    //closes the modal
    _handleClose() {
        return this.props.onClose()
    }

    //shares the news article
    _handleShare() {

        const {url , title } = this.props.articleData,
        message = `${title}\n\nRead more @\n${url}\n\n shared via NewsApp`
        return Share.share({
            title,
            message,
            url:message
        },{
            dialogTitle: `Share ${title}`
        })
    }

    render() {
        const { showModal, articleData } = this.props
        const { url } = articleData

        //check if the url is undefined
        if (url !== undefined) {
            return (
                <Modal onRequestClose={this._handleClose} visible={showModal} transparent animationType='slide'>
                    <Container style={styles.containerStyle}>
                        <Header>
                            <Left>
                                <Button transparent onPress={this._handleClose}>
                                    <Image resizeMode='center' style={styles.imageStyle}
                                        source={
                                            require('../../images/ic_close_white_18dp.png')
                                        } />
                                </Button>
                            </Left>
                            <Body>
                                <Title children={articleData.title} />
                            </Body>
                            <Right>
                                <Button transparent onPress={this._handleShare}>
                                    <Image style={styles.imageStyle} 
                                    source={
                                        require('../../images/ic_share_white_18dp.png')
                                    }/>
                                </Button>
                            </Right>
                        </Header>
                        <Content contentContainerStyle={{height: WebViewHeight}}>
                            <WebView onError={this._handleClose}
                            startInLoadingState scalesPageToFit
                            source={{
                                uri : url
                            }}/>
                        </Content>
                    </Container>
                </Modal>
            )
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        margin: 16,
        marginBottom: 0,
        backgroundColor: '#ffffff'
    },
    imageStyle: {
        width: 18,
        height: 18
    }
})