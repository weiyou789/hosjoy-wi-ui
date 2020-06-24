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
                  percent={75}
                  strokeWidth={10}
                  status='success'
                  bottomColor='#000'
              >
                  <View className='weitest'>已经抢购50件</View>
              </WiProgress>
          </View>
      )
  }
}
