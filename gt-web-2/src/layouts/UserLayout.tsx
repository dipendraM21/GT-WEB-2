'use client'
import { FC } from "react"
// import { CommonActionInit } from '@/components/commonAction/commonAction'
// import Providers from '@/store/provider'
// import { usePathname } from 'next/navigation'
// import React, { FC } from 'react'


const UserLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
    {/* <Providers> */}
      {/* <CommonActionInit /> */}
      {/* {isAdmin ? null : <Navbar />} */}
      <main className="flex-1">{children}</main>
      {/* {isAdmin ? null : <Footer />} */}
    {/* </Providers> */}
    </>
  )
}

export default UserLayout
