'use client'
import FlightBookingCard from '@/components/shared/Card/FlightBookingCard'
import CommonDrawerModal from '@/components/shared/PopupModals/CommonDrawerModal'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { sortOptionsList } from '@/utils/constant'
import { translation } from '@/utils/translation'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box } from 'theme-ui'
import { ThemeButton } from '../../core/Button/Button'
import FlightFiltersPanel from './FlightFiltersPanel'
import FlightSortTabs from './FlightSortTabs'

const FlightListing = () => {
  const { loading, getFlightListingData } = useSelector(
    (state: MainStoreType) => state.flightBookingData
  )
  const [openDrawerModal, setOpenDrawerModal] = useState<boolean>(false)
  const [activeSort, setActiveSort] = useState('smart')

  const handleSortChange = (value: string) => {
    setActiveSort(value)
  }

  const updatedOptions = sortOptionsList.map((opt) => ({
    ...opt,
    active: opt.value === activeSort,
  }))
  const handleCloseDrawer = () => {
    setOpenDrawerModal(false)
  }

  return (
    <Box as="div" className="min-h-screen py-10 pt-80">
      <div className="gap-[20px] container mx-auto grid grid-cols-1 md:grid-cols-12">
        <FlightFiltersPanel />
        <div className="col-span-12 md:col-span-12 lg:col-span-8 2xl:col-span-9 space-y-5">
          <FlightSortTabs
            sortOptions={updatedOptions}
            onSortChange={handleSortChange}
          />
          <Box as="div" className="flex justify-start items-center">
            <ThemeButton
              textColor="primary_spinach"
              text={translation?.CHANGE_SEARCH}
              variant="primaryBorderBtn"
              textVariant="Maison16Medium20"
            />
          </Box>
          {getFlightListingData?.map((itm, idx) => (
            <FlightBookingCard
              key={itm?.fares?.[0]?.fareIdentifier || idx}
              FareData={itm?.fares}
              segMentData={itm?.segments}
              onDetailsClick={() => setOpenDrawerModal(true)}
              translation={{
                BOOK: translation?.BOOK,
                FLIGHT_DETAILS: translation?.FLIGHT_DETAILS,
              }}
              item={undefined}
            />
          ))}
        </div>
        <CommonDrawerModal
          style={{ backgroundColor: '#F7F5F2' }}
          placement="right"
          title={translation?.FLIGHT_DETAILS}
          width={1000}
          open={openDrawerModal}
          onClose={handleCloseDrawer}
          children={undefined}
        ></CommonDrawerModal>
      </div>
    </Box>
  )
  {
    /* <Box as="div" className="min-h-screen py-10 pt-80">
        <div className="gap-[20px] container mx-auto grid grid-cols-1 md:grid-cols-12">
          <FlightFiltersPanel />
          <div className="col-span-12 md:col-span-12 lg:col-span-8 2xl:col-span-9 space-y-5">
            <FlightSortTabs
              sortOptions={updatedOptions}
              onSortChange={handleSortChange}
            />
            {getFlightListingData?.map((itm, idx) => (
              <FlightBookingCard
                FareData={itm?.fares}
                segMentData={itm?.segments}
                onClickBook={() => console.log('Booking...', idx)}
                onDetailsClick={() => setOpenDrawerModal(true)}
                translation={{
                  BOOK: translation?.BOOK,
                  FLIGHT_DETAILS: translation?.FLIGHT_DETAILS,
                }}
                item={undefined}
              />
            ))}
          </div>
          <CommonDrawerModal
            style={{ backgroundColor: '#F7F5F2' }}
            placement="right"
            title={translation?.FLIGHT_DETAILS}
            width={1000}
            open={openDrawerModal}
            onClose={handleCloseDrawer}
          >
            <div className="p-20">
              <FromToHeadingText from={'New Delhi'} to={'Mumbai'} />
              <Box className="flex gap-2 items-center mr-t-35">
                <Image src={flight} alt="itm-src" height={40} width={40} />
                <Box className="flex flex-col gap-2 items-baseline">
                  <Text variant="Maison18Regular20" color="primaryText">
                    IndiGo |
                    <Text variant="Maison16Regular20" color="grey1" as="span">
                      {' '}
                      6E 519
                    </Text>
                  </Text>
                </Box>
              </Box>

              <div className="flex items-start w-full justify-between mr-t-20">
                <FlightScheduleInfo
                  date="Tue, 22 Apr"
                  time="20:15"
                  airportCode="DEL"
                  city="New Delhi"
                  airportName="Delhi Indira Gandhi International Airport"
                  terminal="Terminal 1D"
                />

                <div className="flex flex-col items-center justify-center pt-8">
                  <div className="w-[80px] h-[1px] bg-gray-300 relative mb-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full absolute -left-1 top-[-5px]" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full absolute -right-1 top-[-5px]" />
                  </div>
                  <span className="text-sm text-gray-500">2h 15m</span>
                </div>

                <FlightScheduleInfo
                  date="Tue, 22 Apr"
                  time="22:30"
                  airportCode="HYD"
                  city="Hyderabad"
                  airportName="Rajiv Gandhi International Airport"
                  terminal="--"
                />
              </div>
            </div>
          </CommonDrawerModal>
        </div>
      </Box> */
  }
}

export default FlightListing
