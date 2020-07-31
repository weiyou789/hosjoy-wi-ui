import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'
import { handleTouchScroll } from '../../common/utils'

export default class WiFloatLayout extends WiComponent{
    constructor(props){
        super(props)
        const { isOpened } = this.props
        this.state = {
            _isOpened:isOpened
        }
    }

    componentWillReceiveProps(nextProps){
        const { isOpened } = nextProps
        if (this.props.isOpened !== isOpened) {
            handleTouchScroll(isOpened)
        }

        if (isOpened !== this.state._isOpened) {
            this.setState({
                _isOpened: isOpened
            })
        }
    }

    closed = () => {
        const { onClose } = this.props
        this.setState({
            _isOpened:false
        },()=>{
            onClose()
        })
    }

    handleTouchMove = (e) => {
        e.stopPropagation()
    }



    renderTitle(title){
        return (
            <View className='layout-header'>
                <Text className='layout-header__title'>{title}</Text>
                <View className='layout-header__btn-close' onClick={this.closed} />
            </View>
        )
    }

    renderBody(){
        const { scrollX, onScroll } = this.props
        return (
            <View className='layout-body'>
                <ScrollView
                    scrollY
                    scrollX={scrollX}
                    onScroll={onScroll}
                    className='layout-body__content'
                >
                    {this.props.children}
                </ScrollView>
            </View>
        )
    }

    render(){
        const { _isOpened } = this.state
        const {
            title,
            className
        } = this.props

        const rootClass = classNames(
            'wi-float-layout',
            {
                'wi-float-layout--active': _isOpened
            },className)
        return (
            <View className={rootClass} onTouchMove={this.handleTouchMove}>
                <View onClick={this.closed} className='wi-float-layout__overlay' />
                <View className='wi-float-layout__container layout'>
                    {title&&this.renderTitle(title)}
                    {this.renderBody()}
                </View>
            </View>
        )
    }
}

WiFloatLayout.defaultProps = {
    isOpened:false,
    title:'',
    className:'',
    onClose(){},
    onScroll(){},
    scrollX:false,
    renderTit:''
}

WiFloatLayout.PropTypes = {
    isOpened: PropTypes.bool,
    scrollX:PropTypes.bool,
    onClose: PropTypes.func,
    onScroll:PropTypes.func,
    title: PropTypes.string,
    renderTit:PropTypes.node,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ])
}