import Filter from '@/Components/ui/filter'
import { Input } from '@/Components/ui/input'
import React from 'react'

export default function OrderHeader() {
    const list = ["Elec", "Clothes", "Toys", "Grocery"]
    return (
        <div className='border text-sm-font sm:text-md-font mt-2 sm:ml-4 sm:mr-4'>
            <div className='flex justify-between items-center gap-2'>
                <div className='flex gap-2 p-2'>
                    <button className='p-1 hover:bg-primary hover:text-white transition-all ease-in-out duration-400 rounded-md '>All Orders</button>
                    <button className='p-1 hover:bg-primary hover:text-white transition-all ease-in-out duration-400 rounded-md '>Paid</button>
                    <button className='p-1 hover:bg-primary hover:text-white transition-all ease-in-out duration-400 rounded-md '>Unpaid</button>
                    <button className='p-1 hover:bg-primary hover:text-white transition-all ease-in-out duration-400 rounded-md '>Compeleted</button>
                </div>
                <span className='text-xs p-2 mr-2'>
                     84 result
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
