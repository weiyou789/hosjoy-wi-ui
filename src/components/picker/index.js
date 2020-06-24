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
            _value:[0,0,0]
        }
        this.listArrs = []
        const { list,mode } = this.props
        if(mode === 'multiSelector'){
            this.initList(list)
        }
    }


    componentWillReceiveProps(nextProps){
        const { list } = nextProps
        if (this.props.list !== list) {
            this.initList(list)
        }
    }

    initList(list){
        let arr = []
        for(let i = 0;i<list.length;i++){
            if(i===0&&list[i].children&&list[i].children.length>0){
                this.initList(list[i].children)
            }
            arr.push(list[i])
        }
        this.listArrs.push(arr)
        setTimeout(()=>{
            this.setState({
                _lists:this.listArrs.reverse()
            })
        })

    }

    onChange(e){
        const { confirmClick } = this.props
        const { _value,_lists } = this.state
        let currentValue = []
        for(let i = 0;i<_value.length;i++){
            currentValue[i] = _lists[i][_value[i]]
        }
        confirmClick(currentValue)
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
        const { mode,rangeKey } = this.props
        const { _lists } = this.state
        return <Picker
            mode={mode}
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
    confirmClick(){}
}

WiPicker.PropTypes = {
    mode:PropTypes.oneOf(['selector', 'multiSelector','time','date','region']),
    list:PropTypes.array,
    confirmClick:PropTypes.func,
    rangeKey:PropTypes.string
}
