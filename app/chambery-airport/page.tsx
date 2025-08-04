import AirportOverview from "@/component/AirportOverview";
import AirportDetail from "@/component/sections/AirportDetail";
import HeroSection2 from "@/component/sections/HeroSection2";
import InfoCard from "@/component/sections/InfoCard";
import ProcedureSection from "@/component/sections/ProcedureSection";
import { Car, CheckCircle, FileText } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function AirportGeneva(){
   const airportData = {
    title: "Chambery Airport Overview",
    description: [
      "The arrival procedure is very simple at Chambery Airport as it is very small. Once you have all your baggage, exit the arrivals terminal where you will find your driver holding a sign with your name on it.",

      "Poular airlines such as <a href='https://www.jet2.com/'>Jet2</a> and <a href='https://www.britishairways.com/travel/home/public/en_pk/'>British Airways</a> offer flights to Chambery. The british Tour Operator <a href='https://www.crystalski.co.uk/'>Crystal Ski Holidays</a> offer many flight into Chambery Airport during the ski season.",

      "Chambéry Airport France is the closest airport to the major ski resorts in the Savoie and thus, in theory, has the shortest transfer to the ski resorts. However, be warned the airport can sometimes close due to fog from the Lac du Bourget which is situated at the southern end of the runway.",
    
    ],
    imageUrl: "/Chambery-Savoie-Aeroport.jpg",
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
        bgImage="/Chambery-Savoie-Aeroport.jpg"
        title="Chambery Airport (IATA Code: CMF)"
        description="Chambery Airport, officially known as Chambéry Savoie Mont Blanc Airport is situated in the heart of the picturesque Savoie region of France."
      />
       <AirportDetail
        location='At the southern end of Lac du Bourget'
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
        title="Chambery Airport – Did you know ?"
        description="Chambery Airport is one of only three Category C airports in France whose runway can only be landed on by experienced pilots who have had specific simulator training on airports with a challenging approach. Enjoy the view !"
        icon={<FaMapMarkerAlt size={24} />} 
        
      />
    </div>
    
        </>
    )
}