
import Taro from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'
import '../../style/components/icon.scss'

export default class WiSearchBar extends WiComponent{
    constructor (props) {
        super(props)
        this.state = {
            isFocus: props.focus
        }
    }

    handleChange = (e,...arg) =>{
        this.props.onChange(e.target.value, ...arg)
    }

    handleClear = (...arg) => {
        this.props.onChange('', ...arg)
    }

    handleFocus = () =>{
        this.setState({
            isFocus: true
        })
    }

    handleActionClick = (...arg) => {
        this.props.onActionClick(...arg)
    }

    handleBlur = (e) =>{
        const { value } = e.detail
        if(!value.length){
            this.setState({
                isFocus: false
            })
        }
    }

    handleConfirm = (...arg) => this.props.onConfirm(...arg)

    render(){
        const {
            className,
            customStyle,
            fixed,
            placeholder,
            actionName,
            actionStyle,
            value,
            inputType
        } = this.props
        const {
            isFocus
        } = this.state
        const rootCls = classNames(
            'wi-search-bar',
            {
                'wi-search-bar--fixed': fixed
            }, className
        )
        const clearIconStyle = { display: 'flex' }
        const placeholderStyle = { visibility: 'hidden' }
        if (!value.length) {
            clearIconStyle.display = 'none'
            placeholderStyle.visibility = 'visible'
        }
        return (
            <View
                className={rootCls}
                style={customStyle}
            >
                <View className='wi-search-bar__input-cnt'>
                    <View
                        className='wi-search-bar__placeholder-wrap'
                    >
                        <Text className='wi-icon wi-icon-search'></Text>
                        <Text
                            className='wi-search-bar__placeholder'
                            style={placeholderStyle}
                        >
                            {isFocus ? '' : placeholder}
                        </Text>
                    </View>
                    <Input
                        className='wi-search-bar__input'
                        type={inputType}
                        confirmType='search'
                        focus={isFocus}
                        value={value}
                        onInput={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onConfirm={this.handleConfirm}
                    />
                    <View
                        className='wi-search-bar__clear'
                        style={clearIconStyle}
                        onTouchStart={this.handleClear}
                    >
                        <Text className='wi-icon wi-icon-close-circle'></Text>
                    </View>
                </View>
                <View
                    className='wi-search-bar__action'
                    style={actionStyle}
                    onClick={this.handleActionClick}
                >
                    {actionName}
                </View>
            </View>
        )
    }
}

WiSearchBar.defaultProps = {
    placeholder:'搜索',
    fixed: false,
    focus: false,
    actionName:'搜索',
    actionStyle:'',
    inputType:'text',
    value:'',
    onChange(){},
    onActionClick(){},
}

WiSearchBar.PropTypes = {
    placeholder: PropTypes.string,
    fixed: PropTypes.bool,
    focus: PropTypes.bool,
    actionName:PropTypes.string,
    inputType: PropTypes.oneOf(['text', 'number', 'idcard', 'digit']),
    onChange: PropTypes.func,
    onActionClick: PropTypes.func,
    value:PropTypes.string,
    actionStyle:PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ])
}
