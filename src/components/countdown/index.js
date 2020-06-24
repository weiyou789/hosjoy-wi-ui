
import Taro from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'

const toMillSeconds = (date) => Math.floor(new Date(date).getTime())

export default class WiCountdown extends WiComponent {

    constructor(props){
        super(props)
        const {
            endTime,
        } = this.props
        this._endTime = endTime
        const { day, hours, minutes, seconds, milliseconds } = this.calculateTime()
        this._count = 0
        this.state = {
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        }
        this.timer = null
    }

    calculateTime(){
        let [day, hours, minutes, seconds,milliseconds] = [0, 0, 0, 0, 0]
        let _endTime,_startTime,_count
        _startTime = toMillSeconds(new Date())
        _endTime = toMillSeconds(this._endTime)
        _count =  this._count = _endTime -_startTime

        /*if(typeof this._endTime === "number"){//时间差兼容
            _startTime = 0
            _endTime = this._endTime
            _count =  this._count
        } else {
            _startTime = toMillSeconds(new Date())
            _endTime = toMillSeconds(this._endTime)
            _count =  this._count = _endTime -_startTime
        }*/

        if(_count>0){
            day = this.props.isShowDay ? Math.floor(_count/1000 / (60 * 60 * 24)) : 0
            hours = Math.floor(_count/1000 / (60 * 60)) - (day * 24)
            minutes = Math.floor(_count/1000 / 60) - (day * 24 * 60) - (hours * 60)
            seconds = Math.floor(_count/1000) - (day * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)
            milliseconds = Math.floor(_count % 1000/100)
        }

        return {
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        }
    }

    countdown(){
        const { day, hours, minutes, seconds, milliseconds } = this.calculateTime()
        this.setState({
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        })

        /*if(typeof this._endTime === "number"){//时间差兼容
            this._count-=100
        }*/

        if (this._count < 100) {
            clearTimeout(this.timer)
            this.props.onTimeUp()
            return
        }

        this.timer = setTimeout(() => {
            this.countdown()
        }, 100)
    }

    renderTime(num,separator){
        return (
            <View className='wi-countdown__item'>
                <View className='wi-countdown__time-box'>
                    <Text className='at-countdown__time'>
                        {num<=9?`0${num}`:num}
                    </Text>
                </View>
                <Text className='wi-countdown__separator'>{separator}</Text>
            </View>
        )
    }

    componentDidMount(){
        if (!this.timer) this.countdown()
    }

    componentWillReceiveProps(nextProps){
        if (JSON.stringify(this.props) === JSON.stringify(nextProps)) return
        const { endTime } = nextProps
        clearTimeout(this.timer)
        this._endTime = endTime
        this.countdown()
    }

    render(){
        const {
            className,
            customStyle,
            format,
            isShowDay
        } =  this.props
        const {
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        } = this.state
        return (
            <View
                className={
                    classNames({
                        'wi-countdown': true,
                        // 'at-countdown--card': isCard
                    }, className)}
                style={customStyle}
            >
                {isShowDay&&this.renderTime(day,format.day)}
                {this.renderTime(hours,format.hours)}
                {this.renderTime(minutes,format.minutes)}
                {this.renderTime(seconds,format.seconds)}
                {this.renderTime(milliseconds,'')}
            </View>
        )
    }

}

WiCountdown.defaultProps = {
    className:'',
    customStyle:'',
    isShowDay:false,
    format: {
        day: ':',
        hours: ':',
        minutes: ':',
        seconds: ':'
    },
    endTime:new Date(),
    countTime:0,
    onTimeUp () {}
}

WiCountdown.PropTypes = {
    customStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
    format: PropTypes.object,
    isShowDay: PropTypes.bool,
    endTime: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        // PropTypes.number
    ]),
    countTime:PropTypes.number,
    onTimeUp: PropTypes.func,
}