/* eslint-disable no-unused-vars */

import { getCommonCrudApi } from "@commonCrud/commonCrudStore"
import { formCurdActions, tableCrudActions } from "@commonCrud/commonCrudActions"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@providers/QueryProvider"
import { useStore } from "@tanstack/react-store";
import { getSearchParams, setSearchPrams } from "@commonHelper/SearchParams";
import { useSearchParams } from "react-router-dom";
import { setValidationError } from "@commonHelper/ReactHookForm";

// <* ===========  Submit form  ========= *>
const useSubmitHandler = ({ apiName, mutationKey = [], }) => {
    const Api = getCommonCrudApi(apiName)
    const { moduleMode, selectedRecord = {} } = Api.moduleState.state.commonCrud
    const action = formCurdActions({ apiName })(moduleMode === "EDIT" ? 'update' : 'create')

    const queryKey = [apiName, action, selectedRecord, ...mutationKey]
    Api.crudApi.queryKeys['submitHandlerKey'] = queryKey

    // Submit form data
    const submitHandle = ({ data: formData, control }) => {
        const data = { action, ...selectedRecord, ...formData }

        // form error handler
        const rejectCallback = (error) => {
            setValidationError(error, control)
        }

        const callback = () => {
            Api.actions.hideForm()
            queryClient.invalidateQueries({ queryKey: [apiName] })
        }

        return Api.AjaxApi({ data, callback, rejectCallback })
    }

    return useMutation({
        mutationKey: queryKey,
        mutationFn: submitHandle,
    })
}

// <* ===========  Submit filter form  ========= *>
const useFilterSubmitHandler = ({ apiName, mutationKey = [] }) => {
    const Api = getCommonCrudApi(apiName)

    const queryKey = [apiName, "filter", ...mutationKey]
    return useMutation({
        mutationKey: queryKey,
        mutationFn: (filterData) => {
            const SearchParamsObject = getSearchParams()

            // overwrite filter and page = 1  
            SearchParamsObject.page = 1
            SearchParamsObject.filters = filterData

            setSearchPrams(SearchParamsObject)

            // invalid query for new data fetch 
            queryClient.invalidateQueries({ queryKey: Api.crudApi.queryKeys['dataHandlerKey'] })
        },
    })
}

// <* ===========  Get Data  ========= *>
const useDataHandler = ({ apiName, queryKey: userQueryKey = [], data = {} }) => {
    const Api = getCommonCrudApi(apiName)
    const action = tableCrudActions({ apiName })('get')

    const { page = 1, limit = 10, filters = {} } = getSearchParams()
    const queryKey = [apiName, action, page, limit, filters, ...userQueryKey, data]
    Api.crudApi.queryKeys['dataHandlerKey'] = queryKey

    const pageParams = useSearchParams();

    return useQuery({
        queryKey,
        queryFn: () => {
            const finalData = { action, page, limit, ...filters, ...data }
            return Api.AjaxApi({ data: finalData })
        },
        placeholderData: keepPreviousData,
    })
}

// <* ===========  Add Record  ========= *>
const addRecordHandler = ({ apiName }) => {
    getCommonCrudApi(apiName).actions.showForm()
}

// <* ===========  Update Record  ========= *>
const editRecordHandler = ({ apiName, data = {} }) => {
    getCommonCrudApi(apiName).actions.editRecord(data)
}

// <* ===========  Fetch selected Record  ========= *>
const useSelectedRecordHandler = ({ apiName, queryKey: userQueryKey = [], ...arg }) => {
    const Api = getCommonCrudApi(apiName)
    const moduleMode = useStore(Api.moduleState, (state) => state.commonCrud.moduleMode)
    const selectedRecord = Api.moduleState.state.commonCrud.selectedRecord ?? {}
    const action = formCurdActions({ apiName })('fetch')

    // Fetch record data
    const getRecordDataHandle = () => {
        const data = { action, ...selectedRecord }
        return Api.AjaxApi({ data, type: 'GET', rejectCallback: Api.actions.hideForm })
    }

    const queryKey = [apiName, action, selectedRecord, ...userQueryKey]
    Api.crudApi.queryKeys['selectedRecordHandlerKey'] = queryKey

    return useQuery({
        queryKey,
        queryFn: getRecordDataHandle,
        enabled: moduleMode == "EDIT",
        ...arg
    })
}

// <* ===========  Delete Record  ========= *>
const deleteRecordHandler = ({ apiName, data = {} }) => {
    getCommonCrudApi(apiName).actions.deleteRecord(data)
}

const useDeleteRecordHandler = ({ apiName, mutationKey = [] }) => {
    const Api = getCommonCrudApi(apiName)
    const action = formCurdActions({ apiName })("delete")
    const selectedRecord = Api.moduleState.state.commonCrud.selectedRecord ?? {}

    const deleteRecordHandler = async (deleteData = {}) => {
        const data = { action, ...selectedRecord, ...deleteData }
        const callback = () => {
            Api.actions.resetCrud()
            queryClient.invalidateQueries({ queryKey: [apiName] });
        }
        return Api.AjaxApi({ data, callback })
    }

    const queryKey = [apiName, action, selectedRecord, ...mutationKey]
    Api.crudApi.queryKeys['deleteRecordHandlerKey'] = queryKey


    return useMutation({
        mutationKey: queryKey,
        mutationFn: deleteRecordHandler,
    })
}

// <* ============================= *>
// <* ===========  CRUD  ========= *>
// <* ============================= *>

export const createCommonCrudHandler = ({ apiName }) => {
    return {
        useSubmitHandler: (arg = {}) => useSubmitHandler({ apiName, ...arg }),
        useFilterSubmitHandler: (arg = {}) => useFilterSubmitHandler({ apiName, ...arg }),
        useDataHandler: (arg = {}) => useDataHandler({ apiName, ...arg }),
        addRecordHandler: (arg = {}) => addRecordHandler({ apiName, ...arg }),
        editRecordHandler: (arg = {}) => editRecordHandler({ apiName, ...arg }),
        useSelectedRecordHandler: (arg = {}) => useSelectedRecordHandler({ apiName, ...arg }),
        deleteRecordHandler: (arg = {}) => deleteRecordHandler({ apiName, ...arg }),
        useDeleteRecordHandler: (arg = {}) => useDeleteRecordHandler({ apiName, ...arg }),
    }
}