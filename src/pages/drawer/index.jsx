import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiDrawer,
    WiList,
    WiListItem
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
      navigationBarTitleText: '抽屉组件'
  }

  render () {
      const { show } =  this.state
      return (
          <View className='index'>
              <View onClick={()=>this.onShow()}>弹出</View>
              <WiDrawer
                  show={show}
                  onClose={this.onCloseTest.bind(this)}
              >
                  <WiList>
                      <WiListItem title="菜单1" />
                      <WiListItem title="菜单2" />
                  </WiList>
              </WiDrawer>
          </View>
      )
  }
}
