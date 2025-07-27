import FlightInfo from "@/components/web/Booking/flightInfo";

export default function Booking() {
  return (
    <div className="bg-gray-100 bg-bgPrimary min-h-svh pt-80">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 ">
        {/* Left Column - 9/12 */}
        <div className="md:col-span-3 space-y-4">
          <FlightInfo />
        </div>

        {/* Right Column - 3/12 */}
        <div className="md:col-span-9 bg-white p-4 rounded shadow space-y-4">
          <h3 className="font-semibold text-lg mb-2">Refund on Cancellation</h3>

          {/* Refund Timeline */}
          <div className="text-sm text-gray-700 space-y-2">
            <p>DEL → BOM</p>
            <div className="flex items-center justify-between text-xs font-medium text-gray-600">
              <span>Now</span>
              <span className="text-green-600">₹577 refund</span>
              <span>01 Jul</span>
              <span className="text-red-600">Non Refundable</span>
            </div>
          </div>

          {/* Add-ons */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Not sure of your travel?</h4>

            <div className="bg-blue-100 p-3 rounded border border-blue-300">
              <p className="font-medium mb-1">
                ✅ Free Cancellation with Assured
              </p>
              <p className="text-sm text-gray-700">
                Instant refund of approx. ₹5177
              </p>
              <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm">
                Add ₹399
              </button>
            </div>

            <div className="bg-purple-100 p-3 rounded border border-purple-300">
              <p className="font-medium mb-1">
                ✅ Free Cancellation + Rescheduling
              </p>
              <p className="text-sm text-gray-700">
                Full flexibility on airline, date & time
              </p>
              <button className="mt-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded text-sm">
                Add ₹699
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded text-lg font-semibold">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
