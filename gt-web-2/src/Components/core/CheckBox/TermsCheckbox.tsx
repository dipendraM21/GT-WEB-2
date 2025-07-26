import { TermsCheckboxProps } from '@/types/module/commonModule'
import { translation } from '@/utils/translation'
import { FC } from 'react'
import { Box, Text } from 'theme-ui'

export const TermsCheckbox: FC<TermsCheckboxProps> = ({
  wrapperClass,
  wrapperSx,
  text,
  textVariant = 'Maison16Regular20',
  textSx,
  textClass = '',
  onChange,
  checked,
}) => {
  return (
    <Box sx={wrapperSx} as="div" className={wrapperClass}>
      <input
        id="terms"
        aria-describedby="terms"
        type="checkbox"
        className="w-3 h-4 mt-[2px] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        onChange={(e) => {
          onChange(e?.target?.checked)
        }}
        checked={checked}
      />
      <Text
        variant={textVariant}
        sx={{
          fontSize: 15,
          display: 'inline-flex',
          alignItems: 'center',
          ...textSx,
        }}
        className={`${textClass} flex items-center`}
      >
        {text}
        <a
          href="#"
          className="text-primaryColor font-normal text-[14px] md:leading-[23.8px] whitespace-nowrap ms-1"
        >
          {translation?.TERMS_OF_SERVICES}
        </a>
        <Text sx={textSx} variant={textVariant} className="mx-1">
          and
        </Text>
        <a
          href="#"
          className="text-primaryColor font-normal text-[14px] md:leading-[23.8px] whitespace-nowrap"
        >
          {translation?.PRICACY_POLICY}
        </a>
      </Text>
    </Box>
  )
}
