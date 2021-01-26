/**
 * Created by admin on 2020/6/22.
 */
import Taro from '@tarojs/taro'
import { View,Picker } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'

export default class WiPicker extends WiComponent{
    constructor(props){
        super(props)
        this.state = {
            _lists:[],
            _value:[0,0,0],
            _val:0
        }
        this.timer = null
    }

    componentDidMount(){
        const { value,mode,list } = this.props
        if(mode==='selector'){
            this.setState({
                _val:value
            })
        } else if(mode==='multiSelector'){
            this.initList(list,value[0])
        }
    }


    componentWillReceiveProps(nextProps){
        const { value,mode,list } = nextProps
        if(this.props.value===value){
            return
        }
        if(mode==='selector'){
            this.setState({
                _val:value
            })
        } else if(mode==='multiSelector'){
            this.initList(list,value[0])
            /*this.setState({
                _value:value
            })*/
        }
    }

    initList(list,j){
        let arr = []
        this.listArrs = []
        const { value } = this.props
        for(let i = 0;i<list.length;i++){
            if(i===j&&list[j].children&&list[j].children.length>0){
                this.initList(list[i].children,j)
            }
            arr.push(list[i])
        }
        this.listArrs.push(arr)
        if(!this.timer){
            this.timer = setTimeout(()=>{
                this.setState({
                    _lists:this.listArrs.reverse(),
                },()=>{
                    if(value.length>0){
                        this.setState({
                            _value:value
                        })
                    }
                    clearTimeout(this.timer)

                })

            })

        }

    }

    onChange(e){
        const {value} = e.detail
        const { confirmClick,mode } = this.props
        const { _value,_lists } = this.state
        if(mode==='selector'){
            confirmClick(+value)
        } else if(mode==='multiSelector') {
            let currentValue = []
            for(let i = 0;i<_value.length;i++){
                currentValue[i] = Object.assign(_lists[i][_value[i]],{index:_value[i]})
            }
            confirmClick(currentValue)
        }
    }

    onChangeTime(e){
        const { confirmClick } = this.props
        confirmClick(e)
    }

    onColumnChange(e){
        this.makeList(e.detail)
    }

    makeList(detail){
        const { column,value } = detail
        const { _lists,_value } = this.state
        let listValue = _lists[column][value]
        let len = _lists.length
        let i = column
        while (i<len){
            if(listValue.children&&listValue.children.length>0){
                _lists[i+1] = listValue.children
                _value[i+1] = 0
                listValue = _lists[i+1][0]
            }
            i++
        }
        _value[column] = value
        this.setState({
            _value,
            _lists,
        })
    }


    render(){
        const { mode,rangeKey,start,end,list } = this.props
        const { _lists } = this.state
        if(mode==='date'||mode==='time'){
            return <Picker
                mode={mode}
                start={start}
                end={end}
                onChange={this.onChangeTime}
            >
                {this.props.children}
            </Picker>
        }
        if(mode==='selector'){
            return <Picker
                mode={mode}
                value={this.state._val}
                onChange={this.onChange}
                range={list}
            >
                {this.props.children}
            </Picker>
        }
        return <Picker
            mode={mode}
            start={start}
            end={end}
            range={_lists}
            onChange={this.onChange}
            onColumnChange={this.onColumnChange}
            value={this.state._value}
            range-key={rangeKey}
        >
            {this.props.children}
        </Picker>

    }
}

WiPicker.defaultProps = {
    mode:'multiSelector',
    list:[],
    rangeKey:'label',
    confirmClick(){},
    start:'2015-09-01',
    end:'2020-09-01',
    value:[0,0,0]
}

WiPicker.PropTypes = {
    mode:PropTypes.oneOf(['selector', 'multiSelector','time','date','region']),
    list:PropTypes.array,
    confirmClick:PropTypes.func,
    rangeKey:PropTypes.string,
    start:PropTypes.string,
    end:PropTypes.string,
    value:PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
    ])
}
