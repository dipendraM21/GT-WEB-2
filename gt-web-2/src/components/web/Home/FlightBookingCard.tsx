'use client'
import {
  saveFlightSearchData,
  setFlightSearchRequest,
} from '@/store/actions/flightBooking.action'
import { DateRangeSelectionProps } from '@/types/module/web/dateRangeCalendarModule'
import { AirportDataItemsProps, CabinClass } from '@/types/module/web/flightSearch'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { flightBookingTabs, selecteTripOptions } from '@/utils/constant'
import { formatCabinClass } from '@/utils/functions'
import { translation } from '@/utils/translation'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { HiSwitchHorizontal } from 'react-icons/hi'
import { IoSearchOutline } from 'react-icons/io5'
import { MdFlightLand, MdFlightTakeoff } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Card } from 'theme-ui'
import CommonFlightSelect from '../FlightSelectCard/CommonFlightSelect'
import CommonTab from '@/components/core/Tabs/CommonTab'
import CommonRadioButton from '@/components/core/RadioButton/RadioButton'
import { TextInputField } from '@/components/core/TextInputField/TextInputField'
import DateSelectModal from '@/components/core/PopupModals/DateSelectModal'
import TravelClassSelector from '@/components/core/PopupModals/TravelClassSelector'
import { ThemeButton } from '@/components/core/Button/Button'

interface FlightBookingCardProps {
  label: string
  value: string
}

interface OpenDateRangeProps {
  departureDate: boolean
  returnDate: boolean
}

const FlightBookingCard: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const returnDateInputRef = useRef<HTMLInputElement>(null)
  const [country, setCountry] = useState<FlightBookingCardProps[] | []>([])
  const { flightFiltersData, loading } = useSelector(
    (state: MainStoreType) => state.flightBookingData
  )

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRangeSelectionProps[] | null
  >(null)

  const formattedDate = moment(selectedDateRange?.[0]?.startDate).format(
    "DD MMM'YY"
  )
  const formattedEndDate =
    selectedDateRange?.[0]?.startDate !== selectedDateRange?.[0]?.endDate
      ? moment(selectedDateRange?.[0]?.endDate).format("DD MMM'YY")
      : ''

  const [shouldFocusReturnDate, setShouldFocusReturnDate] = useState(false)
  const [showTravelModal, setShowTravelModal] = useState(false)
  const [openDateRange, setOpenDateRange] = useState<OpenDateRangeProps>({
    departureDate: false,
    returnDate: false,
  })

  const isRoundTrip = flightFiltersData?.journeyType === translation.ROUND_TRIP
  const returnDatePlaceholder = isRoundTrip
    ? translation.RETURN_ON
    : translation.TAP_TO_ADD_RETURN_DATE

  const handleOptionChange = (value: string) => {
    dispatch(saveFlightSearchData({ journeyType: value }))
  }

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection

    const currentRange = selectedDateRange?.[0] || {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }

    const isOneWay = flightFiltersData?.journeyType === translation.ONE_WAY

    let updatedStartDate = currentRange.startDate
    let updatedEndDate = currentRange.endDate

    if (isOneWay || openDateRange.departureDate) {
      updatedStartDate = selection.startDate
      updatedEndDate = isOneWay ? selection.startDate : currentRange.endDate
    }

    if (isRoundTrip && openDateRange.returnDate) {
      updatedEndDate = selection.endDate
    }

    const updatedRange = [
      {
        startDate: updatedStartDate,
        endDate: updatedEndDate,
        key: 'selection',
      },
    ]

    setSelectedDateRange(updatedRange)

    const payload: any = {}
    if (openDateRange.departureDate || isOneWay) {
      payload.departureDate = updatedStartDate
    }
    if (openDateRange.returnDate && isRoundTrip) {
      payload.returnDate = updatedEndDate
    }

    dispatch(saveFlightSearchData(payload))

    setOpenDateRange({
      departureDate: false,
      returnDate: false,
    })
  }

  // useEffect(() => {
  //   const airportsData = require('airports-json')
  //   const allAirports = airportsData?.airports || []

  //   const airportOptions = (allAirports as AirportDataItemsProps[])
  //     .filter(
  //       (a) =>
  //         a.iata_code && a.municipality && a.iso_country && a.type !== 'closed'
  //     )
  //     .map((a) => ({
  //       label: `(${a.iata_code}) ${a.municipality}`,
  //       value: a.iata_code,
  //     }))

  //   setCountry(airportOptions)
  // }, [])

  useEffect(() => {
    if (isRoundTrip && shouldFocusReturnDate) {
      returnDateInputRef.current?.focus()
      setShouldFocusReturnDate(false)
    }
  }, [isRoundTrip, shouldFocusReturnDate])

  useEffect(() => {
    if (
      flightFiltersData?.journeyType === translation.ONE_WAY &&
      selectedDateRange?.[0]
    ) {
      const { startDate, endDate, key } = selectedDateRange[0]
      if (startDate !== endDate) {
        setSelectedDateRange([{ startDate, endDate: startDate, key }])
      }
    }
  }, [flightFiltersData?.journeyType])

  const getTravellerSummary = () => {
    const passengers = flightFiltersData?.passengers || {}
    const totalTravellers =
      (parseInt(passengers.adults || '0') || 0) +
      (parseInt(passengers.children || '0') || 0) +
      (parseInt(passengers.infants || '0') || 0)

    const className = flightFiltersData?.cabinClass
      ? formatCabinClass(flightFiltersData.cabinClass)
      : 'Economy'

    return totalTravellers > 1
      ? `${totalTravellers} Traveller${totalTravellers > 1 ? 's' : ''}, ${className}`
      : ''
  }

  const getNormalizedRange = () => {
    return [
      {
        startDate: selectedDateRange?.[0]?.startDate || new Date(),
        endDate: isRoundTrip
          ? selectedDateRange?.[0]?.endDate || new Date()
          : selectedDateRange?.[0]?.startDate || new Date(),
        key: 'selection',
      },
    ]
  }

  const handleSubmit = () => {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      cabinClass,
      journeyType,
    } = flightFiltersData || {}

    if (!origin || !destination || !departureDate) {
      return
    }

    const routeInfos = [
      {
        fromCityOrAirport: { code: origin },
        toCityOrAirport: { code: destination },
        travelDate: new Date(departureDate).toISOString().slice(0, 10),
      },
    ]

    if (journeyType === translation.ROUND_TRIP && returnDate) {
      routeInfos.push({
        fromCityOrAirport: { code: destination },
        toCityOrAirport: { code: origin },
        travelDate: new Date(returnDate).toISOString().slice(0, 10),
      })
    }

    dispatch(
      setFlightSearchRequest(
        {
          searchQuery: {
            paxInfo: {
              ADULT: passengers?.adults || '0',
              CHILD: passengers?.children || '0',
              INFANT: passengers?.infants || '0',
            },
            cabinClass: cabinClass as CabinClass,
            routeInfos,
            searchModifiers: {
              isConnectingFlight: false,
              isDirectFlight: true,
            },
          },
        },
        (res) => {
          if (res) {
            // router?.push(appRoutes?.flightResult)
          }
        }
      )
    )
  }

  return (
    <div className="container">
      <Card className="booking-card">
        <CommonTab
          tabs={flightBookingTabs}
          activeTab="flight"
          iconSize={30}
          textVariant="Maison22Medium125"
          iconClass="booking-card-icon"
        />

        <CommonRadioButton
          options={selecteTripOptions}
          name="paymentOptions"
          textClass="mgl-10"
          selectedValue={flightFiltersData?.journeyType}
          onChange={handleOptionChange}
          mainClass="radio-group flex justify-start my-20 gap-4 item-center ml-20"
        />

        <Box className="grid grid-cols-12 gap-x-3 gap-y-20 w-full h-full">
          <div className="col-span-12 grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-6">
              <CommonFlightSelect
                options={country.filter(
                  (opt) => opt.value !== flightFiltersData?.destination
                )}
                label="From"
                classNames={{
                  control: () => 'common-flight-booking-card w-full br-l-10',
                  singleValue: () => 'w-390',
                }}
                placeholder="Origin"
                icon={<MdFlightTakeoff color={'black'} size={23} />}
                onChange={(val) => {
                  dispatch(saveFlightSearchData({ origin: val }))
                }}
              />
            </div>

            <div className="absolute left-1/2 top-1/2 translate-center z-10">
              <div
                className="rounded-full bg-white shadow-md border w-[34px] h-[34px] flex items-center justify-center cursor-pointer hover:rotate-180 transition-transform duration-300"
                onClick={() => {}}
              >
                <HiSwitchHorizontal size={22} />
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <CommonFlightSelect
                label="To"
                options={country.filter(
                  (opt) => opt.value !== flightFiltersData?.origin
                )}
                placeholder="Destination"
                icon={<MdFlightLand color={'black'} size={23} />}
                classNames={{
                  control: () => 'common-flight-booking-card w-full br-r-10',
                  singleValue: () => 'w-390',
                }}
                onChange={(val) => {
                  dispatch(saveFlightSearchData({ destination: val }))
                }}
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <TextInputField
              variant="secondaryInput"
              label="Departure Date:"
              labelColor="black_soft"
              labelVariant="Maison18Medium125"
              firstInputBox
              customClassName="br-l-10"
              placeholder="Onward Date"
              value={formattedDate}
              onClick={() => {
                setOpenDateRange({ returnDate: false, departureDate: true })
              }}
            />
            {openDateRange.departureDate && (
              <DateSelectModal
                isRoundTrip={isRoundTrip}
                selectedTrip={flightFiltersData?.journeyType}
                onClickRoundTrip={() => {
                  dispatch(
                    saveFlightSearchData({
                      journeyType: translation.ROUND_TRIP,
                    })
                  )
                }}
                ranges={getNormalizedRange()}
                onChange={handleSelect}
              />
            )}
          </div>

          <div
            className="col-span-12 md:col-span-4 cursor-pointer"
            onClick={() => {
              if (!isRoundTrip) {
                dispatch(
                  saveFlightSearchData({ journeyType: translation.ROUND_TRIP })
                )
              }
              setShouldFocusReturnDate(true)
              setOpenDateRange({ returnDate: true, departureDate: false })
            }}
          >
            <TextInputField
              ref={returnDateInputRef}
              firstInputBox
              variant="secondaryInput"
              label="Return Date:"
              labelVariant="Maison18Medium125"
              labelColor="black_soft"
              disabled={!isRoundTrip}
              value={formattedEndDate as string}
              wrapperClass="w-full"
              // customClassName="br-0"
              placeholder={returnDatePlaceholder}
            />
            {openDateRange.returnDate && (
              <DateSelectModal
                isRoundTrip={isRoundTrip}
                selectedTrip={flightFiltersData?.journeyType}
                ranges={getNormalizedRange()}
                onChange={handleSelect}
              />
            )}
          </div>

          {/* TRAVELLERS */}
          <div className="col-span-12 md:col-span-4 relative">
            <TextInputField
              variant="secondaryInput"
              labelVariant="Maison18Medium125"
              label="Travellers & Class:"
              labelColor="black_soft"
              firstInputBox
              wrapperClass="w-full"
              customClassName="br-r-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setShowTravelModal(!showTravelModal)
              }}
              readOnly
              value={getTravellerSummary() || ''}
              placeholder="Tap to select"
            />
            {showTravelModal && (
              <div className="absolute z-50 top-full left-0 w-full">
                <TravelClassSelector
                  onClose={() => setShowTravelModal(false)}
                />
              </div>
            )}
          </div>
        </Box>

        <div className="flex justify-center items-center my-3">
          <ThemeButton
            text="Search"
            variant="Border50PrimaryGrenade"
            wrapperClassName="flex items-center gap-2"
            iconRight={<IoSearchOutline size={20} />}
            onClick={handleSubmit}
            // isLoading={loading}
          />
        </div>
      </Card>
    </div>
  )
}

export default FlightBookingCard
