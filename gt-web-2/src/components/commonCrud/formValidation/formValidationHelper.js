import { CommonValidationFunction } from '@commonHelper/formValidation/CommonValidationFunction'

/**
 * @param {object} props 
 * @param {RegisterOptions} props.rules
 * @param {import('@commonHelper/formValidation/CommonValidationFunction').CommonValidationProps} props.validateRule
 */
export const combineRules = ({ rules = {}, validateRule = {} }) => {
    const newRules = structuredClone(rules)

    // create common  validation rules
    const validate = { ...CommonValidationFunction(validateRule), ...(newRules.validate ?? {}) }
    newRules.validate = validate

    return newRules
}

/******************************************************************/

/**
 * =========== react hook form Register options type =========== 
 * @typedef {import('react-hook-form').RegisterOptions} RegisterOptions
 */