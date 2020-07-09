# hosjoy-wi-ui

### Links

* [Docs](https://weiyou789.github.io)

### install

```
npm install hosjoy-wi-ui -D
```

### Usage

#### app.jsx

```
import 'hosjoy-wi-ui/dist/style/index.scss'
```

#### pages/button/index.jsx

```
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

```

