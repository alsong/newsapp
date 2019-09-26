import { orderBy } from 'lodash'
import config from './../../config'
import Config from './../../config'
import { Alert } from 'react-native'


export async function getArticleBySource(){
 
    try {
        let articles = await fetch(`${config.ARTICLE_URL}?category=${config.CATEGORY}&language=${config.LANGUAGE}`,{
            headers:{
                'X-API-KEY': Config.API_KEY
            }
        })

        let result = await articles.json()
        articles = null

        return orderBy(result.articles,'publishedAt','desc')
    } catch (error) {
        Alert.alert(JSON.stringify("Something happened, please try again"))
    }
}



