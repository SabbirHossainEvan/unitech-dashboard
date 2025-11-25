import React from 'react'
import FeePaymentStatusTable from '../adminComponents/FeePaymentStatusTable'
import PaymentForm from '../adminComponents/PaymentForm'

export default function PaymentInfo() {
  return (
    <div className="p-4  min-h-screen flex gap-5">
        <section className="w-full">
            <FeePaymentStatusTable></FeePaymentStatusTable>
        </section>
        <section className='w-99 mt-10'>
            <PaymentForm></PaymentForm>
        </section>
    </div>
  )
}
