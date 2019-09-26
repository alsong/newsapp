import React, { PureComponent } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Body, Text, Thumbnail, View } from 'native-base'
import TimeAgo from './../time'
import Config from './../../config'

export default class Index extends PureComponent {

    constructor(props) {
        super(props)
        this.data = props.data
        this._handlePress = this._handlePress.bind(this)
    }

    _handlePress(){
        const {url, title} = this.data
        this.props.onPress({url,title})
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} style={styles.touchcontainer} onPress={this._handlePress}>
                <Thumbnail style={styles.thumbnail} square large source={{
                    cache: 'force-cache',
                    uri: this.data.urlToImage  !=  null ? Config.IMAGE_COMPRESS + this.data.urlToImage + "&quality=25"
                        : Config.NO_IMAGE
                }} />
                <Body>
                    <Text style={styles.bodytext} numberOfLines={2}>
                        {this.data.title}
                    </Text>
                    <Text note numberOfLines={3}>
                        {this.data.description}
                    </Text>
                    <View style={styles.bodyview}>
                        <Text note>{this.data.source.name}</Text>
                        <TimeAgo time={this.data.publishedAt}/>
                    </View>
                </Body>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchcontainer: {
        flexDirection: 'row'
    },
    thumbnail: {
        backgroundColor: '#eee',
        alignSelf: 'center'
    },
    bodytext:{
        fontFamily: 'RobotoSlab',
        fontSize: 16
    },
    bodyview:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 8
    }
})