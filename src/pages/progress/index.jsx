import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiProgress,
} from 'wi-ui'
import './index.scss'


export default class Index extends Component {

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

  config = {
      navigationBarTitleText: '进度条组件'
  }

  render () {
      return (
          <View className='index'>
              <WiProgress
                  percent={20}
                  strokeWidth={10}
                  status='success'
                  bottomColor='#f4f4f4'
              >
                  <View className='weitest'>已经抢购50件已经抢购50件已经抢购50件已经抢购50件已经抢购50件</View>
              </WiProgress>
          </View>
      )
  }
}
