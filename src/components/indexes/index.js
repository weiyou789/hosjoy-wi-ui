import Taro from '@tarojs/taro'
import { View,ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiList from '../../components/list/index'
import WiListItem from '../../components/list/item/index'
import WiComponent from '../../common/component'
import {isTest, uuid} from '../../common/utils';

const ENV = Taro.getEnv()
export default class WiIndexes extends WiComponent{
    constructor(props){
        super(props)
        this.listId = isTest() ? 'indexes-list-AOTU2020' : `list-${uuid()}`
        this.state = {
            _scrollIntoView: '',
            _scrollTop: 0,
            _tipText: '',
            _value:props.value||[],
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
        }
    }

    componentWillReceiveProps(nextProps){
        // if (JSON.stringify(this.props) === JSON.stringify(nextProps)) return
        const { value } = nextProps
        this.setState({
            _value:value
        })
        // console.log(nextProps)
    }

    handleTouchMove = event => {
        event.stopPropagation()
        event.preventDefault()
    }

    handleTouchEnd = () => {
        this.currentIndex = -1
    }

    jumpTarget(_scrollIntoView,idx){
        this.setState({
            _scrollIntoView
        })
    }

    handleClick(...arg){
        this.props.onClick(...arg)
    }

    handleScroll(){

    }

    renderIndexes(){
        const {
            list,
            thumb,
            defaultKeyProps
        } = this.props
        const {
            listKey,
            titleKey,
            intoKey,
        } = defaultKeyProps
        const {
            _value
        } = this.state
        return list.map(dataList => {
            let _key = dataList[intoKey?intoKey:'key']
            let _title = dataList[titleKey?titleKey:'title']
            let _list = dataList[listKey?listKey:'items']
            return <View
                id={`wi-indexes__list-${_key&&_key}`}
                className='wi-indexes__list'
                key={_key&&_key}
            >
                <View className='wi-indexes__list-title'>
                    {_title&&_title}
                </View>
                <WiList>
                    {_list && _list.map(item => (
                        <WiListItem
                            key={item.name}
                            title={item.name}
                            onClick={this.handleClick.bind(this, item)}
                            thumb={_value.indexOf(item.id)===-1?'':thumb}
                        />
                    ))}
                </WiList>
            </View>
        })
    }

    renderMenu(){
        const {
            list,
            defaultKeyProps
        } = this.props
        const {
            titleKey,
            intoKey,
        } = defaultKeyProps
        return list.map((dataList, i) => {
            let _key = dataList[intoKey?intoKey:'key']
            let _title = dataList[titleKey?titleKey:'title']
            const targetView = `wi-indexes__list-${_key&&_key}`
            return <View className='wi-indexes__menu-item' key={_key&&_key}
                onClick={this.jumpTarget.bind(this, targetView, i + 1)}
            >
                {_title&&_title}
            </View>
        })

    }

    render(){
        const {
            className,
            customStyle,
            animation,
            topKey,
            // list,
        } = this.props
        const {
            isWEB,
            _scrollTop,
            _scrollIntoView
        } = this.state
        const rootCls = classNames('wi-indexes', className)

        return <View className={rootCls} style={customStyle}>
            <View
                className='wi-indexes__menu'
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
            >
                <View
                    className='wi-indexes__menu-item'
                    onClick={this.jumpTarget.bind(this, 'wi-indexes__top', 0)}
                >
                    {topKey}
                </View>
                {this.renderMenu()}
            </View>
            <ScrollView
                className='wi-indexes__body'
                id={this.listId}
                scrollY
                scrollWithAnimation={animation}
                scrollTop={isWEB ? _scrollTop : undefined}
                scrollIntoView={!isWEB ? _scrollIntoView : ''}
                onScroll={this.handleScroll.bind(this)}
            >
                <View className='wi-indexes__content' id='wi-indexes__top'>
                    {this.props.children}
                </View>
                {this.renderIndexes()}
            </ScrollView>
        </View>
    }
}

WiIndexes.propTypes = {
    customStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ]),
    list: PropTypes.array,
    value: PropTypes.array,
    onClick:PropTypes.func,
    thumb:PropTypes.string,
    defaultKeyProps:PropTypes.object
}

WiIndexes.defaultProps = {
    customStyle: '',
    className: '',
    list: [],
    value:[],
    thumb:'',
    defaultKeyProps:{
        titleKey:'',
        intoKey:'',
        listKey:''
    },
    onClick(){}
}
