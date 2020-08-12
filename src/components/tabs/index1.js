import Taro from '@tarojs/taro'
import classNames from "classnames";
import { View,ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types'
import { uuid } from '../../common/utils'
import WiComponent from '../../common/component'

const ENV = Taro.getEnv()
const MIN_DISTANCE = 100
const MAX_INTERVAL = 10

export default class WiTabs extends WiComponent{
    constructor(props){
        super(props)
        this._tabId = `tab${uuid()}`
        // 触摸时的原点
        this._touchDot = 0
        this._interval = 0;
        this._isMoving = false
        this.state = {
            _scrollLeft: '',
            _scrollTop: '',
            _scrollIntoView:''//各种小程序使用拉动滚动条到指定位置
        }
    }

    handleClick () {
        this.props.onClick(...arguments)
    }

    handleTouchStart(e){
        const { tabDirection } = this.props
        if (tabDirection === 'vertical') return
        this._touchDot = e.touches[0].pageX
        // 使用js计时器记录时间
        this._timer = setInterval(() => {//启用计时器手机点击1秒以内才能划动，防止误划
            this._interval++
        }, 100)
    }

    handleTouchMove(e){
        const {
            swipeable,
            tabDirection,
            current,
            tabList
        } = this.props

        if (!swipeable || tabDirection === 'vertical') return//如果不支持动画或者是垂直的就直接return
        const touchMove = e.touches[0].pageX
        const moveDistance = touchMove - this._touchDot//获取手指划动的距离负数是往左边划动，正数是往右边划动
        const maxIndex = tabList.length

        if (!this._isMoving && this._interval < MAX_INTERVAL && this._touchDot > 20) {//如果没在动画并且计数器小于10，并且原点位置在离左20以上
            // 向左滑动
            if (current + 1 < maxIndex && moveDistance <= -MIN_DISTANCE) {//手指向左划动距离小于-100才能划动
                this._isMoving = true
                this.handleClick(current + 1)

                // 向右滑动
            } else if (current - 1 >= 0 && moveDistance >= MIN_DISTANCE) {//手指向右划动大于100才能划动
                this._isMoving = true
                this.handleClick(current - 1)
            }
        }
    }

    handleTouchEnd () {
        const { swipeable, tabDirection } = this.props
        if (!swipeable || tabDirection === 'vertical') return

        clearInterval(this._timer)
        this._interval = 0
        this._isMoving = false
    }

    updateState = idx => {
        if (this.props.scroll) {
            // 标签栏滚动
            switch (ENV) {
                case Taro.ENV_TYPE.WEAPP:
                case Taro.ENV_TYPE.ALIPAY:
                case Taro.ENV_TYPE.SWAN:
                    const index = Math.max(idx - 1, 0)//取出需要拉到位置索引
                    this.setState({
                        _scrollIntoView: `tab${index}`//设置滚动条拉动到的位置
                    })
                    break

                case Taro.ENV_TYPE.WEB: {//h5兼容
                    /*const index = Math.max(idx - 1, 0)
                    const prevTabItem = this.tabHeaderRef.childNodes[index]
                    prevTabItem && this.setState({
                        _scrollTop: prevTabItem.offsetTop,
                        _scrollLeft: prevTabItem.offsetLeft
                    })*/
                    break
                }

                default:
                    console.warn('AtTab 组件在该环境还未适配')
                    break
            }
        }
    }

    componentDidMount () {
        // this.getTabHeaderRef()
        this.updateState(this.props.current)
    }

    componentWillReceiveProps (nextProps) {
        /*if (nextProps.scroll !== this.props.scroll) {
            this.getTabHeaderRef()
        }*/
        if (nextProps.current !== this.props.current) {
            this.updateState(nextProps.current)
        }
    }

    renderTabItems(){
        const {
            tabList,
            current,
            // renderTabBars
        } = this.props
        let content = null
        if(tabList.length > 0){
            content = tabList.map((item,idx)=>{
                const itemCls = classNames({
                    'wi-tabs__item': true,
                    'wi-tabs__item--active': current === idx
                })

                return <View
                    className={itemCls}
                    id={`tab${idx}`}
                    key={item.title}
                    onClick={this.handleClick.bind(this,idx)}
                >
                    {item.title||item}
                    <View className='wi-tabs__item-underline'></View>
                </View>
            })

        } else {
            content = <View>
                {this.props.renderTabBars}
            </View>
        }

        return (content)
    }

    render(){
        const {
            customStyle,
            className,
            height,
            tabDirection,
            animated,
            tabList,
            // renderTabBars,
            scroll,
            current
        } = this.props
        const {
            _scrollLeft,
            _scrollTop,
            _scrollIntoView
        } = this.state
        const scrollX = tabDirection === 'horizontal'
        const scrollY = tabDirection === 'vertical'
        const heightStyle = {
            height
        }
        const underlineStyle = {
            height: tabDirection === 'vertical' ? `${tabList.length * 100}%` : '1PX',
            width: tabDirection === 'horizontal' ? `${tabList.length * 100}%` : '1PX'
        }

        const bodyStyle = { }
        let transformStyle = `translate3d(0px, -${current * 100}%, 0px)`
        if (tabDirection === 'horizontal') {//容器动画样式
            transformStyle = `translate3d(-${current * 100}%, 0px, 0px)`
        }
        Object.assign(bodyStyle, {
            'transform': transformStyle,
            '-webkit-transform': transformStyle
        })
        if (!animated) {
            bodyStyle.transition = 'unset'
        }

        const rootCls = classNames({
            'wi-tabs': true,
            'wi-tabs--scroll': scroll,
            [`wi-tabs--${tabDirection}`]: true,
            [`wi-tabs--${ENV}`]: true
        }, className)
        return <View
            className={rootCls}
            style={this.mergeStyle(heightStyle, customStyle)}
        >
            {scroll?<ScrollView
                id={this._tabId}
                className='wi-tabs__header'
                style={heightStyle}
                scrollX={scrollX}
                scrollY={scrollY}
                scrollWithAnimation
                scrollLeft={_scrollLeft}
                scrollTop={_scrollTop}
                scrollIntoView={_scrollIntoView}
            >
                {this.renderTabItems()}
            </ScrollView>:<View
                id={this._tabId}
                className='wi-tabs__header'
            >
                {this.renderTabItems()}
            </View>}
            <View
                className='wi-tabs__body'
                onTouchStart={this.handleTouchStart.bind(this)}
                onTouchEnd={this.handleTouchEnd.bind(this)}
                onTouchMove={this.handleTouchMove.bind(this)}
                style={this.mergeStyle(bodyStyle, heightStyle)}
            >
                <View className='wi-tabs__underline' style={underlineStyle}></View>
                {this.props.children}
            </View>
        </View>
    }
}

WiTabs.defaultProps = {
    isTest: false,
    customStyle: '',
    className: '',
    tabDirection: 'horizontal',
    height: '',
    current: 0,
    swipeable: true,
    scroll: false,
    animated: true,
    tabList: [],
    onClick: () => {},
    //renderTabBars:''
    renderTabBars:() => {}
}


WiTabs.propTypes = {
    customStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    className: PropTypes.oneOfType([//必须是数组里类型的一个
        PropTypes.array,
        PropTypes.string
    ]),
    isTest: PropTypes.bool,
    height: PropTypes.string,
    tabDirection: PropTypes.oneOf(['horizontal', 'vertical']),//必须是数组里面的一个
    current: PropTypes.number,
    swipeable: PropTypes.bool,
    scroll: PropTypes.bool,
    animated: PropTypes.bool,
    tabList: PropTypes.array,
    customTabBar:PropTypes.func,
    onClick: PropTypes.func,
    //renderTabBars:PropTypes.node
    renderTabBars:PropTypes.func
}