import AirportOverview from "@/component/AirportOverview";
import AirportDetail from "@/component/sections/AirportDetail";
import HeroSection2 from "@/component/sections/HeroSection2";
import InfoCard from "@/component/sections/InfoCard";
import ProcedureSection from "@/component/sections/ProcedureSection";
import { Car, CheckCircle, FileText } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function AirportGeneva() {
  const airportData = {
    title: "Chambery Airport Overview",
    description: [
      "Despite its modest size compared to other French airports, <a href='https://www.chambery-airport.com/en'>Chambéry Savoie Mont Blanc Airport</a>",

      "It’s small but efficient terminal design, with emphasis on a speedy transit and its proximity to local ski resorts mean that travellers can often reach their final destinations faster than if they flew into larger, more congested airports. ",

      "One of the most fascinating aspects for pilots and aviation fans is the airport’s notoriously challenging approach. Surrounded by mountains and water, the airports single runway requires pilots to execute precise landings, often in unpredictable weather. Fog, crosswinds, and rapidly changing Alpine conditions all demand an elevated level of piloting skill. ",

    ],
    imageUrl: "/Chambery-Savoie-Aeroport.jpg",
    imageAlt: "Aerial view of Geneva Airport"
  };

  const stepsData = [
    {
      icon: <FileText className="w-8 h-8" />,
      stepTitle: 'How to find your driver',
      description: 'The arrival procedure is very simple at Chambery as it is a very small airport. Once you have all your baggage, exit the arrivals terminal where you will find your driver holding a sign with your name on it.'
    },
    {
      icon: <Car className="w-8 h-8" />,
      stepTitle: 'Airlines',
      description: (
        <>
          Popular airlines such as{' '}
          <a href="http://www.jet2.com" target="_blank">Jet2</a>{' '}
          and{' '}
          <a href="http://www.ba.com" target="_blank">British Airways</a>{' '}
          all offer flights into Chambery. The British Tour Operator{' '}
          <a href="https://www.crystalski.co.uk" target="_blank">Crystal Ski Holidays</a>{' '}
          also have many flights into Chambery during the ski season.
        </>
      )
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      stepTitle: 'Airport Location',
      description: 'Chambéry Airport France is the closest airport to all major ski resorts in the Savoie and thus, in theory, has the shortest transfer time. However, be warned that the airport can sometimes close due to fog from the Lac du Bourget, which is situated at the southern end of the runway.'
    },
  ];
  return (
    <>
      <HeroSection2
        height="50vh"
        bgImage="/Chambery-Savoie-Aeroport.jpg"
        title="Chambery Airport (IATA Code: CMF)"
        description="Chambery Airport, officially known as Chambéry Savoie Mont Blanc Airport is situated in the heart of the picturesque Savoie region of France."
      />
      <AirportDetail
        location='At the southern end of Lac du Bourget'
        transferTime='1.5hours to La Plagne'
        amenities='Free Wi-Fi available throughout'
      />
      <AirportOverview
        title={airportData.title}
        description={airportData.description}
        imageUrl={airportData.imageUrl}
        imageAlt={airportData.imageAlt}
      />
      <ProcedureSection sectionTitle="Arrival Procedure at Chambery Airport" steps={stepsData} />
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