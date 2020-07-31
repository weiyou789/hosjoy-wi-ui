import Nerv from "nervjs";

import Taro from "@tarojs/taro-h5";
import { View, Input, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WiComponent from '../../common/component';

function parseValue(num) {
  if (num === '') return '0';
  return parseInt(num).toString();
}

export default class WiInputNumber extends WiComponent {
  constructor(props) {
    super(props);
  }

  handleClick(clickType) {
    const { disabled, value, min, max, step, onErrorInput } = this.props;
    const lowThanMin = clickType === 'minus' && value <= min;
    const overThanMax = clickType === 'plus' && value >= max;
    if (lowThanMin || overThanMax || disabled) {
      const deltaValue = clickType === 'minus' ? -step : step;
      const errorValue = +value + deltaValue;
      if (disabled) {
        onErrorInput && onErrorInput({
          type: 'DISABLED',
          errorValue
        });
      } else {
        onErrorInput && onErrorInput({
          type: lowThanMin ? 'LOW' : 'OVER',
          errorValue
        });
      }
      return;
    }
    const deltaValue = clickType === 'minus' ? -step : step;
    let newValue = +value + deltaValue;
    newValue = this.handleValue(newValue);
    this.props.onChange(newValue);
  }

  handleValue = value => {
    const {
      min,
      max,
      onErrorInput
    } = this.props;
    let resultValue = value === '' ? min : value;
    if (resultValue < min) {
      resultValue = min;
      onErrorInput && onErrorInput({
        type: 'LOW',
        errorValue: resultValue
      });
    }
    if (resultValue > max) {
      resultValue = max;
      onErrorInput && onErrorInput({
        type: 'OVER',
        errorValue: resultValue
      });
    }
    return parseValue(resultValue);
  };

  handleBlur = e => {
    const { disabled } = this.props;
    if (disabled) return;
    const newValue = this.handleValue(e.target.value);
    this.props.onBlur(+newValue);
  };

  handleInput = e => {
    const { disabled } = this.props;
    if (disabled) return;
    const newValue = this.handleValue(e.target.value);
    this.props.onChange(+newValue);
  };

  render() {
    const {
      customStyle,
      className,
      disabled,
      value,
      // type,
      min,
      max,
      size,
      disabledInput
    } = this.props;

    const inputValue = this.handleValue(value);
    const rootCls = classNames('wi-input-number', {
      'wi-input-number--lg': size
    }, className);
    const minusBtnCls = classNames('wi-input-number__btn', {
      'wi-input-number--disabled': inputValue <= min || disabled
    });
    const plusBtnCls = classNames('wi-input-number__btn', {
      'wi-input-number--disabled': inputValue >= max || disabled
    });

    return <View className={rootCls} style={customStyle}>
                <View className={minusBtnCls} onClick={this.handleClick.bind(this, 'minus')}>
                    <Text className="wi-input-number__btn-subtract">-</Text>
                </View>
                <Input className="wi-input-number__input" type="number" value={inputValue} disabled={disabledInput || disabled} onInput={this.handleInput}
      // onBlur={this.handleBlur}
      />
                <View className={plusBtnCls} onClick={this.handleClick.bind(this, 'plus')}>
                    <Text className="wi-input-number__btn-add">+</Text>
                </View>
            </View>;
  }
}

WiInputNumber.defaultProps = {
  customStyle: '',
  className: '',
  disabled: false,
  disabledInput: false,
  value: 1,
  // type: 'number',
  // width: 0,
  min: 0,
  max: 100,
  step: 1,
  size: '',
  onChange: () => {},
  onBlur: () => {}
};

WiInputNumber.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // type: PropTypes.oneOf(['number', 'digit']),
  disabled: PropTypes.bool,
  // width: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  size: PropTypes.string,
  disabledInput: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onErrorInput: PropTypes.func
};