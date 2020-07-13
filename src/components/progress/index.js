
import Taro from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'

export default class WiProgress extends WiComponent {
    render(){
        const { color,bottomColor } = this.props
        let { percent } = this.props
        const { strokeWidth, status, isHidePercent } = this.props

        if (percent < 0) {
            percent = 0
        } else if (percent > 100) {
            percent = 100
        }

        const rootClass = classNames(
            'wi-progress',
            {
                [`wi-progress--${status}`]: !!status
            },
            this.props.className
        )
        const iconClass = classNames('wi-icon', {
            'wi-icon-close-circle': status === 'error',
            'wi-icon-check-circle': status === 'success',
        })

        const progressStyle = {
            width: percent && `${+percent}%`,
            height: strokeWidth && `${+strokeWidth}px`,
            backgroundColor: color,
            'border-radius':strokeWidth?parseInt(+strokeWidth/2)+'px':'8px'
        }

        const bottomStyle = {
            backgroundColor:bottomColor?bottomColor:'#f7f7f7',
            'border-radius':strokeWidth?parseInt(+strokeWidth/2)+'px':'8px'
        }

        return (
            <View className={rootClass}>
                <View className='wi-progress__outer'>
                    <View className='wi-progress__outer-inner' style={bottomStyle}>
                        {this.props.children}
                        <View
                            className='wi-progress__outer-inner-background'
                            style={progressStyle}
                        >
                        </View>
                    </View>
                </View>

                {!isHidePercent && (
                    <View className='wi-progress__content'>
                        {!status || status === 'progress' ? `${percent}%` : <Text className={iconClass}></Text>}
                    </View>
                )}
            </View>
        )
    }
}

WiProgress.propTypes = {
    bottomColor:PropTypes.string,
    color: PropTypes.string,
    status: PropTypes.string,
    percent: PropTypes.number,
    strokeWidth: PropTypes.number,
    isHidePercent: PropTypes.bool,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ])
}
