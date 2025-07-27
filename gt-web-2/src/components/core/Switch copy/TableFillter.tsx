import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, TableColumnType } from 'antd';
import React from 'react';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { isNullOrUndef } from '@/utils/functions';

interface TableColumnSearchProps {
    dataIndex: string;
    onChange: (key: string, value: string) => void;
    queryValue: Record<string, any>;
    type?: 'Dropdown' | 'Text';
    filters?: { text: string; value: string }[];
}

const UseTableColumnFilter = <T extends object>({
    dataIndex,
    onChange,
    queryValue,
    type = 'Text',
}: TableColumnSearchProps): TableColumnType<T> => {
    const handleSearch = (selectedKeys: React.Key[], dataIndex: string) => {
        onChange(dataIndex, selectedKeys[0] as string);
    };

    const handleReset = (clearFilters: (() => void) | undefined) => {
        if (clearFilters) clearFilters();
        onChange(dataIndex, '');
    };
    return {
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }: FilterDropdownProps) => (
            <div
                style={{ padding: type === 'Dropdown' ? 6 : 8 }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0] || queryValue[dataIndex]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            handleReset(clearFilters);
                            confirm({ closeDropdown: false });
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => close()}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value: React.Key | boolean, record: any) =>
            String(record[dataIndex])
                .toLowerCase()
                .includes(String(value).toLowerCase()),
        filtered: !isNullOrUndef(queryValue[dataIndex]),
    };
};

export default UseTableColumnFilter;
