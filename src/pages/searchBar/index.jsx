import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiSearchBar,
} from 'hosjoy-wi-ui'
import './index.scss'


export default class Index extends Component {

    constructor(props){
        super(props)
        this.state = {
            value:''
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    onChange(v){
        console.log(222,v)
        this.setState({
            value:v
        })
        return v
    }

    searchClick(){
        console.log('搜索按钮点击')
    }

  config = {
      navigationBarTitleText: '搜索框组件'
  }

  render () {
      return (
          <View className='index'>
              <WiSearchBar
                  onChange={this.onChange.bind(this)}
                  value={this.state.value}
                  onActionClick={this.searchClick.bind(this)}
              />
          </View>
      )
  }
}
