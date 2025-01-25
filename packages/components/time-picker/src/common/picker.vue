<template>
  <el-tooltip
    ref="refPopper"
    :visible="pickerVisible"
    effect="light"
    pure
    trigger="click"
    v-bind="$attrs"
    role="dialog"
    teleported
    :transition="`${nsDate.namespace.value}-zoom-in-top`"
    :popper-class="[`${nsDate.namespace.value}-picker__popper`, popperClass]"
    :popper-options="elPopperOptions"
    :fallback-placements="fallbackPlacements"
    :gpu-acceleration="false"
    :placement="placement"
    :stop-popper-mouse-event="false"
    :hide-after="0"
    persistent
    @before-show="onBeforeShow"
    @show="onShow"
    @hide="onHide"
  >
    <template #default>
      <el-input
        v-if="!isRangeInput"
        :id="(id as string | undefined)"
        ref="inputRef"
        container-role="combobox"
        :model-value="(displayValue as string)"
        :name="name"
        :size="pickerSize"
        :disabled="pickerDisabled"
        :placeholder="placeholder"
        :class="[nsDate.b('editor'), nsDate.bm('editor', type), $attrs.class]"
        :style="$attrs.style"
        :readonly="
          !editable ||
          readonly ||
          isDatesPicker ||
          isMonthsPicker ||
          isYearsPicker ||
          type === 'week'
        "
        :aria-label="ariaLabel"
        :tabindex="tabindex"
        :validate-event="false"
        @input="onUserInput"
        @focus="handleFocusInput"
        @blur="handleBlurInput"
        @keydown="
          //
          handleKeydownInput as any
        "
        @change="handleChange"
        @mousedown="onMouseDownInput"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @touchstart.passive="onTouchStartInput"
        @click.stop
      >
        <template #prefix>
          <el-icon
            v-if="triggerIcon"
            :class="nsInput.e('icon')"
            @mousedown.prevent="onMouseDownInput"
            @touchstart.passive="onTouchStartInput"
          >
            <component :is="triggerIcon" />
          </el-icon>
        </template>
        <template #suffix>
          <el-icon
            v-if="showClose && clearIcon"
            :class="`${nsInput.e('icon')} clear-icon`"
            @click.stop="onClearIconClick"
          >
            <component :is="clearIcon" />
          </el-icon>
        </template>
      </el-input>
      <div
        v-else
        ref="inputRef"
        :class="rangeInputKls"
        :style="($attrs.style as any)"
        @click="handleFocusInput"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @touchstart.passive="onTouchStartInput"
        @keydown="handleKeydownInput"
      >
        <el-icon
          v-if="triggerIcon"
          :class="[nsInput.e('icon'), nsRange.e('icon')]"
          @mousedown.prevent="onMouseDownInput"
          @touchstart.passive="onTouchStartInput"
        >
          <!-- <component :is="triggerIcon" /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_7038_14345)">
              <path
                d="M2.45312 15.1992H13.125C14.7578 15.1992 15.5703 14.3867 15.5703 12.7774V3.23828C15.5703 1.62891 14.7578 0.816406 13.125 0.816406H2.45312C0.820312 0.816406 0 1.62109 0 3.23828V12.7774C0 14.3946 0.820312 15.1992 2.45312 15.1992ZM2.33594 13.9414C1.64062 13.9414 1.25781 13.5742 1.25781 12.8477V5.48047C1.25781 4.76172 1.64062 4.38672 2.33594 4.38672H13.2266C13.9219 4.38672 14.3125 4.76172 14.3125 5.48047V12.8477C14.3125 13.5742 13.9219 13.9414 13.2266 13.9414H2.33594ZM6.26562 7.1914H6.72656C7 7.1914 7.08594 7.11328 7.08594 6.83984V6.3789C7.08594 6.10547 7 6.01953 6.72656 6.01953H6.26562C5.99219 6.01953 5.89844 6.10547 5.89844 6.3789V6.83984C5.89844 7.11328 5.99219 7.1914 6.26562 7.1914ZM8.85938 7.1914H9.32031C9.59375 7.1914 9.6875 7.11328 9.6875 6.83984V6.3789C9.6875 6.10547 9.59375 6.01953 9.32031 6.01953H8.85938C8.58594 6.01953 8.49219 6.10547 8.49219 6.3789V6.83984C8.49219 7.11328 8.58594 7.1914 8.85938 7.1914ZM11.4531 7.1914H11.9141C12.1875 7.1914 12.2812 7.11328 12.2812 6.83984V6.3789C12.2812 6.10547 12.1875 6.01953 11.9141 6.01953H11.4531C11.1797 6.01953 11.0938 6.10547 11.0938 6.3789V6.83984C11.0938 7.11328 11.1797 7.1914 11.4531 7.1914ZM3.67188 9.74609H4.125C4.40625 9.74609 4.49219 9.66797 4.49219 9.39453V8.93359C4.49219 8.66016 4.40625 8.58203 4.125 8.58203H3.67188C3.39062 8.58203 3.30469 8.66016 3.30469 8.93359V9.39453C3.30469 9.66797 3.39062 9.74609 3.67188 9.74609ZM6.26562 9.74609H6.72656C7 9.74609 7.08594 9.66797 7.08594 9.39453V8.93359C7.08594 8.66016 7 8.58203 6.72656 8.58203H6.26562C5.99219 8.58203 5.89844 8.66016 5.89844 8.93359V9.39453C5.89844 9.66797 5.99219 9.74609 6.26562 9.74609ZM8.85938 9.74609H9.32031C9.59375 9.74609 9.6875 9.66797 9.6875 9.39453V8.93359C9.6875 8.66016 9.59375 8.58203 9.32031 8.58203H8.85938C8.58594 8.58203 8.49219 8.66016 8.49219 8.93359V9.39453C8.49219 9.66797 8.58594 9.74609 8.85938 9.74609ZM11.4531 9.74609H11.9141C12.1875 9.74609 12.2812 9.66797 12.2812 9.39453V8.93359C12.2812 8.66016 12.1875 8.58203 11.9141 8.58203H11.4531C11.1797 8.58203 11.0938 8.66016 11.0938 8.93359V9.39453C11.0938 9.66797 11.1797 9.74609 11.4531 9.74609ZM3.67188 12.3086H4.125C4.40625 12.3086 4.49219 12.2227 4.49219 11.9492V11.4883C4.49219 11.2149 4.40625 11.1367 4.125 11.1367H3.67188C3.39062 11.1367 3.30469 11.2149 3.30469 11.4883V11.9492C3.30469 12.2227 3.39062 12.3086 3.67188 12.3086ZM6.26562 12.3086H6.72656C7 12.3086 7.08594 12.2227 7.08594 11.9492V11.4883C7.08594 11.2149 7 11.1367 6.72656 11.1367H6.26562C5.99219 11.1367 5.89844 11.2149 5.89844 11.4883V11.9492C5.89844 12.2227 5.99219 12.3086 6.26562 12.3086ZM8.85938 12.3086H9.32031C9.59375 12.3086 9.6875 12.2227 9.6875 11.9492V11.4883C9.6875 11.2149 9.59375 11.1367 9.32031 11.1367H8.85938C8.58594 11.1367 8.49219 11.2149 8.49219 11.4883V11.9492C8.49219 12.2227 8.58594 12.3086 8.85938 12.3086Z"
                fill="#908FA0"
              />
            </g>
            <defs>
              <clipPath id="clip0_7038_14345">
                <rect
                  width="15.9766"
                  height="14.3984"
                  fill="white"
                  transform="translate(0 0.800781)"
                />
              </clipPath>
            </defs>
          </svg>
        </el-icon>
        <input
          v-if="!isMinusMinusInfinity && !isMinusPlusInfinity"
          :id="id && id[0]"
          autocomplete="off"
          :name="name && name[0]"
          :placeholder="startPlaceholder"
          :value="displayValue && displayValue[0]"
          :disabled="pickerDisabled"
          :readonly="!editable || readonly"
          :class="[nsRange.b('input')]"
          @mousedown="onMouseDownInput"
          @input="handleStartInput"
          @change="handleStartChange"
          @focus="handleFocusInput"
          @blur="handleBlurInput"
        />
        <input
          v-else-if="isMinusPlusInfinity"
          id="infinity_minus"
          autocomplete="off"
          :name="name && name[0]"
          :placeholder="startPlaceholder"
          value="+&infin;"
          :disabled="pickerDisabled"
          :readonly="!editable || readonly"
          :class="nsRange.b('input')"
          @mousedown="onMouseDownInput"
          @input="handleStartInput"
          @change="handleStartChange"
          @focus="handleFocusInput"
          @blur="handleBlurInput"
        />
        <input
          v-else
          id="infinity_minus"
          autocomplete="off"
          :name="name && name[0]"
          :placeholder="startPlaceholder"
          value="-&infin;"
          :disabled="pickerDisabled"
          :readonly="!editable || readonly"
          :class="nsRange.b('input')"
          @mousedown="onMouseDownInput"
          @input="handleStartInput"
          @change="handleStartChange"
          @focus="handleFocusInput"
          @blur="handleBlurInput"
        />
        <slot name="range-separator">
          <span :class="nsRange.b('separator')">{{ rangeSeparator }}</span>
        </slot>
        <input
          v-if="!isPlusPlusInfinity && !isPlusMinusInfinity"
          :id="id && id[1]"
          autocomplete="off"
          :name="name && name[1]"
          :placeholder="endPlaceholder"
          :value="displayValue && displayValue[1]"
          :disabled="pickerDisabled"
          :readonly="!editable || readonly"
          :class="[nsRange.b('input')]"
          @mousedown="onMouseDownInput"
          @focus="handleFocusInput"
          @blur="handleBlurInput"
          @input="handleEndInput"
          @change="handleEndChange"
        />
        <input
          v-else-if="isPlusMinusInfinity"
          :id="id && id[1]"
          autocomplete="off"
          :name="name && name[1]"
          :placeholder="endPlaceholder"
          value="-&infin;"
          :disabled="pickerDisabled"
          :readonly="!editable || readonly"
          :class="nsRange.b('input')"
          @mousedown="onMouseDownInput"
          @focus="handleFocusInput"
          @blur="handleBlurInput"
          @input="handleEndInput"
          @change="handleEndChange"
        />
        <input
          v-else
          :id="id && id[1]"
          autocomplete="off"
          :name="name && name[1]"
          :placeholder="endPlaceholder"
          value="+&infin;"
          :disabled="pickerDisabled"
          :readonly="!editable || readonly"
          :class="nsRange.b('input')"
          @mousedown="onMouseDownInput"
          @focus="handleFocusInput"
          @blur="handleBlurInput"
          @input="handleEndInput"
          @change="handleEndChange"
        />
        <el-icon
          v-if="clearIcon"
          :class="clearIconKls"
          @click="onClearIconClick"
        >
          <component :is="clearIcon" />
        </el-icon>
      </div>
    </template>
    <template #content>
      <slot
        :visible="pickerVisible"
        :actual-visible="pickerActualVisible"
        :parsed-value="parsedValue"
        :format="format"
        :date-format="dateFormat"
        :time-format="timeFormat"
        :unlink-panels="unlinkPanels"
        :type="type"
        :default-value="defaultValue"
        @pick="onPick"
        @select-range="setSelectionRange"
        @set-picker-option="onSetPickerOption"
        @calendar-change="onCalendarChange"
        @panel-change="onPanelChange"
        @keydown="onKeydownPopperContent"
        @mousedown.stop
      />
    </template>
  </el-tooltip>
</template>
<script lang="ts" setup>
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  provide,
  ref,
  unref,
  useAttrs,
  watch,
} from 'vue'
import { isEqual } from 'lodash-unified'
import { onClickOutside } from '@vueuse/core'
import dayjs from 'dayjs'
import { useEmptyValues, useLocale, useNamespace } from '@element-plus/hooks'
import { useFormItem, useFormSize } from '@element-plus/components/form'
import ElInput from '@element-plus/components/input'
import ElIcon from '@element-plus/components/icon'
import ElTooltip from '@element-plus/components/tooltip'
import { debugWarn, isArray } from '@element-plus/utils'
import { EVENT_CODE } from '@element-plus/constants'
import { Calendar, Clock } from '@element-plus/icons-vue'
import { formatter, parseDate, valueEquals } from '../utils'
import { timePickerDefaultProps } from './props'

import type { Dayjs } from 'dayjs'
import type { ComponentPublicInstance } from 'vue'
import type { Options } from '@popperjs/core'
import type {
  DateModelType,
  DateOrDates,
  DayOrDays,
  PickerOptions,
  SingleOrRange,
  TimePickerDefaultProps,
  UserInput,
} from './props'
import type { TooltipInstance } from '@element-plus/components/tooltip'
// Date object and string

defineOptions({
  name: 'Picker',
})

const props = defineProps(timePickerDefaultProps)
const emit = defineEmits([
  'update:modelValue',
  'change',
  'focus',
  'blur',
  'clear',
  'calendar-change',
  'panel-change',
  'visible-change',
  'keydown',
])
const attrs = useAttrs()

const { lang } = useLocale()

const nsDate = useNamespace('date')
const nsInput = useNamespace('input')
const nsRange = useNamespace('range')
const isPlusPlusInfinity = ref(false)
const isPlusMinusInfinity = ref(false)
const isMinusMinusInfinity = ref(false)
const isMinusPlusInfinity = ref(false)

const { form, formItem } = useFormItem()
const elPopperOptions = inject('ElPopperOptions', {} as Options)
const { valueOnClear } = useEmptyValues(props, null)

const refPopper = ref<TooltipInstance>()
const inputRef = ref<HTMLElement | ComponentPublicInstance>()
const pickerVisible = ref(false)
const pickerActualVisible = ref(false)
const valueOnOpen = ref<TimePickerDefaultProps['modelValue'] | null>(null)

let hasJustTabExitedInput = false
let ignoreFocusEvent = false

const rangeInputKls = computed(() => [
  nsDate.b('editor'),
  nsDate.bm('editor', props.type),
  nsInput.e('wrapper'),
  nsDate.is('disabled', pickerDisabled.value),
  nsDate.is('active', pickerVisible.value),
  nsRange.b('editor'),
  pickerSize ? nsRange.bm('editor', pickerSize.value) : '',
  attrs.class,
])

const clearIconKls = computed(() => [
  nsInput.e('icon'),
  nsRange.e('close-icon'),
  !showClose.value ? nsRange.e('close-icon--hidden') : '',
])

watch(pickerVisible, (val) => {
  if (!val) {
    userInput.value = null
    nextTick(() => {
      emitChange(props.modelValue)
    })
  } else {
    nextTick(() => {
      if (val) {
        valueOnOpen.value = props.modelValue
      }
    })
  }
})

watch(
  () => props.modelValue,
  (val) => {
    if (!isArray(val)) {
      isPlusPlusInfinity.value = false
      isMinusMinusInfinity.value = false
      isPlusMinusInfinity.value = false
      isMinusPlusInfinity.value = false
      return
    }
    isPlusPlusInfinity.value =
      dayjs(val[1]).get('year') >= new Date(9999, 11, 31).getFullYear()

    isPlusMinusInfinity.value =
      dayjs(val[1]).get('year') <= new Date(0, 11, 31).getFullYear()

    isMinusMinusInfinity.value =
      dayjs(val[0]).get('year') <= new Date(0, 11, 31).getFullYear()

    isMinusPlusInfinity.value =
      dayjs(val[0]).get('year') >= new Date(9999, 11, 31).getFullYear()
  },
  {
    immediate: true,
  }
)

const emitChange = (
  val: TimePickerDefaultProps['modelValue'] | null,
  isClear?: boolean
) => {
  // determine user real change only
  if (isClear || !valueEquals(val, valueOnOpen.value)) {
    emit('change', val)
    props.validateEvent &&
      formItem?.validate('change').catch((err) => debugWarn(err))
  }
}
const emitInput = (input: SingleOrRange<DateModelType | Dayjs> | null) => {
  if (!valueEquals(props.modelValue, input)) {
    let formatted
    if (isArray(input)) {
      formatted = input.map((item) => {
        return formatter(item, props.valueFormat, lang.value)
      })
    } else if (input) {
      formatted = formatter(input, props.valueFormat, lang.value)
    }

    if (isArray(input) && input.length === 2 && input[0] && input[1]) {
      const startDate = dayjs(input[0])
      const endDate = dayjs(input[1])

      isMinusMinusInfinity.value =
        startDate.get('year') <= new Date(0, 11, 31).getFullYear()

      isPlusPlusInfinity.value =
        endDate.get('year') >= new Date(9999, 11, 31).getFullYear()
    }
    emit('update:modelValue', input ? formatted : input, lang.value)
  }
}
const emitKeydown = (e: KeyboardEvent) => {
  emit('keydown', e)
}

const refInput = computed<HTMLInputElement[]>(() => {
  if (inputRef.value) {
    const _r = isRangeInput.value
      ? inputRef.value
      : (inputRef.value as any as ComponentPublicInstance).$el
    return Array.from<HTMLInputElement>(_r.querySelectorAll('input'))
  }
  return []
})

const setSelectionRange = (start: number, end: number, pos?: 'min' | 'max') => {
  const _inputs = refInput.value
  if (!_inputs.length) return
  if (!pos || pos === 'min') {
    _inputs[0].setSelectionRange(start, end)
    _inputs[0].focus()
  } else if (pos === 'max') {
    _inputs[1].setSelectionRange(start, end)
    _inputs[1].focus()
  }
}
const focusOnInputBox = () => {
  focus(true, true)
  nextTick(() => {
    ignoreFocusEvent = false
  })
}

const onPick = (date: any = '', visible = false) => {
  if (!visible) {
    ignoreFocusEvent = true
  }
  pickerVisible.value = visible
  let result
  if (isArray(date)) {
    result = date.map((_) => _.toDate())
  } else {
    // clear btn emit null
    result = date ? date.toDate() : date
  }
  userInput.value = null
  emitInput(result)
}

const onBeforeShow = () => {
  pickerActualVisible.value = true
}

const onShow = () => {
  emit('visible-change', true)
}

const onKeydownPopperContent = (event: KeyboardEvent) => {
  if ((event as KeyboardEvent)?.key === EVENT_CODE.esc) {
    focus(true, true)
  }
}

const onHide = () => {
  pickerActualVisible.value = false
  pickerVisible.value = false
  ignoreFocusEvent = false
  emit('visible-change', false)
}

const handleOpen = () => {
  pickerVisible.value = true
}

const handleClose = () => {
  pickerVisible.value = false
}

const focus = (focusStartInput = true, isIgnoreFocusEvent = false) => {
  ignoreFocusEvent = isIgnoreFocusEvent
  const [leftInput, rightInput] = unref(refInput)
  let input = leftInput
  if (!focusStartInput && isRangeInput.value) {
    input = rightInput
  }
  if (input) {
    input.focus()
  }
}

const handleFocusInput = (e?: FocusEvent) => {
  if (
    props.readonly ||
    pickerDisabled.value ||
    pickerVisible.value ||
    ignoreFocusEvent
  ) {
    return
  }
  pickerVisible.value = true
  emit('focus', e)
}

let currentHandleBlurDeferCallback:
  | (() => Promise<void> | undefined)
  | undefined = undefined

// Check if document.activeElement is inside popper or any input before popper close
const handleBlurInput = (e?: FocusEvent) => {
  const handleBlurDefer = async () => {
    setTimeout(() => {
      if (currentHandleBlurDeferCallback === handleBlurDefer) {
        if (
          !(
            refPopper.value?.isFocusInsideContent() && !hasJustTabExitedInput
          ) &&
          refInput.value.filter((input) => {
            return input.contains(document.activeElement)
          }).length === 0
        ) {
          handleChange()
          pickerVisible.value = false
          emit('blur', e)
          props.validateEvent &&
            formItem?.validate('blur').catch((err) => debugWarn(err))
        }
        hasJustTabExitedInput = false
      }
    }, 0)
  }
  currentHandleBlurDeferCallback = handleBlurDefer
  handleBlurDefer()
}

const pickerDisabled = computed(() => {
  return props.disabled || form?.disabled
})

const parsedValue = computed(() => {
  let dayOrDays: DayOrDays
  if (valueIsEmpty.value) {
    if (pickerOptions.value.getDefaultValue) {
      dayOrDays = pickerOptions.value.getDefaultValue()
    }
  } else {
    if (isArray(props.modelValue)) {
      dayOrDays = props.modelValue.map((d) =>
        parseDate(d, props.valueFormat, lang.value)
      ) as [Dayjs, Dayjs]
    } else {
      dayOrDays = parseDate(props.modelValue, props.valueFormat, lang.value)!
    }
  }

  if (pickerOptions.value.getRangeAvailableTime) {
    const availableResult = pickerOptions.value.getRangeAvailableTime(
      dayOrDays!
    )
    if (!isEqual(availableResult, dayOrDays!)) {
      dayOrDays = availableResult

      // The result is corrected only when model-value exists
      if (!valueIsEmpty.value) {
        emitInput(
          (isArray(dayOrDays)
            ? dayOrDays.map((_) => _.toDate())
            : dayOrDays.toDate()) as SingleOrRange<Date>
        )
      }
    }
  }
  if (isArray(dayOrDays!) && dayOrDays.some((day) => !day)) {
    dayOrDays = [] as unknown as DayOrDays
  }
  return dayOrDays!
})

const displayValue = computed<UserInput>(() => {
  if (!pickerOptions.value.panelReady) return ''
  const formattedValue = formatDayjsToString(parsedValue.value)
  if (isArray(userInput.value)) {
    return [
      userInput.value[0] || (formattedValue && formattedValue[0]) || '',
      userInput.value[1] || (formattedValue && formattedValue[1]) || '',
    ]
  } else if (userInput.value !== null) {
    return userInput.value
  }
  if (!isTimePicker.value && valueIsEmpty.value) return ''
  if (!pickerVisible.value && valueIsEmpty.value) return ''
  if (formattedValue) {
    return isDatesPicker.value || isMonthsPicker.value || isYearsPicker.value
      ? (formattedValue as Array<string>).join(', ')
      : formattedValue
  }
  return ''
})

const isTimeLikePicker = computed(() => props.type.includes('time'))

const isTimePicker = computed(() => props.type.startsWith('time'))

const isDatesPicker = computed(() => props.type === 'dates')

const isMonthsPicker = computed(() => props.type === 'months')

const isYearsPicker = computed(() => props.type === 'years')

const triggerIcon = computed(
  () => props.prefixIcon || (isTimeLikePicker.value ? Clock : Calendar)
)

const showClose = ref(false)

const onClearIconClick = (event: MouseEvent) => {
  if (props.readonly || pickerDisabled.value) return
  if (showClose.value) {
    event.stopPropagation()
    focusOnInputBox()
    // When the handleClear Function was provided, emit null will be executed inside it
    // There is no need for us to execute emit null twice. #14752
    if (pickerOptions.value.handleClear) {
      pickerOptions.value.handleClear()
    } else {
      emitInput(valueOnClear.value)
    }
    emitChange(valueOnClear.value, true)
    // showClose.value = false
    onHide()
  }

  // if input is already empty, set date to [0, 9999] and is range picker
  if (valueIsEmpty.value && isRangeInput.value) {
    // isPlusPlusInfinity.value = true
    // isMinusMinusInfinity.value = true
    // emitInput([new Date(0, 11, 31), new Date(9999, 11, 31)])
  } else {
    isPlusPlusInfinity.value = false
    isMinusMinusInfinity.value = false
    emit('clear')
  }
}

const valueIsEmpty = computed(() => {
  const { modelValue } = props
  return (
    !modelValue || (isArray(modelValue) && !modelValue.filter(Boolean).length)
  )
})

const onMouseDownInput = async (event: MouseEvent) => {
  if (props.readonly || pickerDisabled.value) return
  if (
    (event.target as HTMLElement)?.tagName !== 'INPUT' ||
    refInput.value.includes(document.activeElement as HTMLInputElement)
  ) {
    pickerVisible.value = true
  }
}
const onMouseEnter = () => {
  if (props.readonly || pickerDisabled.value) return
  if (!valueIsEmpty.value && props.clearable) {
    showClose.value = true
  }
}
const onMouseLeave = () => {
  showClose.value = false
}
const onTouchStartInput = (event: TouchEvent) => {
  if (props.readonly || pickerDisabled.value) return
  if (
    (event.touches[0].target as HTMLElement)?.tagName !== 'INPUT' ||
    refInput.value.includes(document.activeElement as HTMLInputElement)
  ) {
    pickerVisible.value = true
  }
}
const isRangeInput = computed(() => {
  return props.type.includes('range')
})

const pickerSize = useFormSize()

const popperEl = computed(() => unref(refPopper)?.popperRef?.contentRef)
const actualInputRef = computed(() => {
  if (unref(isRangeInput)) {
    return unref(inputRef)
  }

  return (unref(inputRef) as ComponentPublicInstance)?.$el
})

const stophandle = onClickOutside(actualInputRef, (e: PointerEvent) => {
  const unrefedPopperEl = unref(popperEl)
  const inputEl = unref(actualInputRef)
  if (
    (unrefedPopperEl &&
      (e.target === unrefedPopperEl ||
        e.composedPath().includes(unrefedPopperEl))) ||
    e.target === inputEl ||
    e.composedPath().includes(inputEl)
  )
    return
  pickerVisible.value = false
})

onBeforeUnmount(() => {
  stophandle?.()
})

const userInput = ref<UserInput>(null)

const handleChange = () => {
  if (userInput.value) {
    const value = parseUserInputToDayjs(displayValue.value)
    if (value) {
      if (isValidValue(value)) {
        emitInput(
          (isArray(value)
            ? value.map((_) => _.toDate())
            : value.toDate()) as DateOrDates
        )
        userInput.value = null
      }
    }
  }
  if (userInput.value === '') {
    emitInput(valueOnClear.value)
    emitChange(valueOnClear.value)
    userInput.value = null
  }
}

const parseUserInputToDayjs = (value: UserInput) => {
  if (!value) return null
  return pickerOptions.value.parseUserInput!(value)
}

const formatDayjsToString = (value: DayOrDays) => {
  // i want month year (ex: January 2022) to be displayed as is
  if (!value) return null

  // if (isArray(value)) {
  //   return value.map((date) => {
  //     return date.format('MMMM YYYY')
  //   })
  // }

  return pickerOptions.value.formatToString!(value)
}

const isValidValue = (value: DayOrDays) => {
  return pickerOptions.value.isValidValue!(value)
}

const handleKeydownInput = async (event: KeyboardEvent) => {
  if (props.readonly || pickerDisabled.value) return

  const { code } = event
  emitKeydown(event)
  if (code === EVENT_CODE.esc) {
    if (pickerVisible.value === true) {
      pickerVisible.value = false
      event.preventDefault()
      event.stopPropagation()
    }
    return
  }

  if (code === EVENT_CODE.down) {
    if (pickerOptions.value.handleFocusPicker) {
      event.preventDefault()
      event.stopPropagation()
    }
    if (pickerVisible.value === false) {
      pickerVisible.value = true
      await nextTick()
    }
    if (pickerOptions.value.handleFocusPicker) {
      pickerOptions.value.handleFocusPicker()
      return
    }
  }

  if (code === EVENT_CODE.tab) {
    hasJustTabExitedInput = true
    return
  }

  if (code === EVENT_CODE.enter || code === EVENT_CODE.numpadEnter) {
    if (
      userInput.value === null ||
      userInput.value === '' ||
      isValidValue(parseUserInputToDayjs(displayValue.value) as DayOrDays)
    ) {
      handleChange()
      pickerVisible.value = false
    }
    event.stopPropagation()
    return
  }

  // if user is typing, do not let picker handle key input
  if (userInput.value) {
    event.stopPropagation()
    return
  }
  if (pickerOptions.value.handleKeydownInput) {
    pickerOptions.value.handleKeydownInput(event)
  }
}
const onUserInput = (e: string) => {
  userInput.value = e
  // Temporary fix when the picker is dismissed and the input box
  // is focused, just mimic the behavior of antdesign.
  if (!pickerVisible.value) {
    pickerVisible.value = true
  }
}

const handleStartInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (userInput.value) {
    userInput.value = [target.value, userInput.value[1]]
  } else {
    userInput.value = [target.value, null]
  }
}

const handleEndInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (userInput.value) {
    userInput.value = [userInput.value[0], target.value]
  } else {
    userInput.value = [null, target.value]
  }
}

const handleStartChange = () => {
  const values = userInput.value as string[]
  const value = parseUserInputToDayjs(values && values[0]) as Dayjs
  const parsedVal = unref(parsedValue) as [Dayjs, Dayjs]
  if (value && value.isValid()) {
    userInput.value = [
      formatDayjsToString(value) as string,
      displayValue.value?.[1] || null,
    ]
    const newValue = [value, parsedVal && (parsedVal[1] || null)] as DayOrDays
    if (isValidValue(newValue)) {
      emitInput(newValue)
      userInput.value = null
    }
  }
}

const handleEndChange = () => {
  const values = unref(userInput) as string[]
  const value = parseUserInputToDayjs(values && values[1]) as Dayjs
  const parsedVal = unref(parsedValue) as [Dayjs, Dayjs]
  if (value && value.isValid()) {
    userInput.value = [
      unref(displayValue)?.[0] || null,
      formatDayjsToString(value) as string,
    ]
    const newValue = [parsedVal && parsedVal[0], value] as DayOrDays
    if (isValidValue(newValue)) {
      emitInput(newValue)
      userInput.value = null
    }
  }
}

const pickerOptions = ref<Partial<PickerOptions>>({})
const onSetPickerOption = <T extends keyof PickerOptions>(
  e: [T, PickerOptions[T]]
) => {
  pickerOptions.value[e[0]] = e[1]
  pickerOptions.value.panelReady = true
}

const onCalendarChange = (e: [Date, null | Date]) => {
  emit('calendar-change', e)
}

const onPanelChange = (
  value: [Dayjs, Dayjs],
  mode: 'month' | 'year',
  view: unknown
) => {
  emit('panel-change', value, mode, view)
}

provide('EP_PICKER_BASE', {
  props,
})

defineExpose({
  /**
   * @description focus input box.
   */
  focus,
  /**
   * @description emit focus event
   */
  handleFocusInput,
  /**
   * @description emit blur event
   */
  handleBlurInput,
  /**
   * @description opens picker
   */
  handleOpen,
  /**
   * @description closes picker
   */
  handleClose,
  /**
   * @description pick item manually
   */
  onPick,
})
</script>
