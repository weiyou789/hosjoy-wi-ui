import Taro from '@tarojs/taro'

const ENV = Taro.getEnv()

function uuid() {
    return Date.parse(new Date())/1000
}

function isTest () {
    return process.env.NODE_ENV === 'test'
}

function debounce(func,wait,immediate) {
    let timeout,result
    return function () {
        let context = this
        let args = arguments
        if(timeout)clearTimeout(timeout)
        if(immediate){

            let callNow = !timeout
            timeout = setTimeout(function(){
                timeout =  null
            },wait)
            if(callNow){
                result = func.apply(context,args)
            }
        } else {

            timeout = setTimeout(function(){
                func.apply(context,args)
            },wait)
        }
        return result
    }
}

let scrollTop = 0

function handleTouchScroll (flag) {
    if (ENV !== Taro.ENV_TYPE.WEB) {
        return
    }
    if (flag&&document) {
        scrollTop = document.documentElement.scrollTop

        // 使body脱离文档流
        document.body.classList.add('at-frozen')

        // 把脱离文档流的body拉上去！否则页面会回到顶部！
        document.body.style.top = `${-scrollTop}px`
    } else {
        document.body.style.top = null
        document.body.classList.remove('at-frozen')

        document.documentElement.scrollTop = scrollTop
    }
}

function delay(delayTime = 500) {
    return new Promise(resolve => {
        if ([Taro.ENV_TYPE.WEB, Taro.ENV_TYPE.SWAN].includes(ENV)) {
            setTimeout(() => {
                resolve();
            }, delayTime);
            return;
        }
        resolve();
    });
}

function delayQuerySelector(self, selectorStr, delayTime = 500) {
    const $scope = ENV === Taro.ENV_TYPE.WEB ? self : self.$scope;
    const selector = Taro.createSelectorQuery().in($scope);
    return new Promise(resolve => {
        delay(delayTime).then(() => {
            selector.select(selectorStr).boundingClientRect().exec(res => {
                resolve(res);
            });
        });
    });
}
function delayGetScrollOffset({ delayTime = 500 }) {
    return new Promise(resolve => {
        delay(delayTime).then(() => {
            Taro.createSelectorQuery().selectViewport().scrollOffset().exec(res => {
                resolve(res);
            });
        });
    });
}
function delayGetClientRect({ self, selectorStr, delayTime = 500 }) {
    const $scope = ENV === Taro.ENV_TYPE.WEB || ENV === Taro.ENV_TYPE.SWAN ? self : self.$scope;
    const selector = Taro.createSelectorQuery().in($scope);
    return new Promise(resolve => {
        delay(delayTime).then(() => {
            selector.select(selectorStr).boundingClientRect().exec(res => {
                resolve(res);
            });
        });
    });
}

export {
    uuid,
    isTest,
    debounce,
    handleTouchScroll,
    delayQuerySelector,
    delayGetScrollOffset,
    delayGetClientRect
}