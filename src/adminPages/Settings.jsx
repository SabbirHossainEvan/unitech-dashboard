import React from 'react'
import UserProfileForm from '../adminComponents/UserProfileForm'
import CreateAccountForm from '../adminComponents/CreateAccountForm'

export default function Settings() {
  return (
    <div className='flex p-10 gap-8'>
        <section className='w-full'>
            <UserProfileForm></UserProfileForm>
        </section>
        <section className='w-full'>
            <CreateAccountForm></CreateAccountForm>
        </section>
    </div>
  )
}
