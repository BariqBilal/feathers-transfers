import React from 'react';
import Image from 'next/image';

const DetailSection: React.FC = () => {
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
        {/* Village 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">1. Plagne Centre</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 1970m</p>
          <p className='text-justify'>
            As the name suggests, it's at the heart of La Plagne. Think of it as the hub where many of the ski lifts, 
            shops, and restaurants are located. It's bustling and convenient for everything.
          </p>
        </div>

        {/* Village 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">2. Plagne 1800</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 1800m</p>
          <p className='text-justify'>
            A bit quieter than Plagne Centre, it's set a little lower on the mountain. It has a more traditional alpine feel 
            and is great for families looking for a serene retreat, with the largest selection of ski chalets rather than 
            residencies and apartments.
          </p>
        </div>

        {/* Village 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">3. Plagne Aime 2000</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 2000m</p>
          <p className='text-justify'>
            One of the highest of La Plagne’s villages, known for its 'brutalist' architecture, offering breathtaking views of Mont Blanc and direct access to the slopes. Avoid confusing it with Aime La Plagne, which is the village at the bottom of the valley where the train arrives and you begin your climb up to La Plagne.
          </p>
        </div>

        {/* Village 4 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">4. Plagne Soleil</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 2050m</p>
          <p className='text-justify'>
            Sitting at about 2050 metres and the last born resort of La Plagne, it has pleasant architecture with a cosy and inviting atmosphere. Plagne Soleil offers true ski-in-ski-out accommodation.
          </p>
        </div>

        {/* Village 5 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">5. Plagne Villages</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 2050m</p>
          <p className='text-justify'>
           Sitting at about 2050 metres, Plagne Villages has its own particular charm. Perhaps quieter than the other resorts of La Plagne it provides edge of the piste accommodation with a charming smaller village feel.
          </p>
        </div>

        {/* Village 6 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">6. Plagne Bellecôte</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 1930m</p>
          <p className='text-justify'>
           A dynamic spot with perhaps the best access to all the slopes in La Plagne. New for season 25/26 is a speedy 10 person gondola whisking you up to the Roche de Moi via the Col de Forcle. There is also easy access to Les Arcs is via a speedy 8 person chairlift to the top of the Arpette.
          </p>
        </div>

        {/* Village 7 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">7. Belle Plagne</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 2050m</p>
          <p className='text-justify'>
            One of the most picturesque parts of La Plagne, Belle Plagne is known for its beautiful Savoyard architecture 
            and family-friendly vibe.
          </p>
        </div>

        {/* Village 8 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">8. Montchavin</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 1250m</p>
          <p className='text-justify'>
            Nestling on the edge of the forest, Montchavin is a traditional village that offers a mix of old-world charm 
            and modern ski facilities. It's a gem for those who love quaint settings.
          </p>
        </div>

        {/* Village 9 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">9. Les Coches</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 1450m</p>
          <p className='text-justify'>
            Close to Montchavin, Les Coches is a newer development but retains a charming, village-like feel. It's an 
            excellent base for families, with access to both La Plagne and Les Arcs thanks to the Vanoise Express.
          </p>
        </div>

        {/* Village 10 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">10. Champagny en Vanoise</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 1250m</p>
          <p className='text-justify'>
            This village offers a different perspective on La Plagne, with access to the Paradiski area and its own distinct 
            character. It's particularly popular with those who enjoy off-piste skiing and the tranquillity of the Vanoise 
            National Park.
          </p>
        </div>

        {/* Village 11 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">11. Plagne Montalbert</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 1350m</p>
          <p className='text-justify'>
            Located on the edge of the forest, it's another village that blends modern ski facilities with the charm of 
            traditional alpine architecture. It's a bit quieter, perfect for those who want to escape the hustle and bustle.
          </p>
        </div>

        {/* Village 12 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">12. La Roche</h2>
          <p className="text-gray-600 mb-2"><strong>Altitude:</strong> 1550m</p>
          <p className='text-justify'>
           La Roche is home to the finish line of the Olympic bobsleigh track, adding a touch of adrenaline-fueled history to your ski holiday. Perfect for those seeking both adventure and a taste of the authentic Alpine lifestyle, La Roche provides a quieter base with all the essentials for a memorable stay in the mountains.  
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;