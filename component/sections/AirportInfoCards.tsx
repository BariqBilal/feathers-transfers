'use client';
import React from 'react';

export default function AirportInfoCards() {
  return (
    <div className='bg-gray-100'>
      <p className='text-lg md:text-3xl pt-6 font-bold text-center'>Arrival Procedure at Geneva Airport</p>
    <div className="min-h-[65vh]  flex items-center justify-center font-['Inter'] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Terminal 1 (Main) Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <a href='https://www.gva.ch/en/Site/Passagers/Acces-Transports/Plan/Plan-du-Terminal-1' target='_blank' className="text-xl underline font-semibold text-gray-800 mb-3">Terminal 1 (Main)</a>
          <p className="text-gray-600 text-lg mb-4 flex-grow text-justify ">
           Terminal 1 is the bigger of the two terminals and is the terminal that most airlines such as <a target="_blank" className='underline font-bold' href="https://www.easyjet.com/">EasyJet</a> and <a target="_blank" className='underline font-bold'  href="https://www.britishairways.com/travel/home/public/en_pk/">British Airways </a> use. It is most likely that this is the terminal your flight will arrive at.
          </p>
         
          <div className="bg-blue-50 rounded-lg p-4 text-blue-800 text-sm">
            <h3 className="font-semibold mb-1 text-lg">Arrival Procedure</h3>
      
            <p className='text-justify text-lg'>
             Exit customs, but not the airport terminal, and turn left, heading towards the train station. Walk for no more than 100m and on your left hand side you will see the <a target="_blank" className='underline font-bold' href="https://www.google.fr/maps/place/Swiss+Chalet/@46.2311027,6.1066986,17z/data=!3m1!5s0x478c64845e72c92b:0x55f0c588a8b1ba9e!4m10!1m2!2m1!1sswiss+chalet+restauran+geneva+airport!3m6!1s0x478c64845ca06b3f:0x87f884a9e214bc72!8m2!3d46.2312036!4d6.1094997!15sCiZzd2lzcyBjaGFsZXQgcmVzdGF1cmFudCBnZW5ldmEgYWlycG9ydCIDiAEBWigiJnN3aXNzIGNoYWxldCByZXN0YXVyYW50IGdlbmV2YSBhaXJwb3J0kgEQc3dpc3NfcmVzdGF1cmFudKoBkAEKDC9nLzFxNjI5eF9qcwoJL20vMDFxc2d0CgkvbS8wMjBuX18QASobIhdzd2lzcyBjaGFsZXQgcmVzdGF1cmFudCgAMh8QASIb25u4cIVCe01MTrXVdJzWQN6JzN-WHUrFRinqMioQAiImc3dpc3MgY2hhbGV0IHJlc3RhdXJhbnQgZ2VuZXZhIGFpcnBvcnTgAQA!16s%2Fg%2F1hhxjy0vx?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"> Swiss Chalet Restaurant </a> where your driver will be waiting for you holding a sign with your name on it.
            </p>
          </div>
        </div>

        {/* Terminal 2 (Charter) Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <a href='https://www.gva.ch/en/Site/Passagers/Acces-Transports/Plan/Terminal-2' className="text-xl font-semibold underline text-gray-800 mb-3">Terminal 2 (Charter)</a>
          <p className="text-gray-600 text-lg mb-4 flex-grow text-justify">
          Terminal 2 is used mainly for charter flights and is only a ten minute walk from Terminal 1. It is basically a hangar with not many facilities and at the time of writing, the budget airline <a target="_blank" className='underline font-bold' href="https://www.jet2.com/"> Jet2</a> use it at weekends during the winter
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 text-blue-800 text-sm">
            <h3 className="font-semibold  mb-1 text-lg">Arrival Proceedure</h3>
            {/* <p className='text-justify'>
             Terminal 2 is just a short 100m walk from Terminal 1 and is used for charter flights. It is a hangar with not many facilities and at the time of writing, the budget airline <a className='underline font-bold' href="https://www.jet2.com/"> Jet2</a> use it at weekends.We are allowed to drop passengers off at T2 but unfortunately are unable to collect from T2 and so we meet all passengers outside the Swiss Chalet restaurant in T1.
            </p> */}
            <p className='text-justify text-lg'>
             Exit the terminal building, turn left and head towards the road. After a short walk of around two hundred metres, you will arrive at T1. Continue straight ahead towards the train station and, as above, about 100 m after arrivals, you will arrive at the <a target="_blank" className='underline font-bold' href="https://www.google.fr/maps/place/Swiss+Chalet/@46.2311027,6.1066986,17z/data=!3m1!5s0x478c64845e72c92b:0x55f0c588a8b1ba9e!4m10!1m2!2m1!1sswiss+chalet+restauran+geneva+airport!3m6!1s0x478c64845ca06b3f:0x87f884a9e214bc72!8m2!3d46.2312036!4d6.1094997!15sCiZzd2lzcyBjaGFsZXQgcmVzdGF1cmFudCBnZW5ldmEgYWlycG9ydCIDiAEBWigiJnN3aXNzIGNoYWxldCByZXN0YXVyYW50IGdlbmV2YSBhaXJwb3J0kgEQc3dpc3NfcmVzdGF1cmFudKoBkAEKDC9nLzFxNjI5eF9qcwoJL20vMDFxc2d0CgkvbS8wMjBuX18QASobIhdzd2lzcyBjaGFsZXQgcmVzdGF1cmFudCgAMh8QASIb25u4cIVCe01MTrXVdJzWQN6JzN-WHUrFRinqMioQAiImc3dpc3MgY2hhbGV0IHJlc3RhdXJhbnQgZ2VuZXZhIGFpcnBvcnTgAQA!16s%2Fg%2F1hhxjy0vx?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"> Swiss Chalet Restaurant</a>
            </p>
          </div>
        </div>

        {/* French Sector Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <a href='https://www.gva.ch/en/Site/Passagers/Acces-Transports/Plan/Secteur-France' className="text-xl font-semibold underline text-gray-800 mb-3">French Sector</a>
          <p className="text-gray-600 mb-4 flex-grow text-justify">
The French sector is mainly used for internal flights, so it is unlikely you will arrive at this terminal
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-blue-800 text-sm">
            <h3 className="font-semibold mb-1 text-lg">Important Notice</h3>
            <p className='text-justify text-lg'>
              Geneva Airport has a <a target="_blank" className='underline font-bold' href="https://www.gva.ch/en/Site/Passagers/Acces-Transports/Plan/Secteur-France">French Sector</a> which is mainly used for internal flights although some international flights may sometimes use this terminal. It is unlikely you will arrive at the French sector but if so, do not exit through French Customs but follow the signs for Switzerland, transit through Swiss customs and you will arrive at T1.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
