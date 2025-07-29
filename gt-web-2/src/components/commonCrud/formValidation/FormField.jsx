/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { ErrorMessage } from '@hookform/error-message'
import React, { useEffect, useId, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { combineRules } from './formValidationHelper'
import { cn } from '@lib/utils'
import { Select } from '@components/ui/Select'

/**
 * FormField - A reusable form field component for react-hook-form.
 * Supports input, textarea, and future select types.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the form field (required)
 * @param {import('@commonHelper/formValidation/CommonValidationFunction').InputType} props.type - Type of input
 * @param {string|function} [props.label] - The label text or a custom label component
 * @param {string} [props.errorName] - Alternative name to use for error messages
 * @param {import('@commonHelper/formValidation/formValidationHelper').RegisterOptions} [props.rules] - react-hook-form validation rules
 * @param {import('@commonHelper/formValidation/CommonValidationFunction').CommonValidationProps} [props.validateRule] - Additional validation rules for CommonValidationFunction
 * @returns {JSX.Element}
 */
export const FormField = ({ name, type = 'text', label, errorName, rules, validateRule = {}, ...atr }) => {
    const formContextApi = useFormContext()
    const { register, control, formState: { errors } } = formContextApi

    // mix user and react hook form rules
    const newRules = combineRules({ rules, validateRule: { formContextApi, type, name: errorName ?? label ?? name, ...validateRule, } })

    // for element props
    const inputId = useId()
    const FormElementProps = {
        type, name, newRules, register, control, inputId, atr,
        required: validateRule.required,
        placeholder: typeof label == 'string' || errorName ? (`${type == 'select' ? "Select" : 'Enter'} ${label || errorName}`) : undefined,
    }

    return (
        <div className='w-full'>
            <Label label={label} inputId={inputId} />
            <FormElement {...{ ...FormElementProps }} />
            <ErrorMessage errors={errors} name={name} render={({ message }) => (<p className='text-danger fs-12 mt-1 ms-1'>{message}</p>)} />
        </div>
    )
}


/************* form element ***************/
const FormElement = ({ type, name, newRules, register, control, inputId, required, placeholder, atr }) => {
    if (!type || !name) return

    if (type == 'textarea') {
        return <textarea rows={4} {...register(name, newRules)} placeholder={placeholder} id={inputId} {...atr} className={cn("form-control", required && 'required-border', atr.className)} />
    }

    if (type == 'select') {
        return (
            <Controller
                name={name} rules={newRules}
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select {...{ onChange, onBlur, value, placeholder, ...atr, className: cn(required && "required-border rounded-md", atr.className) }} ref={ref} />
                )}
            />
        )
    }

    return (
        <input {...register(name, newRules)} type={type} placeholder={placeholder} id={inputId} {...atr} className={cn("form-control", required && type !== 'checkbox' && 'required-border', type == 'checkbox' && "form-switch", atr.className)} />
    )
}

/********  Label Component ********/
const Label = ({ label: LabelComponent, inputId }) => {
    if (!LabelComponent) return null

    if (typeof LabelComponent == 'string') {
        return <label htmlFor={inputId} className='block'>{LabelComponent}</label>
    }

    return <LabelComponent inputId={inputId} />
}

/******** Optional rending component ********/
export const OptionalFormField = ({ children, name, value }) => {
    const { control } = useFormContext()
    const fieldValues = useWatch({ control, name })

    if (fieldValues) {
        if (Array.isArray(value) && value.includes(fieldValues)) {
            return children
        } else if (value == fieldValues) {
            return children
        }
    }

    return null
}

const DummyComponent = ({ children }) => {
    return children
}
