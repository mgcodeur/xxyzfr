import { computed } from 'vue'
import { useLocale } from '@element-plus/hooks'
import type { Ref, ToRef } from 'vue'
import type { Dayjs } from 'dayjs'

export const useMonthRangeHeader = ({
  unlinkPanels,
  leftDate,
  rightDate,
}: {
  unlinkPanels: ToRef<boolean>
  leftDate: Ref<Dayjs>
  rightDate: Ref<Dayjs>
}) => {
  const { t } = useLocale()
  const leftPrevYear = () => {
    leftDate.value = leftDate.value.subtract(1, 'year')
    if (!unlinkPanels.value) {
      rightDate.value = rightDate.value.subtract(1, 'year')
    }
  }

  const rightNextYear = () => {
    if (!unlinkPanels.value) {
      leftDate.value = leftDate.value.add(1, 'year')
    }
    rightDate.value = rightDate.value.add(1, 'year')
  }

  const leftNextYear = () => {
    leftDate.value = leftDate.value.add(1, 'year')
  }

  const rightPrevYear = () => {
    rightDate.value = rightDate.value.subtract(1, 'year')
  }
  const leftLabel = computed(() => {
    return `${leftDate.value.year()} ${t('el.datepicker.year')}`
  })

  const rightLabel = computed(() => {
    return `${rightDate.value.year()} ${t('el.datepicker.year')}`
  })

  const leftYear = computed(() => {
    return leftDate.value.year()
  })

  const rightYear = computed(() => {
    return rightDate.value.year() === leftDate.value.year()
      ? leftDate.value.year() + 1
      : rightDate.value.year()
  })

  const setMinusInfinityLeftYear = () => {
    // leftDate.value = leftDate.value.set('year', new Date(0, 0, 1).getFullYear())
    const isDate0 = leftDate.value.year() <= new Date(0, 0, 1).getFullYear()
    leftDate.value = leftDate.value.set(
      'year',
      isDate0 ? new Date().getFullYear() : new Date(0, 0, 1).getFullYear()
    )
  }

  const setPlusInfinityRightYear = () => {
    // rightDate.value = rightDate.value.set(
    //   'year',
    //   new Date(9999, 0, 1).getFullYear()
    // )
    const isDateMax =
      rightDate.value.year() >= new Date(9999, 0, 1).getFullYear()
    rightDate.value = rightDate.value.set(
      'year',
      isDateMax
        ? new Date().getFullYear() + 1
        : new Date(9999, 0, 1).getFullYear()
    )
  }

  const getCustomLeftLabel = computed(() => {
    return leftDate.value.year() <= new Date(0, 0, 1).getFullYear()
      ? '-∞'
      : leftLabel.value
  })

  const getCustomRightLabel = computed(() => {
    return rightDate.value.year() >= new Date(9999, 0, 1).getFullYear()
      ? '+∞'
      : rightLabel.value
  })

  return {
    leftPrevYear,
    rightNextYear,
    leftNextYear,
    rightPrevYear,
    leftLabel,
    rightLabel,
    leftYear,
    rightYear,
    setMinusInfinityLeftYear,
    setPlusInfinityRightYear,
    getCustomLeftLabel,
    getCustomRightLabel,
  }
}

export const useMontRangeHeaderInfinity = ({
  unlinkPanels,
  leftDate,
  rightDate,
}: {
  unlinkPanels: ToRef<boolean>
  leftDate: Ref<Dayjs>
  rightDate: Ref<Dayjs>
}) => {
  const { t } = useLocale()

  const leftPrevYear = () => {
    const isDate0 = leftDate.value.year() <= new Date(0, 0, 1).getFullYear()
    const NextIsMax =
      rightDate.value.year() >= new Date(9999, 0, 1).getFullYear()

    if (isDate0) {
      if (NextIsMax) {
        leftDate.value = leftDate.value.set('year', new Date().getFullYear())
      } else {
        leftDate.value = leftDate.value.set('year', rightDate.value.year() - 1)
      }
    } else {
      leftDate.value = leftDate.value.subtract(1, 'year')
      if (!unlinkPanels.value) {
        rightDate.value = rightDate.value.subtract(1, 'year')
      }
    }
  }

  const rightNextYear = () => {
    const isDateMax =
      rightDate.value.year() >= new Date(9999, 0, 1).getFullYear()
    const PrevIs0 = leftDate.value.year() <= new Date(0, 0, 1).getFullYear()

    if (isDateMax) {
      if (PrevIs0) {
        rightDate.value = rightDate.value.set(
          'year',
          new Date().getFullYear() + 1
        )
      } else {
        rightDate.value = rightDate.value.set('year', leftDate.value.year() + 1)
      }
    } else {
      if (!unlinkPanels.value) {
        leftDate.value = leftDate.value.add(1, 'year')
      }
      rightDate.value = rightDate.value.add(1, 'year')
    }
  }

  const doPrevOnNextYear = () => {
    const isDateMax =
      rightDate.value.year() >= new Date(9999, 0, 1).getFullYear()

    if (isDateMax) {
      rightDate.value = rightDate.value.set(
        'year',
        new Date().getFullYear() + 1
      )
    } else {
      if (rightDate.value.year() - leftDate.value.year() > 1) {
        rightDate.value = rightDate.value.subtract(1, 'year')
      } else {
        rightDate.value = rightDate.value.subtract(1, 'year')
        leftDate.value = leftDate.value.subtract(1, 'year')
      }
    }
  }

  const doNextOnPrevYear = () => {
    const isDate0 = leftDate.value.year() <= new Date(0, 0, 1).getFullYear()

    if (isDate0) {
      leftDate.value = leftDate.value.set('year', new Date().getFullYear())
    } else {
      if (rightDate.value.year() - leftDate.value.year() > 1) {
        leftDate.value = leftDate.value.add(1, 'year')
      } else {
        leftDate.value = leftDate.value.add(1, 'year')
        rightDate.value = rightDate.value.add(1, 'year')
      }
    }
  }

  // const updateLeftDateYear = (value: number) => {
  //   leftDate.value = leftDate.value.set('year', value)
  // }

  // const updateRightDateYear = (value: number) => {
  //   rightDate.value = rightDate.value.set('year', value)
  // }

  const leftNextYear = () => {
    leftDate.value = leftDate.value.add(1, 'year')
  }

  const rightPrevYear = () => {
    rightDate.value = rightDate.value.subtract(1, 'year')
  }
  const leftLabel = computed(() => {
    return `${leftDate.value.year()} ${t('el.datepicker.year')}`
  })

  const rightLabel = computed(() => {
    return `${rightDate.value.year()} ${t('el.datepicker.year')}`
  })

  const leftYear = computed(() => {
    return leftDate.value.year()
  })

  const rightYear = computed(() => {
    return rightDate.value.year() === leftDate.value.year()
      ? leftDate.value.year() + 1
      : rightDate.value.year()
  })

  const setMinusInfinityLeftYear = () => {
    const isDate0 = leftDate.value.year() <= new Date(0, 0, 1).getFullYear()
    leftDate.value = leftDate.value.set(
      'year',
      isDate0 ? new Date().getFullYear() : new Date(0, 0, 1).getFullYear()
    )
  }

  const setPlusInfinityRightYear = () => {
    const isDateMax =
      rightDate.value.year() >= new Date(9999, 0, 1).getFullYear()

    rightDate.value = rightDate.value.set(
      'year',
      isDateMax
        ? new Date().getFullYear() + 1
        : new Date(9999, 0, 1).getFullYear()
    )
  }

  const getCustomLeftLabel = computed(() => {
    const yearToUse = leftDate.value.year()

    // update left date year
    // updateLeftDateYear(yearToUse)
    return yearToUse <= new Date(0, 0, 1).getFullYear() ? '-∞' : leftLabel.value
  })

  const getCustomRightLabel = computed(() => {
    const yearToUse = rightDate.value.year()
    // update left date year
    // updateRightDateYear(yearToUse)
    return yearToUse >= new Date(9999, 0, 1).getFullYear()
      ? '+∞'
      : rightLabel.value
  })

  return {
    leftPrevYear,
    rightNextYear,
    doPrevOnNextYear,
    doNextOnPrevYear,
    leftNextYear,
    rightPrevYear,
    leftLabel,
    rightLabel,
    leftYear,
    rightYear,
    setMinusInfinityLeftYear,
    setPlusInfinityRightYear,
    getCustomLeftLabel,
    getCustomRightLabel,
  }
}
