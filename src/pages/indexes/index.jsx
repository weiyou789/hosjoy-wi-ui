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
            show:false,
            value:[]
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
        console.log(item,'列表被点击了啊')
        const { value } = this.state
        let arr = value
        let index = arr.indexOf(item.id);
        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(item.id)
        }
        this.setState({
            value:arr
        })
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
      const { show,value } =  this.state
      const list = [
          {
              letter: 'A',
              letterList: [
                  {
                      name: '阿坝',
                      id:1
                  },
                  {
                      name: '阿拉善',
                      id:2
                  }]
          },
          {
              letter: 'B',
              letterList: [
                  {
                      name: '北京',
                      id:4
                  },
                  {
                      name: '保定',
                      id:5
                  }]
          },
          {
              letter: 'C',
              letterList: [
                  {
                      name: '滁州',
                      id:6
                  },
                  {
                      name: '保定',
                      id:7
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
                      onClick={this.onClickItem.bind(this)}
                      thumb="https://hosjoy-hbp.oss-cn-hangzhou.aliyuncs.com/images/20200224/90534805-1506-4a90-bdfc-9086de19d7fb.png"
                      value={value}
                  />
              </WiDrawer>
          </View>
      )
  }
}
