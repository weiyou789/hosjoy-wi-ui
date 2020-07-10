import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiTabs,
    WiTabsPane,
} from 'hosjoy-wi-ui'
import './index.scss'


export default class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            current:0
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    tabClick(index){
        this.setState({
            current:index
        })
    }

  config = {
      navigationBarTitleText: '选项卡组件'
  }

  render () {
      const { current } =  this.state
      return (
          <View className='index'>
              <WiTabs
                  scroll
                  className='wei'
                  tabDirection='horizontal'
                  tabList={['test1','test2','test3']}
                  onClick={this.tabClick.bind(this)}
                  current={current}
                  // renderTabBars={<View>5454</View>}
              >
                  <WiTabsPane current={this.state.current} index={0}>
                      <View className='fixed-test'>第一个内容</View>
                  </WiTabsPane>
                  <WiTabsPane current={this.state.current} index={1}>
                      <View className='fixed-test'>第二个内容</View>
                  </WiTabsPane>
                  <WiTabsPane current={this.state.current} index={2}>
                      <View className='fixed-test'>第三个内容</View>
                  </WiTabsPane>
              </WiTabs>
          </View>
      )
  }
}
