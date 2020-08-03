import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiInputNumber,
} from 'hosjoy-wi-ui'
import './index.scss'


export default class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            val:10
        }
    }
    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    testOnErr(err){
        console.log(err)
    }

    testOnBlur(value){
        console.log('当前值为',value)
    }

    testOnChange(value){
        this.setState({
            val:value
        })
    }

  config = {
      navigationBarTitleText: '计数器组件'
  }

  render () {
      return (
          <View className='index'>
              <WiInputNumber
                  min={1}
                  max={99}
                  step={1}
                  value={this.state.val}
                  onErrorInput={this.testOnErr.bind(this)}
                  onBlur={this.testOnBlur.bind(this)}
                  onChange={this.testOnChange.bind(this)}
              />
          </View>
      )
  }
}
