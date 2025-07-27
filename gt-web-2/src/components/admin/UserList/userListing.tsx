'use client'
import { TextInputField } from '@/components/core/TextInputField/TextInputField'
import { ThemeButton } from '@/components/core/Button/Button'
import {
  getUsersData,
  manageUserAccess,
  setCurrentUserStatus,
} from '@/store/actions/user.action'
import { TableColumns } from '@/types/module/admin/tableModule'
import {
  UserData,
  UserPermissionsActions,
} from '@/types/module/admin/userModule'         
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { UserListFillterData } from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

export default function UserListing() {
  const dispatch = useDispatch()
  const itemsPerPage = 10
  const getUserData = useSelector((state: MainStoreType) => state.userData)
  const currentUserStatus = useSelector(
    (state: MainStoreType) => state.userData?.currentUserStatus
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [queryValue, setQueryValue] = useState<string>('')
  const router = useRouter()

  const handleClick = (type: UserPermissionsActions, email: string) => {
    dispatch(
      manageUserAccess(
        {
          userEmailId: email,
          approvedByAdmin: type === UserPermissionsActions.ALLOW ? true : false,
        },
        () => {}
      )
    )
  }

  useEffect(() => {
    if (currentPage) {
      router.push(`?currentpage=${currentPage}?userstatus=${currentUserStatus}`)
    }
  }, [router, currentPage, currentUserStatus])

  useEffect(() => {
    return () => {
      dispatch(getUsersData())
    }
  }, [dispatch])

  useEffect(() => {
    if (currentPage || currentUserStatus) {
      dispatch(
        getUsersData({
          pageNo: currentPage,
          userStatus: currentUserStatus as string,
        })
      )
    }
  }, [dispatch, currentPage, currentUserStatus])

  const userListColumns: TableColumns<UserData> = [
    {
      title: 'Sr',
      dataIndex: 'sr',
      key: 'sr',
      render: (_: string, __: UserData, index: number) =>
        (currentPage - 1) * itemsPerPage + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'fullName',
      render: (_, record: UserData) => (
        <Link
          className="text-decoration-unset user-link-primary"
          href={`${appRoutes?.userRequests}/${record._id}`}
        >
          {`${record.firstName} ${record.lastName}`}
        </Link>
      ),
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'mobileNumber', key: 'mobileNumber' },
    {
      title: 'City',
      dataIndex: 'address',
      key: 'city',
      render: (_: string, record: UserData) => `${record.address.city}`,
    },
    { title: 'Register As', dataIndex: 'registerAs', key: 'registerAs' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: UserData) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'details',
                label: (
                  <span onClick={() => handleDetails(record)}>Details</span>
                ),
              },
              {
                key: 'showTicket',
                label: (
                  <span onClick={() => handleShowTicket(record)}>
                    Show Ticket
                  </span>
                ),
              },
              {
                key: 'cancel',
                label: <span onClick={() => handleCancel(record)}>Cancel</span>,
              },
              {
                key: 'reschedule',
                label: (
                  <span onClick={() => handleReschedule(record)}>
                    Reschedule
                  </span>
                ),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button shape="circle" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  const handleFilterChange = (value: string) => {
    setQueryValue(value)
  }

  const handleClickSubmit = useCallback(() => {
    dispatch(
      getUsersData({
        pageNo: currentPage,
        userStatus: currentUserStatus as string,
        queryParameter: queryValue,
      })
    )
  }, [dispatch, currentPage, currentUserStatus, queryValue])

  const handleClickCancel = () => {
    setQueryValue('')
    dispatch(
      getUsersData({
        pageNo: currentPage,
        userStatus: currentUserStatus as string,
        queryParameter: '',
      })
    )
  }

  const actionMenu = (record: UserData) => (
    <Menu>
      <Menu.Item key="details" onClick={() => handleDetails(record)}>
        Details
      </Menu.Item>
      <Menu.Item key="showTicket" onClick={() => handleShowTicket(record)}>
        Show Ticket
      </Menu.Item>
      <Menu.Item key="cancel" onClick={() => handleCancel(record)}>
        Cancel
      </Menu.Item>
      <Menu.Item key="reschedule" onClick={() => handleReschedule(record)}>
        Reschedule
      </Menu.Item>
    </Menu>
  )

  const handleDetails = (record: UserData) => {
    // Implement navigation or modal for details
  }

  const handleShowTicket = (record: UserData) => {
    // Implement navigation or modal for ticket
  }

  const handleCancel = (record: UserData) => {
    // Implement cancel logic
  }

  const handleReschedule = (record: UserData) => {
    // Implement reschedule logic
  }

  return (
    <div>
      {/* <TablePageComponent
        pageTitle={translation?.USER_LIST}
        loading={getUserData.loading}
        columns={userListColumns}
        cancelBtnTitle={translation?.RESET}
        submitBtnTitle={translation?.SEARCH}
        totalPage={getUserData?.data?.totalUsers}
        pageSize={10}
        onChange={(page) => {
          setCurrentPage(page)
        }}
        onClickfilltering={(value) => {
          setCurrentPage(1)
          dispatch(setCurrentUserStatus(value?.key))
        }}
        onInputChange={handleFilterChange}
        value={queryValue}
        activeTab={currentUserStatus as string}
        hasPagination
        filltering={UserListFillterData}
        submitBtnClick={handleClickSubmit}
        cancelBtnClick={handleClickCancel}
        dataSource={getUserData?.data?.users as UserData[]}
      /> */}

      <TablePageComponent
        heading={translation?.USER_LIST}
        loading={getUserData.loading}
        columns={userListColumns}
        totalPage={getUserData?.data?.totalUsers}
        pageSize={10}
        onChange={(page) => {
          setCurrentPage(page)
        }}
        hasPagination
        dataSource={getUserData?.data?.users as UserData[]}
        footerContent={
          <>
            <Box className="flex justify-content-between">
              <Box className="flex items-center flex-wrap gap-2">
                {UserListFillterData?.map((itm, idx) => (
                  <ThemeButton
                    className="cta-button tertiary-button-focused justify-end"
                    text={itm?.label}
                    sx={{
                      backgroundColor:
                        currentUserStatus === itm?.key
                          ? 'disableDarkBlue'
                          : 'yellow_status_bg',
                    }}
                    textSx={{
                      color:
                        currentUserStatus === itm?.key
                          ? 'white'
                          : 'primary_text_dark',
                    }}
                    key={`table-fillter-${idx}`}
                    onClick={() => {
                      setCurrentPage(1)
                      dispatch(setCurrentUserStatus(itm?.key))
                    }}
                    variant="secondary"
                  />
                ))}
              </Box>

              <div className="gp-8 table-fillter-container">
                <ThemeButton
                  variant="primary"
                  className="cta-button"
                  onClick={handleClickSubmit}
                  text={translation?.SEARCH}
                />
                <TextInputField
                  firstInputBox
                  value={queryValue}
                  onChange={handleFilterChange}
                  Inputsx={{ borderRadius: '6px' }}
                  inputWidth="table-fillter-input"
                />
              </div>
            </Box>
          </>
        }
      />
    </div>
  )
}
