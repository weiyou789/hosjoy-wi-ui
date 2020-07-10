import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiButton,
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
              <WiButton
                  type='primary'
                  size='small'
                  onClick={this.btnClick.bind(this)}
              >
                按钮1
              </WiButton>
          </View>
      )
  }
}
