import AirportOverview from "@/component/AirportOverview";
import AirportDetail from "@/component/sections/AirportDetail";
import HeroSection2 from "@/component/sections/HeroSection2";
import InfoCard from "@/component/sections/InfoCard";
import ProcedureSection from "@/component/sections/ProcedureSection";
import { Car, CheckCircle, FileText } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function AirportGeneva(){
   const airportData = {
    title: "Geneva Airport Overview",
    description: [
      "Geneva Airport is one of Switzerland's principal gateways to the world.",
      "Situated just four kilometres northwest of the city centre, it serves not only the city and parts of neighbouring France, but it is also the main arrival destination for skiers during the ski season.",
      "In our opinion, Geneva should be your first choice airport not only due to the large number of daily flights, but principally because it is such a major transfer hub, it very rarely, if ever, gets closed due to bad weather ensuring your flight is very unlikely to be diverted."
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
        bgImage="/airport4.jpg"
        title="Lyon Saint-Exupéry Airport(LATA Code: LYS)"
        description="Your Gateway to Switzerland and the Alps"
      />
       <AirportDetail
        location='Just 4km northwest of Geneva city centre'
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
        description="Chambery Airport is one of only three Category C airports in France whose runway can only be landed on by experienced pilots who have had specific simulator training on airports with a challenging approach."
        icon={<FaMapMarkerAlt size={24} />} 
      />
    </div>
        </>
    )
}