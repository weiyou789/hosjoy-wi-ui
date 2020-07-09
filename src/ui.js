/**
 * Created by admin on 2020/6/11.
 */
import Taro from '@tarojs/taro'

Taro.initPxTransform({ designWidth: 750 })

export { default as WiTabs } from './components/tabs'
export { default as WiTabsPane } from './components/tabs-pane'
export { default as WiButton} from './components/button'
export { default as WiCountdown} from './components/countdown'
export { default as WiInputNumber} from './components/input-number'
export { default as WiProgress} from './components/progress'
export { default as WiFloatLayout} from './components/float-layout'
export { default as WiDrawer} from './components/drawer'
export { default as WiList} from './components/list'
export { default as WiListItem} from './components/list/item'
export { default as WiIndexes} from './components/indexes'
export { default as WiActionSheet} from './components/action-sheet'
export { default as WiImagePicker} from './components/image-picker'
export { default as WiModal} from './components/modal'
export { default as WiModalHeader } from './components/modal/header'
export { default as WiModalContent } from './components/modal/content'
export { default as WiModalAction } from './components/modal/action'
export { default as WiPicker} from './components/picker'

/* 私有的组件  */
// export { default as AtLoading } from './components/loading'
