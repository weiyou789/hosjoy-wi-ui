/**
 * Created by admin on 2020/6/11.
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'

export default class WiActionSheet extends WiComponent{
    constructor(props){
        super(props)
        const { isOpened } = props

        this.state = {
            _isOpened:isOpened
        }
    }

    componentWillReceiveProps(nextProps){
        const { isOpened } = nextProps
        if (isOpened !== this.state._isOpened) {
            this.setState({
                _isOpened: isOpened
            })

            !isOpened && this.handleClose()
        }
    }

    handleClose = () => {
        this.props.onClose()
    }

    close = () => {
        this.setState(
            {
                _isOpened: false
            },
            this.handleClose
        )
    }

    handleTouchMove = e => {
        e.stopPropagation()
        e.preventDefault()
    }

    renderTitle(){
        const { title,className } = this.props
        const rootClass = classNames('wi-action-sheet__header', className)
        return (
            <View className={rootClass}>{title}</View>
        )
    }

    renderFloor(){
        const { cancelText,className } = this.props
        const rootClass = classNames('wi-action-sheet__footer', className)
        return (
            <View onClick={this.close} className={rootClass}>{cancelText}</View>
        )
    }

    renderBody(){
        const { className } =  this.props
        const rootClass = classNames('wi-action-sheet__body', className)
        return (
            <View className={rootClass}>{this.props.children}</View>
        )
    }

    render () {
        const { title, cancelText, className } = this.props
        const { _isOpened } = this.state

        const rootClass = classNames(
            'wi-action-sheet',
            {
                'wi-action-sheet--active': _isOpened,
            },
            className
        )
        return (
            <View className={rootClass} onTouchMove={this.handleTouchMove}>
                <View onClick={this.close} className='wi-action-sheet__overlay' />
                <View className='wi-action-sheet__container'>
                    {title&&this.renderTitle()}
                    {this.renderBody()}
                    {cancelText&&this.renderFloor()}
                </View>
            </View>
        )
    }
}

WiActionSheet.defaultProps = {
    title: '',
    cancelText: '',
    isOpened: false,
    className:'',
    onClose(){}
}

WiActionSheet.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    isOpened: PropTypes.bool,
    cancelText: PropTypes.string,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ])
}
