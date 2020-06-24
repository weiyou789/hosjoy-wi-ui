/**
 * Created by admin on 2020/6/12.
 */
import Taro from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WiComponent from '../../common/component'
import { uuid } from '../../common/utils'

// 生成 jsx 二维数组
const generateMatrix = (files, col, showAddBtn) => {
    const matrix = []
    const length = showAddBtn ? files.length + 1 : files.length
    const row = Math.ceil(length / col)
    for (let i = 0; i < row; i++) {
        if (i === row - 1) {
            // 最后一行数据加上添加按钮
            const lastArr = files.slice(i * col)
            if (lastArr.length < col) {
                if (showAddBtn) {
                    lastArr.push({ type: 'btn', uuid: uuid() })
                }
                // 填补剩下的空列
                for (let j = lastArr.length; j < col; j++) {
                    lastArr.push({ type: 'blank', uuid: uuid() })
                }
            }
            matrix.push(lastArr)
        } else {
            matrix.push(files.slice(i * col, (i + 1) * col))
        }
    }
    return matrix
}

const ENV = Taro.getEnv()

export default class WiImagePicker extends WiComponent{

    handleRemoveImg(){

    }

    handleImageClick(){

    }

    chooseFile = () => {

    }

    render(){
        const {
            className,
            customStyle,
            files,
            mode,
            length,
            showAddBtn
        } = this.props
        const matrix = generateMatrix(files, length, showAddBtn)
        const rootCls = classNames('wi-image-picker', className)

        return <View className={rootCls} style={customStyle}>
            {matrix.map((row, i) => (
                <View className='wi-image-picker__flex-box' key={i + 1}>
                    {row.map((item, j) => (
                        item.url
                            ? <View className='wi-image-picker__flex-item' key={(i * length) + j}>
                                <View className='wi-image-picker__item'>
                                    <View
                                        className='wi-image-picker__remove-btn'
                                        onClick={this.handleRemoveImg.bind(this, (i * length) + j)}
                                    />
                                    <Image
                                        className='wi-image-picker__preview-img'
                                        mode={mode}
                                        src={item.url}
                                        onClick={this.handleImageClick.bind(this, (i * length) + j)}
                                    />
                                </View>
                            </View>
                            : <View className='wi-image-picker__flex-item' key={(i * length) + j}>
                                {item.type === 'btn' && (
                                    <View
                                        className='wi-image-picker__item wi-image-picker__choose-btn'
                                        onClick={this.chooseFile}
                                    >
                                        <View className='add-bar' />
                                        <View className='add-bar' />
                                    </View>
                                )}
                            </View>
                    ))}
                </View>
            ))}
        </View>

    }
}

WiImagePicker.defaultProps = {
    isTest: false,
    className: '',
    customStyle: '',
    files: [],
    mode: 'aspectFill',
    showAddBtn: true,
    multiple: false,
    length: 4,
    onChange: () => {},
    onImageClick: () => {},
    onFail: () => {},
}


WiImagePicker.propTypes = {
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    customStyle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    isTest: PropTypes.bool,
    files: PropTypes.array,
    mode: PropTypes.oneOf([
        'scaleToFill',
        'aspectFit',
        'aspectFill',
        'widthFix',
        'top',
        'bottom',
        'center',
        'left',
        'right',
        'top left',
        'top right',
        'bottom left',
        'bottom right'
    ]),
    showAddBtn: PropTypes.bool,
    multiple: PropTypes.bool,
    length: PropTypes.number,
    onChange: PropTypes.func,
    onImageClick: PropTypes.func,
    onFail: PropTypes.func,
    count: PropTypes.number,
    sizeType: PropTypes.array,
    sourceType: PropTypes.array,
}
