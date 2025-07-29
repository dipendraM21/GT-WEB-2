import { useModuleApi } from '@providers/ModuleProvider';
import { Pencil, Trash } from 'lucide-react';
import React from 'react'

export const AddRecord = () => {
    const API = useModuleApi()
    const { addRecordHandler } = API.crudApi.crudHandler;
    return (
        <button className='btn btn-primary' onClick={addRecordHandler}>Add {API.pageTitle}</button>
    )
}

export const EditRecord = ({ id }) => {
    const API = useModuleApi()
    const { editRecordHandler } = API.crudApi.crudHandler;
    return (
        <button className='btn btn-sm btn-outline btn-primary p-2' title={`Edit ${API.pageTitle}`} onClick={() => editRecordHandler({ data: { id } })}><Pencil size={13} /></button>
    )
}


export const DeleteRecord = ({ id }) => {
    const API = useModuleApi()
    const { deleteRecordHandler } = API.crudApi.crudHandler;
    return (
        <button className='btn btn-sm btn-outline btn-danger p-2' title={`Delete ${API.pageTitle}`} onClick={() => deleteRecordHandler({ data: { id } })}><Trash size={13} /></button>
    )
}