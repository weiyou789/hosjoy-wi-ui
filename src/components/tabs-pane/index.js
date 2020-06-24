import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'

export default class WiTabsPane extends WiComponent {
    render () {
        const {
            customStyle,
            className,
            tabDirection,
            index,
            current
        } = this.props
        return (
            <View
                className={
                    classNames({
                        'wi-tabs-pane': true,
                        'wi-tabs-pane--vertical': tabDirection === 'vertical',
                        'wi-tabs-pane--active': index === current,
                        'wi-tabs-pane--inactive': index !== current
                    }, className)
                }
                style={customStyle}
            >
                {this.props.children}
            </View>
        )
    }
}


WiTabsPane.defaultProps = {
    customStyle: '',
    className: '',
    tabDirection: 'horizontal',
    index: 0,
    current: 0,
}

WiTabsPane.propTypes = {
    customStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ]),
    tabDirection: PropTypes.oneOf(['horizontal', 'vertical']),
    index: PropTypes.number,
    current: PropTypes.number,
}
