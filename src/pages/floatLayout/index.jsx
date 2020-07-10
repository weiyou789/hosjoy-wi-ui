import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiFloatLayout
} from 'hosjoy-wi-ui'
import './index.scss'


export default class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            show:false
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    onCloseTest(){
        console.log('关闭后执行')
    }

    onShow(){
        this.setState({
            show:true
        })
    }
  config = {
      navigationBarTitleText: '浮框组件'
  }

  render () {
      const { show } =  this.state
      return (
          <View className='index'>
              <View onClick={()=>this.onShow()}>弹出</View>
              <WiFloatLayout
                  isOpened={show}
                  title='标题'
                  onClose={this.onCloseTest.bind(this)}
                  // renderTit={<View className='www'>渲染</View>}
              >
                  <View>内容</View>
              </WiFloatLayout>
          </View>
      )
  }
}
