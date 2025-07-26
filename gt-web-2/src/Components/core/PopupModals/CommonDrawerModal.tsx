import React, { FC } from 'react'
import { Drawer } from 'antd';
import { CommonDrawerModalProps } from '@/types/module/commonModule';
import { Divider } from 'theme-ui';

const CommonDrawerModal: FC<CommonDrawerModalProps> = ({
    open,
    onClose,
    children,
    title,
    placement,
    loading,
    styles,
    width,
    height,
    ...porps
}) => {
    return (
        <div>
            <Drawer
                placement={placement}
                loading={loading}
                styles={styles}
                open={open}
                width={width}
                height={height}
                // title={title}
                onClose={onClose}
                {...porps}
            >
                {/* <div className='flex p-0'>

                </div>
                <Divider color='black' className='w-full px-0' /> */}
                {children}
            </Drawer>
        </div>
    )
}

export default CommonDrawerModal
