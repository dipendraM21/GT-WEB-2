import { translation } from '@/utils/translation'
import { Text } from 'theme-ui'
import { TextInputField } from '../../../shared/TextInputField/TextInputField'

export const ForgotPassword = () => {
  return (
    <div>
      <Text variant="Maison36SemiBold125" className="pb-6">
        {translation?.FORGOT_PASSWORD}
      </Text>
      <div className="space-y-4 my-24">
        <TextInputField
          label={translation?.EMAIL}
          placeholder={translation?.ENTER_EMAIL}
          isShowRequired
        />
      </div>
    </div>
  )
}
