import Taro from "@tarojs/taro-h5";

const objectToString = style => {
  if (style && typeof style === 'object') {
    let styleStr = '';
    Object.keys(style).forEach(key => {
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      styleStr += `${lowerCaseKey}:${style[key]};`;
    });
    return styleStr;
  } else if (style && typeof style === 'string') {
    return style;
  }
  return '';
};

export default class WiComponent extends Taro.Component {
  static options = {
    addGlobalClass: true //让全局样式可以影响到组件
  };

  mergeStyle(style1, style2) {
    if (style1 && typeof style1 === 'object' && style2 && typeof style2 === 'object') {
      return Object.assign({}, style1, style2);
    }
    return objectToString(style1) + objectToString(style2);
  }
  filterObj(obj) {
    for (let _v in obj) {
      if (obj[_v] === '') {
        delete obj[_v];
      }
    }
    return obj;
  }
}