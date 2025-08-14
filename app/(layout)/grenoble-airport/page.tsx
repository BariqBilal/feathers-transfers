import AirportOverview from "@/component/AirportOverview";
import AirportDetail from "@/component/sections/AirportDetail";
import HeroSection2 from "@/component/sections/HeroSection2";
import InfoCard from "@/component/sections/InfoCard";
import ProcedureSection from "@/component/sections/ProcedureSection";
import { Car, CheckCircle, FileText } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function GrenobleAirport(){
   const airportData = {
    title: "Grenoble Airport Overview",
    description: [
      "<a href='https://www.grenoble-airport.com/'>Aéroport Grenoble Alpes Isère</a> is a key gateway to the French Alps and is especially popular with travellers headed for ski resorts during the winter season. The airport offers a range of facilities designed to enhance passenger comfort, convenience, and efficiency and on a good run, GNB is a two-and-a-half-hour transfer to La Plagne.",
      
      "The airport consists of a single main passenger terminal building, making navigation through it straight forward and the terminal is designed to handle both arrivals and departures efficiently. Its compact size ensures minimal walking distances and at the time of writing,<a href='http://www.easy.jet.com/'>EasyJet</a> <a href='http://www.ryanair.com/'> Ryanair</a> <a href='http://www.ba.com/'>British Airways</a> <a href='https://www.jet2.com/en'>Jet2</a> <a href='http://www.wizzair.com/'> WizzAir</a> along with <a href='https://www.tui.co.uk/flight/'>TUI</a> <a href='https://www.thomascook.com/'>Thomas Cook</a> all operate flights here."
    ],
    imageUrl: "/last.jpeg",
    imageAlt: "Aerial view of Geneva Airport"
  };
  const stepsData = [
  {
    icon: <FileText className="w-8 h-8" />,
    stepTitle: '',
    description: 'At Grenoble airport we meet all our Passengers in the short term carpark « P0» (P Zero) Once you have collected all your luggage, have used the bathroom please WhatsApp your driver who will be waiting outside the airport five minutes away. '
  },
  {
    icon: <Car className="w-8 h-8" />,
    stepTitle: '',
    description: 'To find Car Park «P ZERO», exit arrivals, turn right and then right again and P0 is located just opposite the entrance to the Departure Terminal. Your Driver will meet you here.'
  },
  {
    icon: <CheckCircle size={48} />,
    stepTitle: "",
    description: (
      <>
       Grenoble is a small airport, not much more than a hangar really, but it does boast two restaurants <a href="https://www.grenoble-airport.com/en/services/le-sequoia" target="_blank" className="text-blue-500 hover:underline"> Le Sequoia </a> and <a className="text-blue-500 hover:underline" href="https://www.grenoble-airport.com/en/services/tribs" target="_blank"> Trib's Snack Bar</a>
      </>
    ),
  },
];
    return(
        <>
          <HeroSection2
        height="50vh" 
        bgImage="/last.jpeg"
        title="Grenoble Alpes-Isère Airport (IATA Code: GNB)"
        description="Grenoble Airport is a key gateway to the French Alps. Especially popular with travellers headed for ski resorts during the winter season, this airport offers a range of facilities designed to enhance passenger comfort, convenience, and efficiency. On a good run, GNB is a two-and-a-half-hour transfer to La Plagne."
      />
       <AirportDetail
        location='40 kms North West of the City Centre'
        transferTime='2.5 hours to La Plagne'
        amenities='Free Wi-Fi available throughout'
      />
      <AirportOverview
        title={airportData.title}
        description={airportData.description}
        imageUrl={airportData.imageUrl}
        imageAlt={airportData.imageAlt}
      />
       <ProcedureSection sectionTitle="Arrival Proceedure at Grenoble Airport" steps={stepsData} />
       <div style={{ padding: '20px' }}>
      <InfoCard
        title="Grenoble Airport – Did you know ?"
        description="The runway at Grenoble-Isère Airport is three kilometers long which can accommodate large aircraft such as a Boeing 747 and Airbus A380!"
        icon={<FaMapMarkerAlt size={24} />} 
      />
    </div>
        </>
    )
}