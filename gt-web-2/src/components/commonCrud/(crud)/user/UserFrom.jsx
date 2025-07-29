import { FormField } from '@commonHelper/formValidation/FormField';
import { Modal } from '@components/ui/Modal'
import { useModuleApi } from '@providers/ModuleProvider';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';

export const UserFrom = ({ isUpdateRecord, fetchRecord, toggle }) => {
    const API = useModuleApi()
    const { useSubmitHandler } = API.crudApi.crudHandler;

    const formApi = useForm({
        mode: "all",
        defaultValues: fetchRecord,
    });

    const { handleSubmit } = formApi


    const options = {
        role: [{ label: 'Admin', value: 'Admin' }]
    }

    const { isPending, mutate } = useSubmitHandler()

    const submitHandler = (data) => {
        mutate({ data, control: formApi.control })
    }

    return (
        <Modal open={true} onClose={toggle} className='modal-md' title={`${isUpdateRecord ? 'Update' : 'Add'} ${API.pageTitle}`} >
            <FormProvider {...formApi} >
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-2">
                    <FormField name='first_name' label={"First Name"} validateRule={{ required: true }} />
                    <FormField name='last_name' label={"Last Name"} validateRule={{ required: true }} />
                    <FormField name={'email'} label={'Email'} validateRule={{ required: true, validType: 'email' }} />
                    <FormField name={'status'} label={'Status'} type='checkbox' validateRule={{ required: true }} />
                    <FormField name={'role'} label={'Role'} type='select' options={options.role} validateRule={{ required: true }} menuPlacement="top" />
                    {/* <div className="">
                        <label>Phone Number</label>
                        <div className="grid sm:grid-cols-3 gap-2 sm:gap-0">
                            <FormField errorName={'Country Code'} name='country_code' type='select' options={options.role} validateRule={{ required: true }} menuPlacement="top" />
                            <div className="col-span-2">
                                <FormField errorName='Mobile Number' name={'mobile'} options={options.role} validateRule={{ required: true }} menuPlacement="top" />
                            </div>
                        </div>
                    </div> */}
                    <div className="flex justify-end mt-3">
                        <button type='submit' disabled={isPending} className='btn btn-primary'>{isUpdateRecord ? 'Update' : 'Create'} {API.pageTitle}</button>
                    </div>
                </form>
            </FormProvider>
        </Modal >
    )
}

