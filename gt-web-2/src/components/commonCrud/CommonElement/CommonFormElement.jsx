/* eslint-disable no-unused-vars */
import { Loader } from "@components/loader";
import { Modal } from "@components/ui/Modal";
import { useModuleApi } from "@providers/ModuleProvider";
import { useStore } from "@tanstack/react-store";

export const CommonFormElement = ({ form: FormElement }) => {
    const API = useModuleApi()
    const moduleMode = useStore(API.moduleState, (state) => state.commonCrud.moduleMode)
    const { useSelectedRecordHandler } = API.crudApi.crudHandler;
    const { hideForm } = API.actions;

    const { data, isFetching } = useSelectedRecordHandler()
    // for helper variable
    const isUpdateRecord = moduleMode == 'EDIT'
    return (
        <>
            <CommonLoader loading={isFetching} />
            {(moduleMode == 'ADD' || (moduleMode == 'EDIT' && !isFetching && data)) && <FormElement toggle={hideForm} moduleMode={moduleMode} fetchRecord={isUpdateRecord ? data.data : {}} isUpdateRecord={isUpdateRecord} />}
        </>
    );
}

export const CommonLoader = ({ loading }) => {
    return <>
        {loading && <Loader className="fixed" />}
    </>
}

export const DeleteRecordModal = () => {
    const API = useModuleApi()
    const moduleMode = useStore(API.moduleState, (state) => state.commonCrud.moduleMode)
    const { useDeleteRecordHandler } = API.crudApi.crudHandler;
    const { resetCrud } = API.actions;

    const { isPending, mutate } = useDeleteRecordHandler()
    return (
        <>
            {(moduleMode == 'DELETE') && (
                <Modal open={true} onClose={resetCrud} title={`Delete ${API.pageTitle}`}>
                    <p className="font-medium text-secondary">Are You Sure You Want Delete This {API.pageTitle}.</p>
                    <div className="flex gap-2 justify-center mt-5">
                        <button disabled={isPending} onClick={resetCrud} className="btn btn-light btn-sm btn-outline">No Cenacle</button>
                        <button disabled={isPending} onClick={() => mutate()} className="btn btn-danger btn-outline btn-sm">Yes Do'it</button>
                    </div>
                </Modal>
            )}
        </>
    );
};