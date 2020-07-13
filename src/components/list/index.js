import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'

export default class WiList extends WiComponent {
    render () {
        const rootClass = classNames(
            'wi-list',
            {
                'wi-list--no-border': !this.props.hasBorder
            },
            this.props.className
        )

        return <View className={rootClass}>{this.props.children}</View>
    }
}

WiList.defaultProps = {
    hasBorder: true,
    className:''
}

WiList.PropTypes = {
    hasBorder: PropTypes.bool,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ])
}
