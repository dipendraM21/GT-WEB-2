/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { FileValidation, OptionalRequiredCondition } from "@commonHelper/formValidation/Validators";

/**
 * @param {CommonValidationProps} props 
 */
export const CommonValidationFunction = (props) => {
    const { formContextApi, required, optionalRequired, htmlCheck = true, name, type, validType, stopMode = false } = props;

    // modified variables
    let { minLength, maxLength, fixedDate, fixedPastDate } = props

    // regex  validate
    const regex = validType ? regexGet(validType) : type == 'email' ? regexGet("email") : undefined

    return {
        CommonValidationFunction: async (inputValue, formValues) => {
            try {
                let value = '';

                if (Array.isArray(inputValue) || inputValue instanceof FileList) {
                    value = inputValue.length ? inputValue : ''
                } else {
                    value = inputValue != undefined ? String(inputValue)?.trim() : null
                }

                // stop validation
                if (stopMode === true) return true;

                let isRequired = required;

                // optional required
                OptionalRequiredCondition({ formContextApi, optionalRequired }) ? (isRequired = true) : false

                // only check validation that time if input have value
                if (isRequired !== true && value === '') return true;

                // not empty value
                if ((isRequired === true) && (value == '' || value == undefined)) return `${name} is required`;

                // html validation check
                if (htmlCheck === true && (/<\/?[^>]+>/).test(value)) return `<value> is not allowed`;

                // min Length 
                if (minLength != undefined && value.trim().length <= minLength - 1) return `minimum ${minLength} characters are required`;

                // max Length 
                if (maxLength != undefined && value.trim().length >= maxLength + 1) return `maximum ${maxLength} characters are allowed`;

                // regex validation check (email, url , number , percentage)
                if (regex && !regex.test(value)) return `Please enter a valid ${name}`;

                // date || time || month compare
                if (["date", "month", "datetime-local"].includes(type) && value) {
                    const inputDate = new Date(value);

                    // only 4 digits year allowed
                    if (inputDate.getFullYear().toString().length > 4) return "Enter a valid Year";

                    const now = new Date();

                    // future date not allowed
                    if (fixedDate && inputDate > now) return "Future Date is not allowed";

                    // past date not allowed
                    if (fixedPastDate) {
                        let boundary = new Date(now);
                        if (type === "date") boundary.setDate(now.getDate() - 1);
                        if (type === "month") boundary.setMonth(now.getMonth() - 1);
                        if (inputDate < boundary) return "Past Date is not allowed";
                    }
                }

                const fileAnswer = FileValidation({ value, fileSize: props.fileSize, fileType: props.fileType })
                if (fileAnswer !== true) return fileAnswer

                return true;

            } catch (error) {
                console.log({ inputValue, name, error })
            }
        }
    }
}

/**
 * @param {regexValidType} value 
 */
function regexGet(value) {
    const urlRegex = `^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$`
    const storeRegex = {
        email: /^([a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, // email
        int: /^-?[0-9]*$/, // only 0 to 10 
        number: /^-?[0-9]*\.?[0-9]*$/, // 1 to 10 with .
        alphabetical: /^[a-zA-Z\s]*$/, // only abcd
        alphanumeric: /^[a-zA-Z0-9 ]*$/, // abcd with number
        panCard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // panCard validation
        percentage: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/, // percentage validation
        url: new RegExp(urlRegex, 'i'), // url
    }
    if (storeRegex[value]) return storeRegex[value]
    else return undefined
}


/**
 * ============== CommonValidationProps ===================
 * @typedef {Object} CommonValidationProps
 * @property {boolean} [required]       - Whether the field is required.
 * @property {OptionalRequiredCondition | OptionalRequiredCondition[]} [optionalRequired]     - optional required 
 * @property {boolean} [htmlCheck=true] - Whether to disallow HTML tags in the value.
 * @property {string} name              - Field name, used in error messages.
 * @property {InputType} [type]            - Type of field ('email', 'date', 'month', 'datetime-local', etc.).
 * @property {regexValidType} [validType]       - Regex validation type ('email', 'url', 'number', 'int', etc.).
 * @property {boolean} [stopMode=false] - If true, stops validation and always returns true.
 * @property {number} [minLength]       - Minimum allowed length.
 * @property {number} [maxLength]       - Maximum allowed length.
 * @property {boolean} [fixedDate]      - Disallow future dates if true.
 * @property {boolean} [fixedPastDate]  - Disallow past dates if true.
 * @property {number} [fileSize]        - Maximum allowed file size (for file input).
 * @property {string[]} [fileType] - Allowed file types or extensions.
 * @property {import('react-hook-form').UseFormReturn} [formContextApi] - useForm return full object for get optional field values 
 */

/**
 * @typedef {Object} OptionalRequiredCondition
 * @property {string} name - Other field name
 * @property {string|string[]} [value] - Field required if value matches
 * @property {string|string[]} [valueNot] - Field required if NOT this value
 * 
 * @example optionalRequired = [
 *    {name: "email" , value: "*"}
 *    {name: "role" , value: ['admin' , 'marketing']},
 *    {name: "role" , valueNot: 'user'}
 * ]
 */


/**
 * =========== (regexValidType) ==========
 * @typedef {'email' | 'int' | 'number' | 'alphabetical' | 'alphanumeric' | 'panCard' | 'percentage' | 'url'} regexValidType
 */


/**
 * ============ (InputType) ============ 
 * @typedef {'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'time' | 'datetime-local' | 'file'} InputType
 */