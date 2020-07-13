import Taro from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../../common/component'

export default class WiListItem extends WiComponent {
    handleClick = (...args) => {
        this.props.onClick(...args)
    }

    render () {
        const {
            note,
            thumb,
            disabled,
            hasBorder
        } = this.props

        let {
            title
        } = this.props

        title = String(title)

        const rootClass = classNames(
            'wi-list__item',
            {
                'wi-list__item--thumb': thumb,
                'wi-list__item--multiple': note,
                'wi-list__item--disabled': disabled,
                'wi-list__item--no-border': !hasBorder
            },
            this.props.className
        )

        return (
            <View className={rootClass} onClick={this.handleClick}>
                <View className='wi-list__item-container'>
                    {thumb && (
                        <View className='wi-list__item-thumb item-thumb'>
                            <Image
                                className='item-thumb__info'
                                mode='scaleToFill'
                                src={thumb}
                            />
                        </View>
                    )}
                    <View className='wi-list__item-content item-content'>
                        <View className='item-content__info'>
                            <View className='item-content__info-title'>{title}</View>
                            {note && <View className='item-content__info-note'>{note}</View>}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

WiListItem.defaultProps = {
    note: '',
    disabled: false,
    title: '',
    thumb: '',
    hasBorder: true,
    className:'',
    onClick: () => {}
}

WiListItem.propTypes = {
    note: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    thumb: PropTypes.string,
    onClick: PropTypes.func,
    hasBorder: PropTypes.bool,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ])
}
