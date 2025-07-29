export const FileValidation = ({ value, fileSize, fileType }) => {
    if (value instanceof FileList) {
        const allowed = fileType && Array.isArray(fileType) ? fileType.map(t => String(t).toLowerCase()) : [];
        for (const file of value) {
            if (fileSize && file.size > fileSize * 1e6) {
                return `maximum ${fileSize}MB is allowed`;
            }
            if (allowed.length && !allowed.includes(file.name.split(".").pop().toLowerCase())) {
                return `only ${allowed.join(", ")} is allowed`;
            }
        }
        return true
    }
}

/**
 * @param {object} props
 * @param {import("@commonHelper/formValidation/CommonValidationFunction").OptionalRequiredCondition} props.optionalRequired
 * @param {import('react-hook-form').UseFormReturn} props.formContextApi
 */
export const OptionalRequiredCondition = ({ formContextApi, optionalRequired }) => {
    if (formContextApi && optionalRequired) {
        // make to array for multiple condition  add
        const conditions = Array.isArray(optionalRequired) ? optionalRequired : [optionalRequired];

        return conditions.some((condition) => {
            const fieldValue = formContextApi.getValues(condition.name);
            return (
                (condition.value === undefined || checkValueMatch(fieldValue, condition.value)) &&
                (condition.valueNot === undefined || !checkValueMatch(fieldValue, condition.valueNot))
            )
        })
    }
    return false
}

const checkValueMatch = (value, condition) => {
    if (value == undefined) return false

    if (condition === '*') {
        if (Array.isArray(value)) return value.length > 0;
        return String(value).trim() !== "";
    }

    const valueArray = new Set(Array.isArray(value) ? value : [value]);
    const conditionArray = Array.isArray(condition) ? condition : [condition]

    return conditionArray.some((condition) => valueArray.has(condition))
}


