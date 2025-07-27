import { toast as sonnerToast } from 'sonner'
import { ToastType } from '@/types/module/core/commonModule'

export function showToast(
  message: string,
  type: ToastType = ToastType.DEFAULT,
  options: any = {}
) {
  switch (type) {
    case ToastType.SUCCESS:
      sonnerToast.success(message, options)
      break
    case ToastType.ERROR:
      sonnerToast.error(message, options)
      break
    case ToastType.INFO:
      sonnerToast.info(message, options)
      break
    case ToastType.WARNING:
      sonnerToast.warning(message, options)
      break
    default:
      sonnerToast(message, options)
      break
  }
}


export function showSuccessToast(message: string, options: any = {}) {
    showToast(message, ToastType.SUCCESS, options)
  }
  
  export function showErrorToast(message: string, options: any = {}) {
    showToast(message, ToastType.ERROR, options)
  }
  
  export function showDefaultToast(message: string, options: any = {}) {
    showToast(message, ToastType.DEFAULT, options)
  }
  