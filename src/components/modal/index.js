/**
 * Created by admin on 2020/6/19.
 */
import Taro from '@tarojs/taro'
import { View,Text,Button } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import WiModalHeader from './header/index'
import WiModalAction from './action/index'
import WiModalContent from './content/index'

import WiComponent from '../../common/component'
import { handleTouchScroll } from '../../common/utils'

export default class WiModal extends WiComponent{
    constructor(props){
        super(props)
        const { isOpened } = props
        this.state = {
            _isOpened: isOpened,
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
        }
    }

    componentWillReceiveProps (nextProps) {
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

    handleClickOverlay = () => {
        if (this.props.closeOnClickOverlay) {
            this.setState(
                {
                    _isOpened: false
                },
                this.handleCancel
            )
        }
    }

    handleCancel = () => {
        this.setState({
            _isOpened: false
        })
        this.props.onClose()
    }

    handleConfirm = () => {
        this.props.onConfirm()
    }

    handleTouchMove = e => {
        e.stopPropagation()
    }

    render(){
        const { _isOpened, isWEB } = this.state
        const { title, content, cancelText, confirmText } = this.props
        const rootClass = classNames(
            'wi-modal',
            {
                'wi-modal--active': _isOpened
            },
            this.props.className
        )

        if (title || content) {
            const isRenderAction = cancelText || confirmText
            return (
                <View className={rootClass}>
                    <View
                        onClick={this.handleClickOverlay}
                        className='wi-modal__overlay'
                    />
                    <View className='wi-modal__container'>
                        {title && (
                            <WiModalHeader>
                                <Text>{title}</Text>
                            </WiModalHeader>
                        )}
                        {content && (
                            <WiModalContent>
                                <View className='content-simple'>
                                    { isWEB ? <Text dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}></Text> : <Text>{content}</Text> }
                                </View>
                            </WiModalContent>
                        )}
                        {isRenderAction && (
                            <WiModalAction isSimple>
                                {cancelText && (
                                    <Button onClick={this.handleCancel}>{cancelText}</Button>
                                )}
                                {confirmText && (
                                    <Button onClick={this.handleConfirm}>{confirmText}</Button>
                                )}
                            </WiModalAction>
                        )}
                    </View>
                </View>
            )
        }

        return (
            <View onTouchMove={this.handleTouchMove} className={rootClass}>
                <View className='wi-modal__overlay' onClick={this.handleClickOverlay} />
                <View className='wi-modal__container'>{this.props.children}</View>
            </View>
        )

    }
}


WiModal.defaultProps = {
    closeOnClickOverlay: true,
    className:''
}

WiModal.propTypes = {
    title: PropTypes.string,
    isOpened: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    content: PropTypes.string,
    closeOnClickOverlay: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ])
}
