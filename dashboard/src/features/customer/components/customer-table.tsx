"use client"

import { useDebounce } from '@/hooks/use-debounce';
import { OrderBy, QueryParams } from '@/types/query-params';
import { Card, SelectProps, TableProps } from 'antd';
import React, { useEffect, useState } from 'react'
import useCustomerList from '../hooks/use-customer-list';
import { CustomerSchema } from '../schema/customer.schema';
import SearchBox from '@/components/form/input/search-box';
import CoreSelect from '@/components/form/select/select';
import CoreTable from '@/components/table/table';
import { EyeOutlined } from '@ant-design/icons';
import CustomerDetailModal from './customer-detail-modal';

const CustomerTable = () => {
  const [search, setSearch] = useState<string>("");
  const [customerDetail, setCustomerDetail] = useState<number 
   |null>(null)
  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    order_by: OrderBy.DESC,
    search: "",
    sort_by: "created_at",
  });

 
  const orderByOptions: SelectProps ["options"] = Object.values(OrderBy).map(
    (order) => ({
      label: order === OrderBy.ASC ? "Oldest" : "Newest",
      value: order,
    }),
  );

  const searchDebounceValue = useDebounce({ value: search });

  const { data, isLoading } = useCustomerList(queryParams);

  const columns: TableProps<CustomerSchema>["columns"] = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      sorter: (a, b) => b.full_name.localeCompare(a.full_name),
    },
    {
      title: "Account Number",
      dataIndex: "account_number",
      key: "account_number",
    },
    {
      title: "Account Type",
      dataIndex: "account_type",
      key: "account_type",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 80,
      render: (_, records) => (
        <EyeOutlined className='cursor-pointer' onClick={() => setCustomerDetail(records.id)}/>
      ),
    },
  ];

  useEffect(() => {
    setQueryParams((prev) => ({ ...prev, search: searchDebounceValue }));
  }, [searchDebounceValue]);

  return (
    <Card>
      <div className="flex items-center gap-x-4 mb-4">
        <SearchBox
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="!bg-gray-middle"
          placeholder="Search"
        />
        <div className="w-full flex justify-between gap-x-4">
          <CoreSelect
            onChange={(val) =>
              setQueryParams((prev) => ({ ...prev, order_by: val }))
            }
            value={queryParams.order_by}
            options={orderByOptions}
          />
          <div className="w-full" />
          <div className="w-full" />
        </div>
      </div>
      <CoreTable<CustomerSchema>
        dataSource={data?.data.data.records || []}
        loading={isLoading}
        columns={columns}
        pagination={{
          pageSize: queryParams.limit,
          current: data?.data.data.current_page,
          total: data?.data.data.total_records,
          onChange: (page) => setQueryParams((prev) => ({ ...prev, page })),
        }}
        rowKey={(row) => row.id}
      />
      {customerDetail && (

      <CustomerDetailModal id={customerDetail} onClose={() => setCustomerDetail(null)} />
      )}
    </Card>
  );
};

export default CustomerTable