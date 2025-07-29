/* eslint-disable no-unused-vars */

import { createCommonCrud } from "@commonCrud/createCommonCrud"

/**
 * only create config object for dynamic crud create
*/
const crudConfig = {
    event: { apiUrl: '/event', pageTitle: 'Event' },
    user: { apiUrl: '/user', pageTitle: 'User' }
}


/**
 * website load time no api create
 * only create that time getCommonCrudApi call 
*/
export const commonCrudApiStore = {}

export const getCommonCrudApi = (apiName) => {
    if (commonCrudApiStore[apiName]) return commonCrudApiStore[apiName]

    // if not found in commonCrudApi
    if (!crudConfig[apiName]) return {}

    const crudApi = createCommonCrud({ apiName, ...crudConfig[apiName] })

    // add in commonCrudApiStore for second time not create 
    commonCrudApiStore[apiName] = crudApi;

    return commonCrudApiStore[apiName]
}