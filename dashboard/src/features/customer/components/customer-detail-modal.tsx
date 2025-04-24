"use client"

import { Button, Card, Modal, Skeleton } from 'antd'
import React from 'react'
import useCustomerDetail from '../hooks/use-customer-detail'
import TypographyUtils from '@/utils/typography'
import { COLORS } from '../../../../tailwind.config'

interface Props {
  id: number | null
  onClose: () => void
}

const CustomerDetailModal = (props:Props) => {
  const { id , onClose} = props

  const { data , isLoading} = useCustomerDetail(id!)

  return (
    <Modal
    open={!!id}
    footer={null}
    onCancel={onClose}
    onClose={onClose}
    >

      {isLoading && <Skeleton active />}
      
      {!isLoading && <div className='flex flex-col gap-y-2 mt-6'>
          <Card className='!border-secondary' styles={{
            body: {
              padding: "8px",
              borderColor: `1px solid ${COLORS.secondary.DEFAULT}`
            }
          }}>
            <div className='w-full flex justify-between'>
              <div>Account Number</div>
              <div className='font-semibold'>{data?.data.data.bank_account.account_number}</div>
            </div>
            <div className='mt-1 text-center w-full text-2xl font-bold text-primary'>
              {TypographyUtils.formatRupiah(data?.data.data.bank_account.balance ?? 0)}
            </div>
          </Card>
          <Card className='!border-secondary' styles={{
            body: {
              padding: "8px"
            }
          }}>
            <div className='flex justify-between w-full items-center'>
              <div>Deposit</div>
              <div className='font-semibold text-xl text-primary'>{TypographyUtils.formatRupiah(data?.data.data.term_deposit.amount ?? 0)}</div>
              <div>{data?.data.data.term_deposit.end_date}</div>
            </div>
          </Card>
          
          <h2>Pocket</h2>
          <div className='grid grid-cols-2 gap-3'>
            {data?.data.data.pockets?.map((pocket,i) => (
              <Card className='!border-secondary'
              styles={{
                body: {
                  padding: "12px"
                }
              }}
              key={i}>
                <div>{pocket.pocket_name}</div>
                <div className='mt-1 text-center font-semibold text-xl text-primary'>
                  {TypographyUtils.formatRupiah(pocket.balance ?? 0)}
                </div>
              </Card>
            ))}
          </div>

          <div className='w-full flex justify-center mt-2'>
            <Button className='w-full' onClick={onClose}>Close</Button>
          </div>
        </div>}
    </Modal>
  )
}

export default CustomerDetailModal