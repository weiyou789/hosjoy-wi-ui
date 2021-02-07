import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiSwipeAction,
} from 'hosjoy-wi-ui'
import './index.scss'


export default class Index extends Component {

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    btnClick(){
        console.log('点击事件')
    }

  config = {
      navigationBarTitleText: '按钮组件'
  }

  render () {
      return (
          <View className='index'>
              <WiSwipeAction options={[
                  {
                      text: '取消',
                      style: {
                          backgroundColor: '#6190E8'
                      }
                  },
                  {
                      text: '确认',
                      style: {
                          backgroundColor: '#FF4949'
                      }
                  }
              ]}
              >
                  <View className='normal'>AtSwipeAction 一般使用场景</View>
              </WiSwipeAction>
          </View>
      )
  }
}
