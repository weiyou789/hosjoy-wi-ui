import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiImagePicker,
} from 'wi-ui'
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
      navigationBarTitleText: '图片上传组件'
  }

  render () {
      const fileList = [
          {
              url: 'https://timgsa.baidu.com/timg?image',
          },
          {
              url: 'https://timgsa.baidu.com/timg?image',
          },
          {
              url: 'https://timgsa.baidu.com/timg?image',
          }]
      return (
          <View className='index'>
              <WiImagePicker
                  files={fileList}
              />
          </View>
      )
  }
}
