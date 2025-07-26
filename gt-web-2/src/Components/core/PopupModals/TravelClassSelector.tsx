'use client'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { saveFlightSearchData } from '@/store/actions/flightBooking.action'
import { CabinClass } from '@/types/module/flightSearch'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { GuestNumberSelectorData, travelClassesData } from '@/utils/constant'
import { formatCabinClass } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text } from 'theme-ui'
import GuestNumberSelector from '../Card/GuestNumberSelector'
import CommonRadioButton from '../RadioButton/RadioButton'

interface SelectedDataProps {
  adults: string
  children: string
  infants: string
  cabinClass: CabinClass
}
const TravelClassSelector = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch()
  const modalRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  const { flightFiltersData } = useSelector(
    (state: MainStoreType) => state.flightBookingData
  )
  const [selectedData, setSelectedData] = useState<SelectedDataProps>({
    adults: flightFiltersData?.passengers?.adults || '',
    children: flightFiltersData?.passengers?.children || '',
    infants: flightFiltersData?.passengers?.infants || '',
    cabinClass: flightFiltersData?.cabinClass || 'ECONOMY',
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleSubmit = () => {
    const total =
      (parseInt(selectedData?.adults) || 0) +
      (parseInt(selectedData?.children) || 0) +
      (parseInt(selectedData?.infants) || 0)

    if (total > 0) {
      onClose()
      dispatch(
        saveFlightSearchData({
          passengers: {
            adults: selectedData?.adults,
            children: selectedData?.children,
            infants: selectedData?.infants,
          },
          cabinClass: selectedData?.cabinClass,
        })
      )
    } else {
    }
  }
  if (!isClient) return null
  return (
    <div className="relative w-full max-w-sm">
      <div
        className="absolute z-50 mt-2 shadow-lg travel-class-selector-container p-20 w-full"
        ref={modalRef}
      >
        <GuestNumberSelector
          selectedGuestType={selectedData?.adults as string}
          heading={translation?.AGE_GROUP_ADULTS}
          data={GuestNumberSelectorData}
          onClick={(adults: string) => {
            setSelectedData({
              ...selectedData,
              adults: adults,
            })
          }}
        />
        <GuestNumberSelector
          selectedGuestType={selectedData?.children as string}
          heading={translation?.AGE_GROUP_CHILDREN}
          data={GuestNumberSelectorData}
          onClick={(children: string) => {
            setSelectedData({
              ...selectedData,
              children: children,
            })
          }}
        />
        <GuestNumberSelector
          selectedGuestType={selectedData?.infants as string}
          heading={translation?.AGE_GROUP_INFANTS}
          data={GuestNumberSelectorData}
          onClick={(infants: string) => {
            setSelectedData({
              ...selectedData,
              infants: infants,
            })
          }}
        />

        <div>
          <Text variant="Maison16Demi20" color="orange_accent_alpha">
            CHOOSE TRAVEL CLASS
          </Text>
          <div className="flex flex-col gap-1">
            <CommonRadioButton
              options={travelClassesData}
              name="travelClasses"
              textClass="pl-2"
              selectedValue={
                selectedData?.cabinClass
                  ? formatCabinClass(selectedData.cabinClass as CabinClass)
                  : 'Economy'
              }
              onChange={(val) => {
                setSelectedData({
                  ...selectedData,
                  cabinClass: val as CabinClass,
                })
              }}
              mainClass="radio-group flex justify-start gap-2 item-center flex-col"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <ThemeButton
            text="Done"
            sx={{ bg: 'green_deep', borderRadius: '20px' }}
            wrapperClassName="flex items-center gap-2"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default TravelClassSelector
