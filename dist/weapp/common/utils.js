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

export {
    uuid,
    isTest,
    debounce,
    handleTouchScroll
}