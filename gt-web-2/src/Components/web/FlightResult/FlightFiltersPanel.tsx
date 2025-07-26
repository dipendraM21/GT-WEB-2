import SectionTitleBar from '@/components/shared/Text/CommonTextHeader'
import { CommonHeadingText } from '@/components/shared/Text/Texts'
import { getAllFlightListingData } from '@/store/actions/flightBooking.action'
import { FlightListingDataProps } from '@/types/module/flightSearch'
import { airLinesData, flightTimeSlots, refundData } from '@/utils/constant'
import { translation } from '@/utils/translation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from 'theme-ui'
import Checkbox from '../../core/CheckBox/CheckBoxes'
import DepartureCard from './DepartureCard'

const FlightFiltersPanel = () => {
  const dispatch = useDispatch()
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  // const { loading, getFlightListingData } = useSelector(
  //   (state: MainStoreType) => state.flightBookingData
  // )
  const getFlightListingData = JSON?.parse(
    localStorage?.getItem('flightListingData') as string
  ) as FlightListingDataProps[]
  const [selectedStops, setSelectedStops] = useState([
    { label: 'Non-stop', value: 0, checked: false },
    { label: '1 Stop', value: 1, checked: false },
  ])

  const handleStopChange = (index: number, checked: boolean) => {
    const updatedStops = [...selectedStops]
    updatedStops[index].checked = checked
    setSelectedStops(updatedStops)
    //  const filtered = getFlightListingData.filter((flight) =>
    //   flight.segments?.some((segment) =>
    const filtered = getFlightListingData
      ?.map((flight) =>
        flight?.segments?.filter(
          (itm) => itm?.stops === updatedStops[index]?.value
        )
      )
      ?.flat()

    dispatch(getAllFlightListingData(filtered))
  }

  const handleSlotClick = (value: string) => {
    if (selectedSlots.includes(value)) {
      setSelectedSlots((prev) => prev.filter((v) => v !== value))
    } else {
      setSelectedSlots((prev) => [...prev, value])
    }
  }

  const [filteredFlights, setFilteredFlights] = useState<
    FlightListingDataProps[]
  >([])

  useEffect(() => {
    if (!getFlightListingData || getFlightListingData.length === 0) return

    const activeStopValues = selectedStops
      .filter((stop) => stop.checked)
      .map((stop) => stop.value)

    if (activeStopValues.length === 0) {
      setFilteredFlights(getFlightListingData)
      return
    }

    const filtered = getFlightListingData.filter((flight) =>
      flight.segments?.some((segment) =>
        activeStopValues.includes(segment.stops)
      )
    )
    setFilteredFlights(filtered)
  }, [selectedStops, getFlightListingData])

  return (
    <Box className="flight-panel md:col-span-4 xl:col-span-4 2xl:col-span-3 w-full hidden lg:block bg-white py-30 px-28  rounded-xl bg-gradient-background flight-list-br border-2">
      <SectionTitleBar
        primaryColor="primary_text_dark"
        secondaryColor="primary_text_dark"
        primaryText="Filters"
        secondaryText="Clear All"
      />

      <Box as="div" className="pt-20">
        <CommonHeadingText title={translation?.STOPS} />
        {selectedStops?.map((stop, index) => (
          <Checkbox
            key={stop.value}
            className="mt-1"
            label={stop.label}
            checked={stop.checked}
            onChange={(checked) => handleStopChange(index, checked)}
          />
        ))}
      </Box>

      <Box className="mt-3">
        <CommonHeadingText title={translation?.FARE_TYPE} />
        {refundData?.map((stop, index) => (
          <Checkbox
            key={stop.value}
            className="mt-1"
            label={stop.label}
            checked={false}
            onChange={(checked) => handleStopChange(index, checked)}
          />
        ))}
      </Box>

      <Box className="mt-3">
        <CommonHeadingText title={translation?.DEPARTURE} />
        <Box className="grid grid-cols-2 gap-4 mt-3">
          {flightTimeSlots.map((slot) => (
            <DepartureCard
              key={slot.value}
              icon={slot.icon}
              label={slot.label}
              timeRange={slot.timeRange}
              selected={selectedSlots.includes(slot.value)}
              onClick={() => handleSlotClick(slot.value)}
            />
          ))}
        </Box>
      </Box>

      <Box className="mt-4">
        <CommonHeadingText
          wrapperClass="flex justify-between"
          isChecked
          title={translation?.POPULAR_AIRLINES}
          label={translation?.ALL}
        />
        {airLinesData?.map((itm, index) => (
          <Checkbox
            labelClass="pl-2"
            key={itm.value}
            className="mt-3"
            icon={itm?.icon}
            label={itm.label}
            checked={false}
            onChange={(checked) => handleStopChange(index, checked)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FlightFiltersPanel
