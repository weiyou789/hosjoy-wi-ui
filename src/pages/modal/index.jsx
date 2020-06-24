import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiModal
} from 'wi-ui'
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
      navigationBarTitleText: '弹框组件'
  }

  render () {
      const { show } =  this.state
      return (
          <View className='index'>
              <View onClick={()=>this.onShow()}>弹出</View>
              <WiModal
                  isOpened={show}
                  title='标题'
                  cancelText='取消'
                  confirmText='确认'
                  onClose={this.onCloseTest}
                  onConfirm={this.handleConfirm}
                  content='内容'
              />
          </View>
      )
  }
}
