'use client'
import FeatureList from '@/components/core/Card/FeatureListCard'
import featureData from '@/utils/constant'
import { translation } from '@/utils/translation'

const ServicesCard = () => {
  return (
    <div>
      <FeatureList
        titleVariant="Maison24MDemi125"
        headingWrapperClassName="mb-4 text-center"
        descriptionVariant="Maison18Medium125"
        descColor="grey_medium"
        titleColor="blue_dark"
        headingColor="orange_accent_alpha"
        data={featureData}
        heading={translation?.WHY_WITH_US}
        containerClassName="container mx-auto why-choose-inner-area my-30"
      />
    </div>
  )
}

export default ServicesCard
