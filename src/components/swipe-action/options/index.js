import Taro from '@tarojs/taro'
import { View } from '@tarojs/components';
import classNames from 'classnames';
import WiComponent from '../../../common/component';
import { delayQuerySelector } from '../../../common/utils';

export default class WiSwiperActionOptions extends WiComponent {
    trrigerOptionsDomUpadte() {
        delayQuerySelector(this, `#swipeActionOptions-${this.props.componentId}`).then(res => {
            this.props.onQueryedDom(res[0]);
        });
    }

    componentDidMount() {
        this.trrigerOptionsDomUpadte();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options !== this.props.options) {
            this.trrigerOptionsDomUpadte();
        }
    }

    render() {
        const rootClass = classNames('wi-swipe-action__options', this.props.className);

        return <View id={`swipeActionOptions-${this.props.componentId}`} className={rootClass}>
            {this.props.children}
        </View>;
    }
}

WiSwiperActionOptions.defaultProps = {};

WiSwiperActionOptions.propTypes = {};