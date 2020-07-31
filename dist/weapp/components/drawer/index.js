import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'

export default class WiDrawer extends WiComponent {
    constructor(props){
        super(props)
        const { show } = this.props
        this.state = {
            animShow:false,
            _show:show
        }
    }
    componentDidMount(){
        const { show } = this.props
        if(show)this.animShow()
    }

    componentWillReceiveProps (nextProps) {
        const { show } = nextProps
        if (show !== this.state._show) {
            show ? this.animShow() : this.animHide()
        }
    }

    onMaskClick () {
        this.animHide()
    }

    animShow () {
        this.setState({ _show: true })
        setTimeout(() => {
            this.setState({
                animShow: true,
            })
        }, 200)
    }

    animHide () {
        const { onClose } = this.props
        this.setState({
            animShow: false,
        })
        setTimeout(() => {
            this.setState({ _show: false }, () => {
                onClose()
            })
        }, 300)
    }

    render(){
        const {
            mask,
            width,
            right,
            className
        } = this.props
        const {
            animShow,
            _show,
        } = this.state
        const rootClass = classNames(
            'wi-drawer',
            {
                'wi-drawer--show': animShow,
                'wi-drawer--right': right,
                'wi-drawer--left': !right,
            },
            className
        )
        const maskStyle = {
            display: mask ? 'block' : 'none',
            opacity: animShow ? 1 : 0,
        }
        const listStyle = {
            width,
            transition: animShow ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)' : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)',
        }

        return (
            _show && <View
                className={rootClass}
            >
                <View className='wi-drawer__mask' style={maskStyle} onClick={this.onMaskClick.bind(this)}></View>

                <View className='wi-drawer__content' style={listStyle}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}

WiDrawer.defaultProps = {
    show: false,
    mask: true,
    width: '',
    right: false,
    className: '',
    onClose(){}
}

WiDrawer.propTypes = {
    show: PropTypes.bool,
    mask: PropTypes.bool,
    width: PropTypes.string,
    right:PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
}