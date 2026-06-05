import Filter from '@/Components/ui/filter'
import { Input } from '@/Components/ui/input'
import React from 'react'

export default function OrderHeader() {
    const list = ["Elec", "Clothes", "Toys", "Grocery"]
    return (
        <div className='border text-md-font mt-2 ml-4 mr-4'>
            <div className='flex justify-between items-center gap-2'>
                <div className='flex gap-2 p-2'>
                    <button className='p-2'>All Orders</button>
                    <button className='p-2'>Paid</button>
                    <button className='p-2'>Unpaid</button>
                    <button className='p-2'>Compeleted</button>
                </div>
                <span className='text-sm-font p-2 mr-2'>
                    Showing 84 result
                </span>
            </div>
            <hr className='ml-6 mr-6' />
            <div className='flex justify-between p-3'>
                <Input placeholder='...Search' className='max-w-124 p-2' />
                <Filter filterList={list} />
            </div>
        </div>
    )
}
