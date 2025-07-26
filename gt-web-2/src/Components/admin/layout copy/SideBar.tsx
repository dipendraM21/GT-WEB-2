'use client'

import fareIcon from '@/../public/svg/fare-icon.svg'
import { MenuItemProps } from '@/types/module/adminModules/sideBarModule'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaReceipt, FaTachometerAlt, FaUserMd } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

const Scrollbars = dynamic(() => import('react-custom-scrollbars-2'), {
  ssr: false,
})

export const Sidebar = () => {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const toggleMenu = (id: string) => {
    setOpenMenu((prev) => (prev === id ? null : id))
  }

  const menuItems: MenuItemProps[] = [
    {
      title: translation?.DASHBOARD,
      path: appRoutes?.dashboard,
      icon: <FaTachometerAlt />,
      isSubOption: false,
      id: 'menu_item_1',
    },
    {
      title: translation?.USER_MANAGEMENT,
      path: '#',
      icon: <FaUserMd />,
      isSubOption: true,
      id: 'menu_item_2',
      subOption: [
        {
          title: translation?.USER_LIST,
          path: appRoutes?.userRequests,
          icon: <BsFillPersonCheckFill />,
          isMultiOption: false,
        },
      ],
    },
    {
      title: translation?.FARE_MANAGEMANT,
      path: '#',
      icon: <Image width={20} height={20} src={fareIcon} alt="fare-icon" />,
      isSubOption: true,
      id: 'menu_item_3',
      subOption: [
        {
          title: translation?.COUPON_MANAGEMENT,
          path: appRoutes?.surfCoupons,
          icon: <BsFillPersonCheckFill />,
          isMultiOption: false,
        },
        {
          title: translation?.MARKUP_MANAGEMENT,
          path: appRoutes?.markupManagement,
          icon: <BsFillPersonCheckFill />,
          isMultiOption: false,
        },
      ],
    },
    {
      title: translation?.ACCOUNTING,
      path: '#',
      icon: <FaTachometerAlt />,
      id: 'menu_item_4',
      isSubOption: true,
      subOption: [
        {
          title: translation?.BOOKING_MANAGEMENT,
          path: appRoutes?.bookingManagement,
          icon: <FaReceipt />,
          isMultiOption: false,
        },
        {
          title: translation?.MY_BOOKINGS,
          path: appRoutes?.myBookings,
          icon: <FaReceipt />,
          isMultiOption: false,
        },
        {
          title: translation?.LEDGER_MANAGEMENT,
          path: appRoutes?.ledgerManagement,
          icon: <FaReceipt />,
          isMultiOption: false,
        },
      ],
    },
    {
      title: translation?.QUEUES_MANAGEMENT,
      path: '#',
      icon: <FaReceipt />,
      isSubOption: true,
      id: 'menu_item_5',
      subOption: [
        {
          title: translation?.CANCELLATION_QUEUES,
          path: appRoutes?.cancellationQueuesManagement,
          icon: <FaReceipt />,
          isMultiOption: false,
        },
        {
          title: translation?.RESCHEDULE_QUEUES,
          path: appRoutes?.rescheduleQueuesManagement,
          icon: <FaReceipt />,
          isMultiOption: false,
        },
        {
          title: translation?.HOLD_QUEUES,
          path: appRoutes?.holdQueuesManagement,
          icon: <FaReceipt />,
          isMultiOption: false,
        },
      ],
    },
    {
      title: translation?.TRANSACTION_MANAGEMENT,
      path: '#',
      icon: <FaReceipt />,
      isSubOption: true,
      id: 'menu_item_6',
      subOption: [
        {
          title: translation?.TRANSACTION_LIST,
          path: appRoutes?.transactionManagement,
          icon: <FaReceipt />,
          isMultiOption: false,
        },
      ],
    },
  ]

  return (
    <div className="sidebar" id="sidebar">
      <Scrollbars style={{ width: 'auto', height: '100%' }} className="menu">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActiveParent =
                pathname === item.path ||
                item.subOption?.some((sub) => pathname === sub.path)
              const isOpen = openMenu === item.id
              return (
                <li
                  key={index}
                  className={`submenu ${isActiveParent ? 'active' : ''}`}
                >
                  <Link
                    href={item.path}
                    onClick={(e) => {
                      if (item.isSubOption) {
                        e.preventDefault()
                        toggleMenu(item.id)
                      }
                    }}
                    className={`no-underline flex items-center justify-between px-3 py-20 rounded-lg transition-all ${
                      isActiveParent
                        ? 'bg-gray-100 text-blue-600'
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <div className="p-2 rounded bg-gray-100 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </span>
                    {item.isSubOption && (
                      <span className="flex items-center justify-center ml-auto">
                        {isOpen ? (
                          <IoIosArrowDown size={20} />
                        ) : (
                          <IoIosArrowForward size={20} />
                        )}
                      </span>
                    )}
                  </Link>

                  {item.isSubOption &&
                    item?.subOption?.length &&
                    item?.subOption?.length > 0 && (
                      <ul
                        className={`transition-all duration-200 ease-in-out overflow-hidden ${
                          isOpen ? 'block' : 'hidden'
                        }`}
                      >
                        {item?.subOption?.map((subItem, subIndex) => (
                          <li key={subIndex} className="mt-1">
                            <Link
                              href={subItem.path}
                              className={`no-underline flex items-center gap-3 pr-4 pl-[34px] py-2 rounded-lg transition-all w-full ${
                                pathname === subItem.path
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <div className="p-2 rounded bg-blue-100 flex items-center justify-center">
                                {subItem.icon}
                              </div>
                              <span className="font-medium">
                                {subItem.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              )
            })}
          </ul>
        </div>
      </Scrollbars>
    </div>
  )
}

export default Sidebar
