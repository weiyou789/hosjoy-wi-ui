import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
    WiPicker
} from 'hosjoy-wi-ui'
import './index.scss'


export default class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            lists:[]
        }
        this.citysData = null
    }

    async componentWillMount () {
        const res = await Taro.request({
            url:'https://ccp-test245.hosjoy.com/common/region/provinces/nesting',
        })
        let arr = res.data.map((item)=>{
            item.cities.map((it)=>{
                it.children = it.countries||[]
            })
            return {
                ...item,
                children:item.cities||[]
            }
        })
        this.citysData = arr
        this.forceUpdate()

    }

    componentDidMount () {
    }

    componentWillUnmount () {
    }

    componentDidShow () { }

    componentDidHide () { }

    onCloseTest(){
        console.log('关闭后执行')
    }

    onConfirmTest(val){
        console.log(111, val)
    }
  config = {
      navigationBarTitleText: 'Picker组件'
  }

  render () {
      /*const _list = [
          {
              label:'美国',
              children:[
                  {
                      label:'上海',
                      children:[
                          {
                              label:'江宁'
                          },
                          {
                              label:'江北'
                          },
                          {
                              label:'建业'
                          },
                      ]
                  },
                  {
                      label:'北京',
                      children:[
                          {
                              label:'管店'
                          },
                          {
                              label:'杨庙'
                          },
                          {
                              label:'石坝'
                          },
                      ]
                  },
                  {
                      label:'南京'
                  },
                  {
                      label:'深圳'
                  },
              ]
          },
          {
              label:'中国',
              children:[
                  {
                      label:'芜湖',
                      children:[
                          {
                              label:'明光'
                          },
                          {
                              label:'蚯蚓'
                          },
                          {
                              label:'天长'
                          },
                      ]
                  },
                  {
                      label:'合肥',
                      children:[
                          {
                              label:'涧西'
                          },
                          {
                              label:'古沛'
                          },
                          {
                              label:'魏刚'
                          },
                      ]
                  },
                  {
                      label:'滁州'
                  },
              ]
          },
          {
              label:'巴西',
              children:[
                  {
                      label:'上海'
                  },
                  {
                      label:'北京'
                  },
                  {
                      label:'南京'
                  },
              ]
          },
          {
              label:'日本',
              children:[
                  {
                      label:'上海'
                  },
                  {
                      label:'北京'
                  },
                  {
                      label:'南京'
                  },
              ]
          }
      ]*/
      const _list = ['南京','北京','上海']
      const { citysData } = this
      return (
          <View className='index'>

              <WiPicker
                  list={_list}
                  // rangeKey='name'
                  mode='selector'
                  value={1}
                  // value={[0,1,1]}
                  confirmClick={this.onConfirmTest.bind(this)}
              >
                  <View>弹出</View>
              </WiPicker>

          </View>
      )
  }
}
