import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiCountdown,
} from 'hosjoy-wi-ui'
import './index.scss'


export default class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            endTime:'2020-10-01 20:00:00'
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    timeoutDone(){
        console.log('倒计时结束执行的事件')
    }

  config = {
      navigationBarTitleText: '倒计时组件'
  }

  render () {
      return (
          <View className='index'>
              <WiCountdown
                  endTime={this.state.endTime}
                  // countTime="54783"
                  isShowDay
                  onTimeUp={this.timeoutDone}
                  classNameText="test1"
              />
          </View>
      )
  }
}
