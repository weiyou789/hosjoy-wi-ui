/**
 * Created by admin on 2020/6/19.
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import WiComponent from '../../../common/component'

export default class WiModalHeader extends WiComponent {
    render () {
        const rootClass = classNames('wi-modal__header', this.props.className)
        return <View className={rootClass}>{this.props.children}</View>
    }
}
