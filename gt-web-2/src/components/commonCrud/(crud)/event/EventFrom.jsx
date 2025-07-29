import { FormField } from '@commonHelper/formValidation/FormField';
import { Modal } from '@components/ui/Modal'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';

export const EventFrom = ({ fetchRecord, toggle }) => {

    const validateRules = {
        first_name: { required: true },
        lastName: { required: true },
        dob: { fixedPastDate: true }
    }

    const formApi = useForm({
        mode: "all",
        defaultValues: fetchRecord,
    });

    const { handleSubmit } = formApi

    console.log("form render")

    return (
        <Modal open={true} onClose={toggle} className='modal-lg' title={'Event'} >
            <FormProvider {...formApi} validateRules={validateRules}>
                <form onSubmit={handleSubmit(() => { })} className="space-y-2">

                    <FormField name='test' type='select' options={Array.from({ length: 50 }, (_, value) => (value++, { label: `${value}`, value }))} />

                    <FormField label={'Last Name'} name={'last_name'} validateRule={validateRules.lastName} />
                    <FormField label={'DOB'} type='datetime-local' name={'user_email'} validateRule={validateRules.dob} />


                    <FormField label={'Data'} type='date' name={'Data3'} />
                    <FormField label={'Data'} type='time' name={'Data2'} />

                    <FormField label={'Data'} type='file' name={'Data1'} validateRule={{ required: true }} />
                    <FormField label={'Data'} type='date' name={'Data4'} />
                    <button type='submit' className='btn btn-primary'>Save</button>
                </form>
            </FormProvider>
        </Modal>
    )
}
