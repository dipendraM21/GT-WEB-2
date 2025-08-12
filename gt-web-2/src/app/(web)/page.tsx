import Banner from "@/components/web/Home/Banner";
import FlightBookingCard from "@/components/web/Home/FlightBookingCard";
import ServicesCard from "@/components/web/Home/ServicesCard";

export default function Home() {
  return (
    <div className="bg-bgPrimary h-[100%] container mx-auto">
      <Banner />
      <FlightBookingCard />
      <ServicesCard />
    </div>
  );
}
