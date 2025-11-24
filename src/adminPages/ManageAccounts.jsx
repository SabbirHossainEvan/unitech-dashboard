import React from 'react'
import { UserAccountList } from '../adminComponents/UserAccountList'
import FilterSearchSection from '../adminComponents/FilterSearchSection'

export default function ManageAccounts() {
  return (
    <div className="p-4  min-h-screen flex gap-5">
        <section className="w-full">
            <UserAccountList></UserAccountList>
        </section>

        <section className='w-90 mt-10'>
            <FilterSearchSection></FilterSearchSection>
        </section>
    </div>
  )
}
