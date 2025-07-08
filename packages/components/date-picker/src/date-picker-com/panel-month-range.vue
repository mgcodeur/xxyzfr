<template>
  <div
    :class="[
      ppNs.b(),
      drpNs.b(),
      {
        'has-sidebar': Boolean($slots.sidebar) || hasShortcuts,
      },
    ]"
  >
    <div :class="ppNs.e('body-wrapper')">
      <slot name="sidebar" :class="ppNs.e('sidebar')" />
      <div v-if="hasShortcuts" :class="ppNs.e('sidebar')">
        <button
          v-for="(shortcut, key) in shortcuts"
          :key="key"
          type="button"
          :class="ppNs.e('shortcut')"
          @click="handleShortcutClick(shortcut)"
        >
          {{ shortcut.text }}
        </button>
      </div>
      <div :class="ppNs.e('body')">
        <div :class="[ppNs.e('content'), drpNs.e('content')]" class="is-left">
          <!-- <div :class="drpNs.e('header')">
            <button
              type="button"
              :class="ppNs.e('icon-btn')"
              class="d-arrow-left"
              @click="leftPrevYear"
            >
              <slot name="prev-year">
                <el-icon><d-arrow-left /></el-icon>
              </slot>
            </button>
            <button
              v-if="unlinkPanels"
              type="button"
              :disabled="!enableYearArrow"
              :class="[
                ppNs.e('icon-btn'),
                { [ppNs.is('disabled')]: !enableYearArrow },
              ]"
              class="d-arrow-right"
              @click="leftNextYear"
            >
              <slot name="next-year">
                <el-icon><d-arrow-right /></el-icon>
              </slot>
            </button>
            <div>{{ leftLabel }}</div>
          </div> -->

          <div :class="drpNs.e('header')">
            <div class="d-flex justify-content-between align-items-center m-0">
              <button
                :class="[
                  'minus-infinity-button',
                  { active: isMinusInfinity() },
                ]"
                @click="updateStartDate()"
              >
                -&infin;
              </button>

              <div class="d-flex m-0 align-items-center">
                <button
                  type="button"
                  :class="[ppNs.e('icon-btn'), 'm-0']"
                  @click="clickPrevYear()"
                >
                  <slot name="prev-year">
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.456248 6.00293C0.456248 5.76269 0.543747 5.56348 0.749998 5.37598L5.5625 0.963871C5.725 0.811521 5.91874 0.735352 6.15 0.735352C6.61874 0.735352 7 1.08691 7 1.52637C7 1.74902 6.9 1.94238 6.73125 2.10058L2.45625 6.00879L6.73125 9.90526C6.9 10.0635 7 10.2627 7 10.4795C7 10.919 6.61876 11.2647 6.15 11.2647C5.91874 11.2647 5.725 11.1944 5.5625 11.042L0.749998 6.62988C0.549998 6.44238 0.456248 6.24316 0.456248 6.00293Z"
                        fill="#908FA0"
                      />
                    </svg>
                  </slot>
                </button>

                <div class="me-0 el-start-label mx-px-12">
                  {{ getCustomLeftLabel }}
                </div>

                <button
                  type="button"
                  :class="[ppNs.e('icon-btn'), 'm-0']"
                  @click="clickNextPrevYear()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                  >
                    <path
                      d="M6.54375 5.99707C6.54375 6.23731 6.45625 6.43652 6.25 6.62402L1.4375 11.0361C1.275 11.1885 1.08126 11.2646 0.850002 11.2646C0.381256 11.2646 0 10.9131 0 10.4736C0 10.251 0.1 10.0576 0.26875 9.89942L4.54375 5.99121L0.26875 2.09474C0.1 1.93654 0 1.73734 0 1.52054C0 1.08104 0.381245 0.735339 0.850002 0.735339C1.08126 0.735339 1.275 0.805639 1.4375 0.958039L6.25 5.37012C6.45 5.55762 6.54375 5.75684 6.54375 5.99707Z"
                      fill="#908FA0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <month-table
            selection-mode="range"
            :date="leftDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
        <div :class="[ppNs.e('content'), drpNs.e('content')]" class="is-right">
          <div :class="drpNs.e('header')">
            <!-- <button
              v-if="unlinkPanels"
              type="button"
              :disabled="!enableYearArrow"
              :class="[ppNs.e('icon-btn'), { 'is-disabled': !enableYearArrow }]"
              class="d-arrow-left"
              @click="rightPrevYear"
            >
              <slot name="prev-year">
                <el-icon><d-arrow-left /></el-icon>
              </slot>
            </button>
            <button
              type="button"
              :class="ppNs.e('icon-btn')"
              class="d-arrow-right"
              @click="rightNextYear"
            >
              <slot name="next-year">
                <el-icon><d-arrow-right /></el-icon>
              </slot>
            </button>
            <div>{{ rightLabel }}</div> -->

            <div class="d-flex justify-content-between align-items-center m-0">
              <button
                :class="['plus-infinity-button', { active: isPlusInfinity() }]"
                @click="updateEndDate()"
              >
                +&infin;
              </button>
              <div class="d-flex m-0 align-items-center">
                <!-- TODO: new Method here -->
                <button
                  type="button"
                  :class="[ppNs.e('icon-btn'), 'm-0']"
                  @click="clickPrevNextYear()"
                >
                  <slot name="prev-year">
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.456248 6.00293C0.456248 5.76269 0.543747 5.56348 0.749998 5.37598L5.5625 0.963871C5.725 0.811521 5.91874 0.735352 6.15 0.735352C6.61874 0.735352 7 1.08691 7 1.52637C7 1.74902 6.9 1.94238 6.73125 2.10058L2.45625 6.00879L6.73125 9.90526C6.9 10.0635 7 10.2627 7 10.4795C7 10.919 6.61876 11.2647 6.15 11.2647C5.91874 11.2647 5.725 11.1944 5.5625 11.042L0.749998 6.62988C0.549998 6.44238 0.456248 6.24316 0.456248 6.00293Z"
                        fill="#908FA0"
                      />
                    </svg>
                  </slot>
                </button>

                <div class="ms-0 el-end-label mx-px-12">
                  {{ getCustomRightLabel }}
                </div>

                <button
                  type="button"
                  :class="[ppNs.e('icon-btn'), 'm-0']"
                  @click="clickNextYear()"
                >
                  <slot name="next-year">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                    >
                      <path
                        d="M6.54375 5.99707C6.54375 6.23731 6.45625 6.43652 6.25 6.62402L1.4375 11.0361C1.275 11.1885 1.08126 11.2646 0.850002 11.2646C0.381256 11.2646 0 10.9131 0 10.4736C0 10.251 0.1 10.0576 0.26875 9.89942L4.54375 5.99121L0.26875 2.09474C0.1 1.93654 0 1.73734 0 1.52054C0 1.08104 0.381245 0.735339 0.850002 0.735339C1.08126 0.735339 1.275 0.805639 1.4375 0.958039L6.25 5.37012C6.45 5.55762 6.54375 5.75684 6.54375 5.99707Z"
                        fill="#908FA0"
                      />
                    </svg>
                  </slot>
                </button>
              </div>
            </div>
          </div>
          <month-table
            selection-mode="range"
            :date="rightDate"
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-date="disabledDate"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
            @select="onSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, toRef, unref, watch } from 'vue'
import dayjs from 'dayjs'
// import ElIcon from '@element-plus/components/icon'
import { isArray } from '@element-plus/utils'
import { useLocale } from '@element-plus/hooks'
// import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { getDefaultValue, isValidRange } from '../utils'
import {
  panelMonthRangeEmits,
  panelMonthRangeProps,
} from '../props/panel-month-range'
import {
  useMontRangeHeaderInfinity,
  // useMonthRangeHeader,
} from '../composables/use-month-range-header'
import { useRangePicker } from '../composables/use-range-picker'
import MonthTable from './basic-month-table.vue'

import type { Dayjs } from 'dayjs'

defineOptions({
  name: 'DatePickerMonthRange',
})

const props = defineProps(panelMonthRangeProps)
const emit = defineEmits(panelMonthRangeEmits)
const unit = 'year'

const { lang } = useLocale()
const pickerBase = inject('EP_PICKER_BASE') as any
const { shortcuts, disabledDate } = pickerBase.props
const format = toRef(pickerBase.props, 'format')
const defaultValue = toRef(pickerBase.props, 'defaultValue')
const leftDate = ref(dayjs().locale(lang.value))
const rightDate = ref(dayjs().locale(lang.value).add(1, unit))

const {
  minDate,
  maxDate,
  rangeState,
  ppNs,
  drpNs,

  handleChangeRange,
  handleRangeConfirm,
  handleShortcutClick,
  onSelect,
  onReset,
} = useRangePicker(props, {
  defaultValue,
  leftDate,
  rightDate,
  unit,
  onParsedValueChanged,
})

// Watcher pour gérer le reset quand le panel se ferme avec une seule date sélectionnée
watch(
  () => props.visible,
  (visible) => {
    if (!visible) {
      // Si une seule date est sélectionnée (minDate existe mais pas maxDate)
      if (minDate.value && !maxDate.value) {
        minDate.value = undefined
        maxDate.value = undefined
        emit('pick', null)
      } else if (rangeState.value.selecting) {
        onReset(props.parsedValue)
        onSelect(false)
      }
    }
  }
)

const hasShortcuts = computed(() => !!shortcuts.length)

// const {
//   leftPrevYear,
//   rightNextYear,
//   leftNextYear,
//   rightPrevYear,
//   setMinusInfinityLeftYear,
//   getCustomLeftLabel,
//   setPlusInfinityRightYear,
//   getCustomRightLabel,
//   leftLabel,
//   rightLabel,
//   leftYear,
//   rightYear,
// } = useMonthRangeHeader({
//   unlinkPanels: toRef(props, 'unlinkPanels'),
//   leftDate,
//   rightDate,
// })

const {
  leftPrevYear,
  rightNextYear,
  doPrevOnNextYear,
  doNextOnPrevYear,
  // leftNextYear,
  // rightPrevYear,
  setMinusInfinityLeftYear,
  getCustomLeftLabel,
  setPlusInfinityRightYear,
  getCustomRightLabel,

  // TODO: ilaina
  // leftLabel,
  // rightLabel,
  // leftYear,
  // rightYear,
} = useMontRangeHeaderInfinity({
  unlinkPanels: toRef(props, 'unlinkPanels'),
  leftDate,
  rightDate,
})

// TODO: enableYearArrow
// const enableYearArrow = computed(() => {
//   return props.unlinkPanels && rightYear.value > leftYear.value + 1
// })

type RangePickValue = {
  minDate: Dayjs
  maxDate: Dayjs
}

const handleRangePick = (val: RangePickValue, close = true) => {
  // const defaultTime = props.defaultTime || []
  // const minDate_ = modifyWithTimeString(val.minDate, defaultTime[0])
  // const maxDate_ = modifyWithTimeString(val.maxDate, defaultTime[1])
  // todo
  const minDate_ = val.minDate
  const maxDate_ = val.maxDate
  if (maxDate.value === maxDate_ && minDate.value === minDate_) {
    return
  }
  emit('calendar-change', [minDate_.toDate(), maxDate_ && maxDate_.toDate()])
  maxDate.value = maxDate_
  minDate.value = minDate_

  if (!close) return
  handleRangeConfirm()
}

const handleClear = () => {
  leftDate.value = getDefaultValue(unref(defaultValue), {
    lang: unref(lang),
    unit: 'year',
    unlinkPanels: props.unlinkPanels,
  })[0]
  rightDate.value = leftDate.value.add(1, 'year')
  emit('pick', null)
}

const formatToString = (value: Dayjs | Dayjs[]) => {
  return isArray(value)
    ? value.map((_) => _.format(format.value))
    : value.format(format.value)
}

const parseUserInput = (value: Dayjs | Dayjs[]) => {
  return isArray(value)
    ? value.map((_) => dayjs(_, format.value).locale(lang.value))
    : dayjs(value, format.value).locale(lang.value)
}

function onParsedValueChanged(
  minDate: Dayjs | undefined,
  maxDate: Dayjs | undefined
) {
  if (props.unlinkPanels && maxDate) {
    const minDateYear = minDate?.year() || 0
    const maxDateYear = maxDate.year()
    rightDate.value =
      minDateYear === maxDateYear ? maxDate.add(1, unit) : maxDate
  } else {
    rightDate.value = leftDate.value.add(1, unit)
  }
}

emit('set-picker-option', ['isValidValue', isValidRange])
emit('set-picker-option', ['formatToString', formatToString])
emit('set-picker-option', ['parseUserInput', parseUserInput])
emit('set-picker-option', ['handleClear', handleClear])

const updateStartDate = () => {
  // Si -infini est déjà actif
  if (isMinusInfinity()) {
    if (
      rightDate.value.month() !== dayjs().month() ||
      (rightDate.value.month() === dayjs().month() && dayjs().month() === 11)
    ) {
      minDate.value = rightDate.value
    } else {
      minDate.value = undefined
    }
    rangeState.value.endDate = rightDate.value
    rangeState.value.selecting = true

    leftDate.value = dayjs().locale(lang.value)

    emit('calendar-change', [null, rightDate.value.toDate()])
    return
  }

  setMinusInfinityLeftYear()

  leftDate.value = leftDate.value.startOf('year')
  // handleRangePick(
  //   {
  //     minDate: leftDate.value,
  //     maxDate: rightDate.value,
  //   },
  //   false
  // )

  const isDateMin = leftDate.value.year() <= new Date(0, 11, 31).getFullYear()
  const isMaxDate =
    rightDate.value.year() >= new Date(9999, 11, 31).getFullYear()

  if (isDateMin && isMaxDate) {
    rightDate.value = rightDate.value.endOf('year')
    rangeState.value.endDate = rightDate.value
    emit('pick', [leftDate.value, rightDate.value])
    rangeState.value.selecting = false
    return false
  } else {
    rangeState.value.endDate = leftDate.value.startOf('year')
    maxDate.value = leftDate.value
    rangeState.value.selecting = true
  }

  if (!isMinusInfinity()) {
    return
  }

  if (
    minDate.value &&
    maxDate.value &&
    minDate.value.isAfter(rightDate.value)
  ) {
    rightDate.value = minDate.value
  }

  if (minDate.value && maxDate.value) {
    emit('pick', [maxDate.value, minDate.value])
  } else {
    minDate.value = leftDate.value.startOf('year')
  }
}

const updateEndDate = () => {
  const _minDate =
    minDate.value && minDate.value.year() === 9999
      ? undefined
      : minDate.value || undefined

  setPlusInfinityRightYear()

  rightDate.value = rightDate.value.endOf('year')

  const isDateMax =
    rightDate.value.year() >= new Date(9999, 11, 31).getFullYear()
  const isDateMin = leftDate.value.year() <= new Date(0, 11, 31).getFullYear()

  // Cas où aucune date de début n'est sélectionnée : sélectionner décembre 9999 comme début et fin, sélection visible, et permettre de choisir un début
  if (!minDate.value && isDateMax) {
    const maxYear = 9999
    const max = dayjs().year(maxYear).month(11).endOf('month')
    minDate.value = max
    maxDate.value = max
    rangeState.value.endDate = null
    rangeState.value.selecting = true
    emit('calendar-change', [max.toDate(), max.toDate()])
    return
  }

  if (isDateMin && isDateMax) {
    // Si on a déjà -infini sélectionné, on sélectionne tout
    rangeState.value.endDate = rightDate.value.endOf('year')
    emit('pick', [leftDate.value, rightDate.value])
    rangeState.value.selecting = false
    return false
  }

  if (isDateMax) {
    // Sélectionner seulement le bloc de droite (+infini) à partir d'une date de début existante
    const endDate = rightDate.value.endOf('year')
    maxDate.value = endDate
    rangeState.value.endDate = endDate
    rangeState.value.selecting = true
    // emit('calendar-change', [minDate.value?.toDate(), endDate.toDate()])

    emit('pick', [minDate.value, endDate])
  } else {
    // Pas encore à +infini, continuer la sélection
    minDate.value = _minDate
    maxDate.value = undefined
    rangeState.value.selecting = true
  }
}

const isMinusInfinity = () => {
  return leftDate.value.year() <= new Date(0, 11, 31).getFullYear()
}

const isPlusInfinity = () => {
  if (!rightDate.value) return false
  return rightDate.value.year() >= new Date(9999, 11, 31).getFullYear()
}

/* Flèche partie prev */
const clickPrevYear = () => {
  leftPrevYear()
}

const clickNextPrevYear = () => {
  doNextOnPrevYear()
}

/* Flèche partie next */
const clickPrevNextYear = () => {
  doPrevOnNextYear()
}

const clickNextYear = () => {
  rightNextYear()
}
</script>
