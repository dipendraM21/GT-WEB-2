import { TransformCaseOptions } from '@/types/module/core/commonModule'
import { CabinClass } from '@/types/module/web/flightSearch'
import { clsx, type ClassValue } from 'clsx'
import Cookies from 'js-cookie'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'
import { ACCESS_TOKEN, IS_ADMIN_USER } from './constant'
import {
  camelCaseRegex,
  hyphenRegex,
  kebabCaseRegex,
  removeUnderscoreOrHyphenRegex,
  snakeCaseRegex,
  titleCaseRegex,
  underscoreRegex,
} from './regexMatch'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toLocaleLowerCase(value: string): string {
  return value.toLocaleLowerCase()
}

export function toCamelCase(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('')
}

export const removeDot = (input: string): string => {
  return input.replace(/\./g, '')?.toLocaleLowerCase()
}

export const setInitialStorageState = () => {
  Cookies.remove(ACCESS_TOKEN)
  Cookies.remove(IS_ADMIN_USER)
}

export function isNullOrUndef(value: unknown): boolean {
  return value === null || value === undefined || value === ''
}

export function capitalizeFirstLetter(text: string): string {
  return text
    ?.toLowerCase() // Ensure all text is in lowercase first
    ?.split(' ') // Split by spaces
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    ?.join(' ') // Join back into a single string
}

export default function transformCase({
  value,
  caseType,
}: TransformCaseOptions) {
  switch (caseType) {
    case 'toUpperCase':
      return value.toUpperCase()
    case 'toLowerCase':
      return value.toLowerCase()
    case 'capitalize':
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    case 'camelCase':
      return value
        .toLowerCase()
        .replace(camelCaseRegex, (group) =>
          group.toUpperCase().replace('-', '').replace('_', '')
        )
    case 'kebabCase':
      return value
        .replace(kebabCaseRegex, '$1-$2')
        .toLowerCase()
        .replace(underscoreRegex, '-')
    case 'snakeCase':
      return value
        .replace(snakeCaseRegex, '$1_$2')
        .toLowerCase()
        .replace(hyphenRegex, '_')
    case 'titleCase':
      return value
        .toLowerCase()
        .replace(titleCaseRegex, (char) => char.toUpperCase())
        .replace(removeUnderscoreOrHyphenRegex, ' ')
    default:
      return value
  }
}

export const formatCabinClass = (input: CabinClass): string => {
  return input?.charAt(0) + input?.slice(1)?.toLowerCase()
}

export function formatValue(value: number | string): string {
  const number = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('en-IN').format(number)
}

export function convertToTime(departureTime: string): string {
  const date = new Date(departureTime)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export function getNuumberOfStops(stop: number) {
  if (stop === 0) return 'Non Stop'
  else if (stop > 0 && stop < 3) return `One Stop`
  else if (stop >= 3) return `${stop} Stops`
  else return ''
}

export function CurrentYear() {
  return new Date().getFullYear()
}

export function formatDate(date: string, format: string = 'DD-MM-YYYY') {
  return moment(date).format(format)
}

export function renderWithFallback(
  value: any,
  dataType: 'string' | 'number' = 'string'
): string | number {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  ) {
    return dataType === 'number' ? 0 : '-'
  }
  return value
}
