import AirportOverview from "@/component/AirportOverview";
import AirportDetail from "@/component/sections/AirportDetail";
import HeroSection2 from "@/component/sections/HeroSection2";
import InfoCard from "@/component/sections/InfoCard";
import ProcedureSection from "@/component/sections/ProcedureSection";
import { Car, CheckCircle, FileText } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function GrenobleAirport(){
   const airportData = {
    title: "Geneva Airport Overview",
    description: [
      "The airport consists of a single main passenger terminal building, making navigation through it straightforward. The terminal is designed to handle both arrivals and departures efficiently, and its compact size ensures minimal walking distances and at the time of writing, EasyJet Ryanair British Airways Jet2 WizzAir along with TUI Thomas Cook all operate flights into Grenoble.",
      
      "At Grenoble airport we meet all our Passengers in the short term carpark « P0» (P Zero) Once you have collected all your luggage, have perhaps used the bathroom (as we say above, transfer time to La Plagne is a minimum of two-and-a-half-hours but can be considerably longer on peak weeks), please WhatsApp your driver who will be waiting outside the airport five minutes away. "
    ],
    imageUrl: "/aa.png",
    imageAlt: "Aerial view of Geneva Airport"
  };
  const stepsData = [
  {
    icon: <FileText className="w-8 h-8" />,
    stepTitle: 'Step 1: Documentation',
    description: 'Complete all necessary paperwork for the procedure before starting.'
  },
  {
    icon: <Car className="w-8 h-8" />,
    stepTitle: 'Step 2: Vehicle Inspection',
    description: 'Ensure the vehicle passes the required safety inspection.'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    stepTitle: 'Step 3: Final Approval',
    description: 'Submit for final approval after all checks are complete.'
  },
];
    return(
        <>
          <HeroSection2
        height="50vh" 
        bgImage="/airport3.PNG"
        title="Grenoble Alpes-Isère Airport (LATA Code: GNB)"
        description="Grenoble Airport is located about forty kilometres northwest of the city and serves as a key gateway to the French Alps. Especially popular with travellers headed for ski resorts during the winter season, this airport offers a range of facilities designed to enhance passenger comfort, convenience, and efficiency. On a good run, GNB is a two-and-a-half-hour transfer to La Plagne."
      />
       <AirportDetail
        location='Just 40km northwest of Geneva city centre'
        transferTime='2.5 hours to La Plagne'
        amenities='Free Wi-Fi available throughout'
      />
      <AirportOverview
        title={airportData.title}
        description={airportData.description}
        imageUrl={airportData.imageUrl}
        imageAlt={airportData.imageAlt}
      />
       <ProcedureSection sectionTitle="Procedure Steps" steps={stepsData} />
       <div style={{ padding: '20px' }}>
      <InfoCard
        title="Traveling from Chambery Airport"
        description="The runway at Grenoble-Isère Airport is long enough (3kms) to accommodate large aircraft such as Boeing 747’s and Airbus A380’s!"
        icon={<FaMapMarkerAlt size={24} />} 
      />
    </div>
        </>
    )
}