import { getCommonCrudApi } from "@commonCrud/commonCrudStore"

// Form CRUD actions Create 
export const formCurdActions = ({ apiName }) => {
    const Api = getCommonCrudApi(apiName)
    const { formCrud } = Api.crudApi
    const { action_alias, actions: userActions = {} } = formCrud

    const actions = {
        create: (userActions.create ? userActions.create : () => `create_${action_alias}`),
        update: (userActions.update ? userActions.update : () => `update_${action_alias}`),
        fetch: (userActions.fetch ? userActions.fetch : () => `fetch_${action_alias}`),
        delete: (userActions.delete ? userActions.delete : () => `delete_${action_alias}`),
    }

    const getAction = (actionName) => {
        if (actions[actionName] && typeof actions[actionName] == "function") {
            return actions[actionName]()
        } else if (actions[actionName] && typeof actions[actionName] == 'string') {
            return actions[actionName]
        } else {
            return `${actionName} not found`
        }
    }

    return getAction
}

// Table CRUD actions Create 
export const tableCrudActions = ({ apiName }) => {
    const Api = getCommonCrudApi(apiName)
    const { tableCrud } = Api.crudApi
    const { action_alias, actions: userActions = {} } = tableCrud

    const actions = {
        get: (userActions.get ? userActions.get : () => `get_${action_alias}`),
    }

    const getAction = (actionName) => {
        if (actions[actionName] && typeof actions[actionName] == "function") {
            return actions[actionName]()
        } else if (actions[actionName] && typeof actions[actionName] == 'string') {
            return actions[actionName]
        } else {
            return `${actionName} not found`
        }
    }

    return getAction
}