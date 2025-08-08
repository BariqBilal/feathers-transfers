import React from 'react';
import Image from 'next/image';

const DetailSection: React.FC = () => {
  // Resort data array for easy mapping
  const resorts = [
    {
      id: 1,
      name: "Plagne Centre",
      altitude: "1970m",
      description: "As the name suggests, it's at the heart of La Plagne. Think of it as the hub where many of the ski lifts, shops, and restaurants are located. It's bustling and convenient for everything."
    },
    {
      id: 2,
      name: "Plagne 1800",
      altitude: "1800m",
      description: "A bit quieter than Plagne Centre, it's set a little lower on the mountain. It has a more traditional alpine feel and is great for families looking for a serene retreat, with the largest selection of ski chalets rather than residencies and apartments."
    },
    {
      id: 3,
      name: "Plagne Aime 2000",
      altitude: "2000m",
      description: "One of the highest of La Plagne's villages, known for its 'brutalist' architecture, offering breathtaking views of Mont Blanc and direct access to the slopes. Avoid confusing it with Aime La Plagne, which is the village at the bottom of the valley where the train arrives and you begin your climb up to La Plagne."
    },
    {
      id: 4,
      name: "Plagne Soleil",
      altitude: "2050m",
      description: "Sitting at about 2050 metres and the last born resort of La Plagne, it has pleasant architecture with a cosy and inviting atmosphere. Plagne Soleil offers true ski-in-ski-out accommodation."
    },
    {
      id: 5,
      name: "Plagne Villages",
      altitude: "2050m",
      description: "Sitting at about 2050 metres, Plagne Villages has its own particular charm. Perhaps quieter than the other resorts of La Plagne it provides edge of the piste accommodation with a charming smaller village feel."
    },
    {
      id: 6,
      name: "Plagne Bellecôte",
      altitude: "1930m",
      description: "A dynamic spot with perhaps the best access to all the slopes in La Plagne. New for season 25/26 is a speedy 10 person gondola whisking you up to the Roche de Moi via the Col de Forcle. There is also easy access to Les Arcs via a speedy 8 person chairlift to the top of the Arpette."
    },
    {
      id: 7,
      name: "Belle Plagne",
      altitude: "2050m",
      description: "One of the most picturesque parts of La Plagne, Belle Plagne is known for its beautiful Savoyard architecture and family-friendly vibe."
    },
    {
      id: 8,
      name: "Montchavin",
      altitude: "1250m",
      description: "Nestling on the edge of the forest, Montchavin is a traditional village that offers a mix of old-world charm and modern ski facilities. It's a gem for those who love quaint settings."
    },
    {
      id: 9,
      name: "Les Coches",
      altitude: "1450m",
      description: "Close to Montchavin, Les Coches is a newer development but retains a charming, village-like feel. It's an excellent base for families, with access to both La Plagne and Les Arcs thanks to the Vanoise Express."
    },
    {
      id: 10,
      name: "Champagny en Vanoise",
      altitude: "1250m",
      description: "This village offers a different perspective on La Plagne, with access to the Paradiski area and its own distinct character. It's particularly popular with those who enjoy off-piste skiing and the tranquillity of the Vanoise National Park."
    },
    {
      id: 11,
      name: "Plagne Montalbert",
      altitude: "1350m",
      description: "Located on the edge of the forest, it's another village that blends modern ski facilities with the charm of traditional alpine architecture. It's a bit quieter, perfect for those who want to escape the hustle and bustle."
    },
    {
      id: 12,
      name: "La Roche",
      altitude: "1550m",
      description: "La Roche is home to the finish line of the Olympic bobsleigh track, adding a touch of adrenaline-fueled history to your ski holiday. Perfect for those seeking both adventure and a taste of the authentic Alpine lifestyle, La Roche provides a quieter base with all the essentials for a memorable stay in the mountains."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/2">
          <Image 
            src="/sec1.PNG" 
            alt="La Plagne ski resort"
            width={800}
            height={400}
            className="rounded-lg shadow-lg h-[50vh] object-cover"
            priority
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-lg mb-4 text-justify">
            La Plagne is a collection of twelve small, purpose-built high altitude ski resorts and traditional villages located on the edge of the Vanoise National Park. Renowned as a family-friendly resort, it has a good selection of beginner pistes but also some great choices for the more advanced skier or snowboarder. In addition, La Plagne is part of the famous Paradiski ski area, linked to Les Arcs by the Vanoise Express cable car.
          </p>
          <p className="text-lg text-justify">
            All resorts have a good choice of ski in ski out apartments, chalets and hotels, restaurants and nightlife. Getting around is easy thanks to free shuttle buses and a great network of ski lifts that connect the high altitude resorts and villages. Some of these links are open at night to help visitors get from their accommodation to the different restaurants, shops and bars in the neighbouring resorts. Feathers Transfers can also be pre-booked to take/collect your party for a night out. 
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resorts.map((resort) => (
          <div key={resort.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-3">
              <Image 
                src="/logo.SVG"
                alt="La Plagne Logo"
                width={120}
                height={60}
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              {resort.id}. {resort.name}
            </h2>
            <p className="text-gray-600 mb-2 text-center">
              <strong>Altitude:</strong> {resort.altitude}
            </p>
            <p className="text-justify">
              {resort.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailSection;