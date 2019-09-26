import React, { PureComponent } from 'react'
import moment from 'moment'
import { StyleSheet } from 'react-native'
import { Text } from 'native-base'

export default class Index extends PureComponent {

    constructor(props) {
        super(props)
        this.date = props.date
    }

    render(){
        const time = moment(this.date || moment.now()).fromNow()
        return(
            <Text note numberOfLines={1} children={time} style={styles.textstyle}/>
        )
    }
}

const styles = StyleSheet.create({
    textstyle:{
        marginHorizontal: 8
    }
})