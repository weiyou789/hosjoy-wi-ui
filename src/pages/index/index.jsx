import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiList,
    WiListItem
} from 'hosjoy-wi-ui'

import './index.scss'

export default class Index extends Component {
    constructor(props){
        super(props)
        this.jumpLink.bind(this)
    }

    componentWillMount () {
    }

    componentDidMount () {
        /*Taro.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })*/
    }


    /*onShareAppMessage(e){
        console.log(1,e)
    }

    onShareTimeline(e){
        return {
            title:'测试设置一下标题111'
        }
    }*/


    jumpLink(url){
        Taro.navigateTo({
            url:`/pages/${url}/index`
        })
    }
    config = {
        navigationBarTitleText: '首页'
    }

    render () {
        return (
            <View className='index'>
                <WiList>
                    <WiListItem onClick={()=>this.jumpLink('button')} title="button" />
                    <WiListItem onClick={()=>this.jumpLink('countdown')} title="countdown" />
                    <WiListItem onClick={()=>this.jumpLink('drawer')} title="drawer" />
                    <WiListItem onClick={()=>this.jumpLink('floatLayout')} title="floatLayout" />
                    <WiListItem onClick={()=>this.jumpLink('indexes')} title="indexes" />
                    <WiListItem onClick={()=>this.jumpLink('inputNumber')} title="inputNumber" />
                    <WiListItem onClick={()=>this.jumpLink('progress')} title="progress" />
                    <WiListItem onClick={()=>this.jumpLink('tabs')} title="tabs" />
                    <WiListItem onClick={()=>this.jumpLink('actionSheet')} title="actionSheet" />
                    <WiListItem onClick={()=>this.jumpLink('imagePicker')} title="imagePicker" />
                    <WiListItem onClick={()=>this.jumpLink('modal')} title="modal" />
                    <WiListItem onClick={()=>this.jumpLink('picker')} title="picker" />
                    <WiListItem onClick={()=>this.jumpLink('searchBar')} title="searchBar" />
                </WiList>
            </View>
        )
    }
}
