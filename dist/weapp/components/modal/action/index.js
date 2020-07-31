/**
 * Created by admin on 2020/6/19.
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../../common/component'

export default class WiModalAction extends WiComponent {
    render () {
        const rootClass = classNames(
            'wi-modal__footer',
            {
                'wi-modal__footer--simple': this.props.isSimple
            },
            this.props.className
        )

        return (
            <View className={rootClass}>
                <View className='wi-modal__action'>
                    {this.props.children}
                </View>
            </View>
        )
    }
}

WiModalAction.defaultProps = {
    isSimple: false,
}

WiModalAction.propTypes = {
    isSimple: PropTypes.bool,
}
