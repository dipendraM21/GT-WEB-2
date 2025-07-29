import { CommonCrudView } from '@commonCrud/CommonElement/CommonCrudView';
import { withModuleProvider } from '@providers/ModuleProvider';
import React, { useMemo } from 'react'
import { CommonFormElement } from '@commonCrud/CommonElement/CommonFormElement';
import { CommonFilterSearch } from '@commonCrud/CommonElement/CommonFilter';
import { UserFrom } from './UserFrom';
import { AddRecord, DeleteRecord, EditRecord } from '@commonCrud/CommonElement/CommonAction';
import { ModuleBreadCrumb } from '@components/ModuleBreadCrumb';

const User = () => {
    const columns = useMemo(() => [
        {
            header: 'Name',
            accessorKey: 'full_name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
            size: '250'
        },
        {
            header: 'Number',
            cell: ({ row }) => (
                <span>
                    {row.original.country_code}  {row.original.mobile}
                </span>
            ),
            size: '200'
        },
        {
            header: 'Role',
            cell: ({ row }) => {
                return <span className={`badge badge-secondary`}>{row.original.role}</span>
            }
        },
        {
            header: 'status',
            cell: ({ row }) => {
                return <span className={`badge ${row.original.status ? "badge-success" : "badge-danger"}`}>{row.original.status ? "Active" : "In-Active"}</span>
            }
        },
        {
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2 items-center">
                        <EditRecord id={row.original._id} />
                        <DeleteRecord id={row.original._id} />
                    </div>
                )
            }
        },
    ], []);

    return (
        <div>
            <ModuleBreadCrumb pageTitle={'User'}>
                <AddRecord />
            </ModuleBreadCrumb>

            <div className="flex">
                <div className="card">
                    <div className="card-header justify-end">
                        <CommonFilterSearch />
                    </div>
                    <div className="card-body">
                        <CommonCrudView columns={columns} />
                    </div>
                </div>
            </div>

            <CommonFormElement form={UserFrom} />
        </div>
    )
}

export default withModuleProvider(User, 'user');
