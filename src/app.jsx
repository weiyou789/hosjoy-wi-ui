import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

    componentDidMount () {}

    componentDidShow () {}

    componentDidHide () {}

    componentDidCatchError () {}

    config = {
        pages: [
            'pages/index/index',
            'pages/button/index',
            'pages/countdown/index',
            'pages/drawer/index',
            'pages/floatLayout/index',
            'pages/indexes/index',
            'pages/inputNumber/index',
            'pages/progress/index',
            'pages/tabs/index',
            'pages/actionSheet/index',
            'pages/imagePicker/index',
            'pages/modal/index',
            'pages/picker/index',
            'pages/searchBar/index',
            'pages/input/index',
            'pages/textarea/index',
            'pages/swipeAction/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render () {
        return (
            <Index />
        )
    }
}

Taro.render(<App />, document.getElementById('app'))
