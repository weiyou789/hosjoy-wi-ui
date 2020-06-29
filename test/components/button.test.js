import Nerv, { findDOMNode } from 'nervjs'
import { renderToString } from 'nerv-server'
import { Simulate, renderIntoDocument } from 'nerv-test-utils'
import WiButton from '../../.temp/components/button/index'


describe('WiButton Snap', () => {
    it('render WiButton -- props size(normal)', () => {
        const component = renderToString(<WiButton size='normal'>按钮</WiButton>)
        expect(component).toMatchSnapshot()
    })
})

/*describe('AtButton Event', () => {
  it('AtButton onClick', () => {
    const onClick = jest.fn()

    const component = renderIntoDocument(
      <AtButton onClick={onClick}>按钮</AtButton>
    )
    const componentDom = findDOMNode(component, 'at-button')

    Simulate.click(componentDom)
    expect(onClick).toBeCalled()
  })

  it('AtButton disabled, onClick not to be called', () => {
    const onClick = jest.fn()

    const component = renderIntoDocument(
      <AtButton disabled onClick={onClick}>
        按钮
      </AtButton>
    )
    const componentDom = findDOMNode(component, 'at-button')

    Simulate.click(componentDom)
    expect(onClick).not.toBeCalled()
  })
})*/
