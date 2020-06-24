/**
 * Created by admin on 2020/6/19.
 */
import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import WiComponent from '../../../common/component'

export default class WiModalContent extends WiComponent {
    render () {
        const rootClass = classNames('wi-modal__content', this.props.className)
        return <ScrollView scrollY className={rootClass}>{this.props.children}</ScrollView>
    }
}
