import { Store } from "@tanstack/store";
import { commonAjax } from "@commonCrud/commonAjax";
import { createCommonCrudHandler } from "@commonCrud/CommonHandler";

export const createCommonCrud = ({ apiName, apiUrl, pageTitle, ...otherArg }) => {

    const { initialState = {}, reducers = {}, crudApi = {} } = otherArg ?? {}

    // for common call api axios 
    const moduleAjaxApi = (arg) => {
        const { moduleMode, selectedRecord } = API.moduleState.state.commonCrud
        const url = ['EDIT', 'DELETE'].includes(moduleMode) ? `${API.apiUrl}/${selectedRecord.id}` : API.apiUrl
        const methodTypes = { ADD: "POST", EDIT: "PATCH", DELETE: 'DELETE', }
        return commonAjax({ url, type: methodTypes[moduleMode] ?? "GET", ...arg })
    }

    // main api reference store all handler and crud data and state
    const API = {
        apiName, pageTitle,
        apiUrl,
        AjaxApi: moduleAjaxApi,
        crudApi: {
            formCrud: {
                action_alias: 'record',
                ...(crudApi.formCrud ?? {})
            },
            tableCrud: {
                action_alias: 'data',
                ...(crudApi.tableCrud ?? {})
            },
            crudHandler: {
                ...createCommonCrudHandler({ apiName }),
                ...(crudApi.crudHandler ?? {})
            },
            queryKeys: {
                // get active keys for invalid query using key
                submitHandlerKey: [apiName, '{action}', '{selectedRecord}', '{mutationKey}'],
                dataHandlerKey: [apiName, '{action}', '{queryKey}', '{data}'],
                selectedRecordHandlerKey: [apiName, '{action}', '{queryKey}'],
                deleteRecordHandlerKey: [apiName, '{action}', '{mutationKey}']
            }
        },
        moduleRef: {
            tableRef: undefined,
            filterFormRef: undefined,
        }
    }


    // module sate for show hide modal or ay user extra module state mange 
    API.moduleState = new Store({
        apiName,
        commonCrud: {
            formVisibility: false, /* for modal form show hide */
            moduleMode: undefined, /* ADD | EDIT | DELETE */
            selectedRecord: undefined, /* moduleMode edit and delete time get selected record  */
        },
        filterShow: true,
        ...initialState
    })

    API.reducers = {
        showForm: (state) => {
            state.commonCrud = { formVisibility: true, moduleMode: "ADD" }
        },
        hideForm: (state) => {
            state.commonCrud = { formVisibility: false }
        },
        editRecord: (state, payload) => {
            state.commonCrud = { moduleMode: "EDIT", selectedRecord: payload, formVisibility: true }
        },
        deleteRecord: (state, payload) => {
            state.commonCrud = { moduleMode: "DELETE", selectedRecord: payload }
        },
        resetCrud: (state) => {
            state.commonCrud = {}
        },
        toggleFilter: (state) => {
            state.filterShow = !state.filterShow
        },
        ...reducers
    }

    // create action for 
    API.actions = {}
    // make action for all reducers
    Object.entries(API.reducers).map(([key, fn]) => {
        // add 
        API.actions[key] = (payload) => {
            // set state module state 
            API.moduleState.setState((oldSate) => {
                const newState = { ...oldSate }

                // modified state for new render 
                fn(newState, payload)

                return newState
            })
        }
    })

    return API;
}

/********************************************************************/
/**
 * Module modes for CRUD operations
 * @typedef {'ADD' | 'EDIT' | 'DELETE'} ModuleMode
 */

/**
 * @typedef {Object} CommonCrudState
 * @property {boolean} formVisibility - Controls form modal visibility
 * @property {ModuleMode} [moduleMode] - Current operation mode
 * @property {*} [selectedRecord] - Currently selected record for edit/delete operations
 */