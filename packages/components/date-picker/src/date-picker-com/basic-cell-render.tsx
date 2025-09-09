import { defineComponent, inject, renderSlot } from 'vue'
import { useNamespace } from '@element-plus/hooks'
import { ROOT_PICKER_INJECTION_KEY } from '../constants'
import { basicCellProps } from '../props/basic-cell'

export default defineComponent({
  name: 'ElDatePickerCell',
  props: basicCellProps,
  setup(props) {
    const ns = useNamespace('date-table-cell')
    const { slots } = inject(ROOT_PICKER_INJECTION_KEY)!
    return () => {
      const { cell, cellSelectorPrefix } = props

      const baseText = String(
        cell?.renderText ?? cell?.text ?? ''
      ).toLowerCase()
      const dataDate = cellSelectorPrefix
        ? `${cellSelectorPrefix}_${baseText}`
        : baseText

      return renderSlot(slots, 'default', { ...cell }, () => [
        <div class={ns.b()} data-date={dataDate}>
          <span class={ns.e('text')}>{cell?.renderText ?? cell?.text}</span>
        </div>,
      ])
    }
  },
})
