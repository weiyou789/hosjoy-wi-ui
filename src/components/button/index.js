
import Taro from '@tarojs/taro'
import { View, Button, Form } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'

const SIZE_CLASS = {
    normal: 'normal',
    small: 'small',
}

const TYPE_CLASS = {
    primary: 'primary',
    secondary: 'secondary',
}

const ENV = Taro.getEnv()

export default class WiButton extends WiComponent{
    constructor(props){
        super(props)
        this.isWEB = ENV === Taro.ENV_TYPE.WEB
    }

    onClick(){
        if(!this.props.disabled){
            this.props.onClick && this.props.onClick(...arguments)
        }
    }

    onGetUserInfo(){
        this.props.onGetUserInfo && this.props.onGetUserInfo(...arguments)
    }

    onGetPhoneNumber(){
        this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(...arguments)
    }

    renderBtn(){
        const {
            disabled,
            openType,
            lang,
            formType
        } = this.props
        const {
            isWEB
        } = this
        let content = null
        if(!disabled){
            if(isWEB){
                content = <Button
                    className='wi-button__wxbutton'
                    lang={lang}
                    type={formType === 'submit' || formType === 'reset' ? formType : 'button'}
                >
                </Button>
            } else {
                content = <Button
                    className='wi-button__wxbutton'
                    openType={openType}
                    onGetUserInfo={this.onGetUserInfo.bind(this)}
                    onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
                    lang={lang}
                >
                </Button>
            }
        }

        return (content)
    }

    render(){
        const {
            size = 'normal',
            type = '',
            circle,
            full,
            disabled,
            customStyle
        } = this.props
        const rootClassName = ['wi-button']
        const classObject = {
            [`wi-button--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],//动态class
            'wi-button--disabled': disabled,
            [`wi-button--${type}`]: TYPE_CLASS[type],
            'wi-button--circle': circle,
            'wi-button--full': full,
        }

        return (
            <View
                className={classNames(rootClassName, classObject, this.props.className)}
                style={customStyle}
                onClick={this.onClick.bind(this)}
            >
                {this.renderBtn()}
                <View className='wi-button__text'>{this.props.children}</View>
            </View>
        )
    }
}

WiButton.defaultProps = {
    size:'normal',
    type:'',
    circle: false,
    full: false,
    disabled: false,
    customStyle: {},
    openType:'',
    lang: 'en',
    className:'',
    onClick:()=>{},
    onGetUserInfo:()=>{},
    onGetPhoneNumber:()=>{}
}

WiButton.PropTypes = {
    size: PropTypes.oneOf(['normal', 'small']),
    type: PropTypes.oneOf(['primary', 'secondary', '']),
    circle: PropTypes.bool,
    full: PropTypes.bool,
    disabled: PropTypes.bool,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onClick: PropTypes.func,
    openType:PropTypes.oneOf(['contact', 'share', 'getUserInfo', 'getPhoneNumber', 'launchApp', 'openSetting', 'feedback', 'getRealnameAuthInfo', '']),
    lang: PropTypes.string,
    onGetUserInfo: PropTypes.func,
    onGetPhoneNumber: PropTypes.func,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ])
}
