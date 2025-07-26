import { GroupBase, StylesConfig } from 'react-select'

export type OptionType = { label: string; value: string }
export const isMultiple = false
export type GroupType = GroupBase<OptionType>

export const stylesConfig: StylesConfig<
  OptionType,
  typeof isMultiple,
  GroupType
> = {
  control: (baseStyles, state) => {
    let paddingValue = '8px 14px'
    if (
      state.selectProps.name === 'selectClose' ||
      state.selectProps.name === 'selectOpen' ||
      state.selectProps.name === 'itemType'
    ) {
      paddingValue = '18px 14px'
    } else if (state.selectProps.name === 'state') {
      paddingValue = '8px 14px'
    }

    return {
      ...baseStyles,
      border: state.isFocused
        ? '2px solid #00C6B7 !important'
        : '1px solid #EAEAEA !important',
      boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.20) !important',
      backgroundColor: state.isDisabled ? '#F1F1F1' : 'transparent',
      padding: paddingValue,
      color: 'black',
      borderRadius: '8px',
      fontFamily: 'Maison',
      fontWeight: '500',
    }
  },
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  option: (base, { data, isFocused, isSelected, options }) => {
    const isLastOption = data.label === options[options.length - 1]?.label
    return {
      ...base,
      backgroundColor: isFocused ? '#DEF0F6' : 'rgba(255, 255, 255, 1)',
      color: isSelected ? 'black' : '',
      padding: '6px 15px',
      fontSize: 16,
      fontFamily: 'Maison',
      fontWeight: '500',
      lineHeight: '20px',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      height: '50px',
      ':active': {
        backgroundColor: '#DEF0F6 !important',
      },
      ...(isLastOption
        ? {}
        : {
            marginBottom: '1px',
          }),
    }
  },
  dropdownIndicator: (base) => ({
    ...base,
    padding: 'unset !important',
  }),
  menu: (base) => ({
    ...base,
    left: 0,
    boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.15)',
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: '#a6a6a6',
      height: '60px',
      borderRadius: '10px',
      border: '5px solid transparent',
      backgroundClip: 'content-box',
    },
    '& ::-webkit-scrollbar-corner': {
      backgroundColor: '#fff',
    },
    '& ::-webkit-scrollbar': {
      width: '15px',
      backgroundColor: '#EAEAEA !important',
    },
    textAlign: 'center',
    backgroundColor: '#EAEAEA !important',
  }),
  menuList: (base) => ({
    ...base,
    display: 'flex',
    flexDirection: 'column',
    padding: 'unset',
    maxHeight: '152px !important',
    flexFlow: 'wrap',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 'unset',
  }),
}

export const flightSelectStylesConfig: StylesConfig<
  OptionType,
  typeof isMultiple,
  GroupType
> = {
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      border: state.isFocused
        ? '2px solid #00C6B7 !important'
        : '1px solid #e7e7e7 !important',
      boxShadow: '0px 0px 2px 0px rgba(2, 0, 0, 0.20) !important',
      backgroundColor: state.isDisabled ? '#F1F1F1' : 'transparent',
      fontFamily: 'Maison',
      fontWeight: '500',
      height: '110px',
      borderRadius: '14px',
    }
  },
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  option: (base, { data, isFocused, isSelected, options }) => {
    const isLastOption = data.label === options[options.length - 1]?.label
    return {
      ...base,
      backgroundColor: isFocused ? '#DEF0F6' : 'rgba(255, 255, 255, 1)',
      color: isSelected ? 'black' : '',
      padding: '6px 15px',
      fontSize: 16,
      fontFamily: 'Maison',
      fontWeight: '500',
      lineHeight: '20px',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      height: '50px',
      ':active': {
        backgroundColor: '#DEF0F6 !important',
      },
      ...(isLastOption
        ? {}
        : {
            marginBottom: '1px',
          }),
    }
  },
  dropdownIndicator: (base) => ({
    ...base,
    display: 'none',
    padding: 'unset !important',
  }),
  menu: (base) => ({
    ...base,
    left: 0,
    boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.15)',
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: '#a6a6a6',
      height: '60px',
      border: '5px solid transparent',
      backgroundClip: 'content-box',
    },
    '& ::-webkit-scrollbar-corner': {
      backgroundColor: '#fff',
    },
    '& ::-webkit-scrollbar': {
      width: '15px',
      backgroundColor: '#EAEAEA !important',
    },
    textAlign: 'center',
    backgroundColor: '#EAEAEA !important',
  }),
  menuList: (base) => ({
    ...base,
    display: 'flex',
    flexDirection: 'column',
    padding: 'unset',
    maxHeight: '152px !important',
    flexFlow: 'wrap',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 'unset',
  }),
}
