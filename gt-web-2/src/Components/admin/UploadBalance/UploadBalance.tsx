'use client'
import FormSectionTitle, { AdminCard } from '@/components/shared/Card/AdminCard'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { CustomModalBtn } from '@/components/web/core/Button/CustomModalBtn'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import Spinner from '@/components/web/core/spinner/Spinner'
import { showSuccessToast } from '@/components/web/core/Toast/CustomToast'
import { addBalance } from '@/store/actions/balance.action'
import { Field, FieldType } from '@/types/module/authModule'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { paymentModeOptions } from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'

export const UploadBalance = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading } = useSelector((state: MainStoreType) => state.balanceData)
  const [country, setCountry] = useState<string[]>()

  useEffect(() => {
    const fetchCountries = async () => {
      const { Country } = await import('country-state-city')
      const countries = Country.getAllCountries()
      if (countries) {
        const state = countries.map((item) => item.name)
        setCountry(state)
      }
    }

    fetchCountries()
  }, [])

  const InitialValues = {
    paymentMode: '',
    amount: '',
  }

  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    // validationSchema: addCouponValidationSchema,
    onSubmit: (values, formikHelpers) => {
      const { paymentMode, amount } = values
      dispatch(
        addBalance(
          {
            paymentMode,
            amount: Number(amount),
            userId: '677f899d9028bf0e457b319e',
            addedBy: 'adminUser',
            remarks: 'Initial deposit',
          },
          (res) => {
            if (res) {
              showSuccessToast('Balance added successfully')
              router.push(appRoutes?.dashboard)
            }
          }
        )
      )
    },
  })

  const {
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = formik

  const couponDetailsFields: Field[] = [
    {
      name: 'paymentMode',
      label: 'Select PaymentMode',
      value: values.paymentMode,
      placeholder: 'Select PaymentMode',
      type: FieldType.SELECT_INPUT_FIELD,
      isShowRequired: true,
      options: paymentModeOptions,
      onChange: (val) => setFieldValue('paymentMode', val),
      error: errors.paymentMode,
      touched: touched.paymentMode,
    },
    {
      name: 'amount',
      label: 'Deposit Amount',
      value: values.amount,
      placeholder: 'Enter Amount',
      type: FieldType.TEXT_INPUT_FIELD,
      isShowRequired: true,
      onChange: (val) => setFieldValue('amount', val),
      error: errors.amount,
      touched: touched.amount,
    },
  ]

  const renderField = useCallback(
    (field: Field) => {
      if (field.type === FieldType.SELECT_INPUT_FIELD) {
        return (
          <SelectInputField
            key={field.name}
            label={field.label}
            value={field.value}
            onChange={(e) => {
              field.onChange?.(e?.value as string)
            }}
            name={field.name}
            options={
              field.options as Array<{ value: any; label: string } | string>
            }
            labelSx={{ display: 'block', textAlign: 'start' }}
            placeholder={field.placeholder}
            firstInputBox
            id={`select-${field.name}`}
            instanceId={`select-instance-${field.name}`}
            isSearchable={field.isSearchable}
            errors={field?.error}
            touched={field.touched}
            isShowRequired={field.isShowRequired}
            onBlur={field.onBlur}
          />
        )
      }

      return (
        <TextInputField
          key={field.name}
          name={field.name}
          ref={field.ref}
          label={field.label}
          value={field.value}
          errors={field?.error}
          touched={field.touched}
          autoFocus={field.autoFocus}
          isShowRequired={field.isShowRequired}
          onFocus={() => {
            field.onFocus?.()
          }}
          onBlur={handleBlur}
          manualErrorSX={{
            display: 'block',
            textAlign: 'start',
          }}
          onChange={(e) => {
            field.onChange?.(e)
          }}
          placeholder={field.placeholder}
          wrapperClass="mt-0 w-[100%]"
          id={`input-${field.name}`}
          labelSx={{ display: 'block', textAlign: 'start' }}
        />
      )
    },
    [handleBlur, errors, touched, setFieldValue, setFieldTouched]
  )

  const handleClickCancel = () => {
    router.push(appRoutes?.userRequests)
  }

  const handleClickSubmit = () => {
    handleSubmit()
  }

  return (
    <AdminCard>
      <Box className="pt-20">
        <FormSectionTitle title="Your Payment Options" />

        <div
          className="grid gap-20 mt-14 mb-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {couponDetailsFields.map(renderField)}
        </div>
      </Box>

      <CustomModalBtn
        wrapperSx={{ justifyContent: 'flex-end', gap: '10px' }}
        submitBtnTitle={translation?.SUBMIT}
        cancelBtnTitle={translation?.CANCEL}
        cancelBtnClick={handleClickCancel}
        submitBtnClick={handleClickSubmit}
      />
      <Spinner visible={loading} />
    </AdminCard>
  )
}
