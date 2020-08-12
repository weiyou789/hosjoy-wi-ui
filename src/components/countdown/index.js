
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
            countTime
        } = this.props
        this._endTime = endTime
        this._countTime = +countTime
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
        let _endTime,_startTime,_count,_countTime
        _startTime = toMillSeconds(new Date())
        _endTime = toMillSeconds(this._endTime)
        _count =  this._count = _endTime -_startTime
        _countTime = this._countTime

        if(_countTime>0){
            this._countTime-=100
            day = this.props.isShowDay ? Math.floor(_countTime/1000 / (60 * 60 * 24)) : 0
            hours = Math.floor(_countTime/1000 / (60 * 60)) - (day * 24)
            minutes = Math.floor(_countTime/1000 / 60) - (day * 24 * 60) - (hours * 60)
            seconds = Math.floor(_countTime/1000) - (day * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)
            milliseconds = Math.floor(_countTime % 1000/100)
        }

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

        if(this._countTime>0){
            if (this._countTime < 100) {
                clearTimeout(this.timer)
                this.props.onTimeUp()
                return
            }
        } else {
            if (this._count < 100) {
                clearTimeout(this.timer)
                this.props.onTimeUp()
                return
            }
        }



        this.timer = setTimeout(() => {
            this.countdown()
        }, 100)
    }

    renderTime(num,separator){
        const { classNameText } = this.props
        return (
            <View className='wi-countdown__item'>
                <View className='wi-countdown__time-box'>
                    <Text className={
                        classNames({
                            'wi-countdown__time':true,
                        },classNameText)}
                    >
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
        // if (JSON.stringify(this.props) === JSON.stringify(nextProps)) return
        const { endTime,countTime } = nextProps
        clearTimeout(this.timer)
        this._endTime = endTime
        this._countTime = +countTime
        this.countdown()
    }

    render(){
        const {
            className,
            customStyle,
            format,
            isShowDay,
            isShowMillSeconds,
            isShowSecondsFormat
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
                        'wi-countdown': true
                    }, className)}
                style={customStyle}
            >
                {isShowDay&&this.renderTime(day,format.day)}
                {this.renderTime(hours,format.hours)}
                {this.renderTime(minutes,format.minutes)}
                {this.renderTime(seconds,isShowSecondsFormat?format.seconds:'')}
                {isShowMillSeconds&&this.renderTime(milliseconds,'')}
            </View>
        )
    }

}

WiCountdown.defaultProps = {
    className:'',
    classNameText:'',
    customStyle:'',
    isShowDay:false,
    isShowMillSeconds:false,
    isShowSecondsFormat:false,
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
    classNameText: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
    format: PropTypes.object,
    isShowDay: PropTypes.bool,
    isShowMillSeconds: PropTypes.bool,
    isShowSecondsFormat:PropTypes.bool,
    endTime: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number
    ]),
    countTime:PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number
    ]),
    onTimeUp: PropTypes.func,
}
