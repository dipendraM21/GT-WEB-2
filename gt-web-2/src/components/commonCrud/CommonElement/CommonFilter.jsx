import { FormField } from '@commonHelper/formValidation/FormField'
import { getSearchParams } from '@commonHelper/SearchParams'
import { cn } from '@lib/utils'
import { useModuleApi } from '@providers/ModuleProvider'
import { useIsFetching } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-store'
import { AlignJustify, X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const CommonFilter = ({ className, children }) => {
    const formRef = useRef()
    const API = useModuleApi()
    const filterShow = useStore(API.moduleState, (state) => state.filterShow)
    const { crudHandler: { useFilterSubmitHandler } } = API.crudApi;

    const formApi = useForm({
        mode: "all",
        defaultValues: getSearchParams().filters,
    });

    API.moduleRef.filterFormRef = formApi


    useEffect(() => {
        formRef.current.querySelector(`[type='reset']`)?.addEventListener('click', () => {
            const resetFormValues = {}
            Object.keys(formApi.control._formValues).map((key) => resetFormValues[key] = '')
            formApi.reset(resetFormValues)
            formRef.current.requestSubmit()
        })
    }, [])

    const { mutate } = useFilterSubmitHandler()


    return (
        <FormProvider {...formApi} >
            <form ref={formRef} onSubmit={formApi.handleSubmit(mutate)}>
                <div className={cn('card flex-0 w-[250px] mr-4 fixed top-0 left-0 bottom-0 z-[13] lg:z-[0] lg:relative', !filterShow && "hidden")}>
                    <div className="card-header">
                        <span className='fs-14'>Filter Options</span>
                        <div className="close-btn" onClick={API.actions.toggleFilter}><X size={14} /></div>
                    </div>
                    <div className={`card-body overflow-y-auto space-y-3 ${className}`}>
                        {children}
                    </div>
                </div>
                <div className={cn(filterShow ? 'block' : 'hidden', 'modal-backdrop  lg:hidden z-[11]')} onClick={API.actions.toggleFilter}></div >
            </form>
        </FormProvider>
    )
}

export const CommonFilterCloseIcon = () => {
    const API = useModuleApi()

    return (
        <div onClick={API.actions.toggleFilter} className="cursor-pointer border border-primary-clarity rounded-md p-1 text-primary/90 font-bold bg-primary-clarity">
            <AlignJustify size={'16'} />
        </div >
    )
}

export const CommonFilterActionButton = () => {
    const API = useModuleApi()
    const isFetching = useIsFetching({ mutationKey: API.crudApi.queryKeys.dataHandlerKey })
    return (
        <div className="flex justify-end gap-2">
            <button type='reset' className='btn btn-secondary btn-sm' disabled={isFetching}>Reset</button>
            <button type='submit' className='btn btn-primary  btn-sm' disabled={isFetching}>Filter</button>
        </div>
    )
}

export const CommonFilterSearch = () => {
    const API = useModuleApi()
    const { crudHandler: { useFilterSubmitHandler } } = API.crudApi;

    const filterData = getSearchParams().filters

    const formApi = useForm({
        mode: "all",
        defaultValues: {
            search: (filterData && filterData.search) ?? ""
        },
    });

    const { mutate } = useFilterSubmitHandler()
    const isFetching = useIsFetching({ mutationKey: API.crudApi.queryKeys.dataHandlerKey })

    return (
        <FormProvider {...formApi} >
            <form onSubmit={formApi.handleSubmit(mutate)}>
                <FormField name={'search'} placeholder={'Search..'} disabled={isFetching} />
            </form>
        </FormProvider>
    )
}