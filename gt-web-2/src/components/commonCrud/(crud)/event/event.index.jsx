import { CommonCrudView } from '@commonCrud/CommonElement/CommonCrudView';
import { useModuleApi, withModuleProvider } from '@providers/ModuleProvider';
import React, { useMemo } from 'react'
import { EventFrom } from './EventFrom';
import { CommonFormElement } from '@commonCrud/CommonElement/CommonFormElement';
import { CommonFilter, CommonFilterActionButton, CommonFilterCloseIcon } from '@commonCrud/CommonElement/CommonFilter';
import { FormField } from '@commonHelper/formValidation/FormField';

const Event = () => {
    const API = useModuleApi()
    const { addRecordHandler } = API.crudApi.crudHandler;


    const columns = useMemo(() => [
        {
            header: 'templateStyle',
            accessorKey: 'templateStyle',
        },
        {
            header: 'status',
            accessorKey: 'status',
        },
        {
            header: 'Company Branch',
            accessorKey: 'company_branch_id',
        },
        {
            header: 'Is Default',
            accessorKey: 'is_default',
        },
    ], []);

    return (
        <div>
            <div className="mb-4 flex justify-end">
                <button className='btn btn-primary' onClick={addRecordHandler}>Add Event</button>
            </div>

            <div className="flex">
                <CommonFilter>
                    <FormField label={'Last Name'} name={'last_name'}  />
                    <FormField label={'Last Name'} name={'date'} type='date' />
                    <FormField label={'Last Name'} name={'number'} type='number' />
                    <FormField label={'Last Name'} name={'select'} type='select' options={[{ label: '1', value: '1' }]} />
                    <CommonFilterActionButton />
                </CommonFilter>
                <div className="card">
                    <div className="card-header">
                        <CommonFilterCloseIcon />
                    </div>
                    <div className="card-body">
                        <CommonCrudView columns={columns} />
                    </div>
                </div>
            </div>

            <CommonFormElement form={EventFrom} />
        </div>
    )
}

export default withModuleProvider(Event, 'event');
