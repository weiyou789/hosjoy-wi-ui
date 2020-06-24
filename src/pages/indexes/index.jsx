import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiIndexes,
    WiDrawer
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

    onClickItem(item){
        console.log(item,'列表被点击了')
    }
    onShow(){
        this.setState({
            show:true
        })
    }
  config = {
      navigationBarTitleText: '索引选择器组件'
  }

  render () {
      const { show } =  this.state
      const list = [
          {
              letter: 'A',
              letterList: [
                  {
                      'name': '阿坝'
                  },
                  {
                      'name': '阿拉善'
                  }]
          },
          {
              letter: 'B',
              letterList: [
                  {
                      'name': '北京'
                  },
                  {
                      'name': '保定'
                  }]
          },
          {
              letter: 'C',
              letterList: [
                  {
                      'name': '滁州'
                  },
                  {
                      'name': '保定'
                  }]
          }
      ]
      const _props = {
          titleKey:'letter',
          intoKey:'letter',
          listKey:'letterList'
      }
      return (
          <View className='index'>
              <View onClick={()=>this.onShow()}>弹出</View>
              <WiDrawer
                  show={show}
                  onClose={this.onCloseTest}
              >
                  <WiIndexes
                      list={list}
                      defaultKeyProps={_props}
                      onClick={this.onClickItem}
                  />
              </WiDrawer>
          </View>
      )
  }
}
