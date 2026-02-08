
import React, { useState } from 'react';
import { GardenPhoto } from '../types';
import { GARDEN_PHOTOS } from '../siteData';
import { Image as ImageIcon, RefreshCcw, Heart } from 'lucide-react';

const MemoryGarden: React.FC = () => {
  const [photos, setPhotos] = useState<GardenPhoto[]>([]);

  const addPhoto = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const randomIndex = Math.floor(Math.random() * 60) + 1;
    const randomUrl = `https://raw.githubusercontent.com/yuanshenking666/OneYear/main/docs/images/photo${randomIndex}.jpg`;
    const newPhoto: GardenPhoto = {
      id: Date.now().toString(),
      x,
      y,
      url: randomUrl,
      rotation: (Math.random() - 0.5) * 40
    };
    
    setPhotos(prev => [...prev, newPhoto]);
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif text-pink-800 mb-2">我们的照片墙</h3>
        <p className="text-gray-600">在这片草地上，撒下属于我们的独家回忆。</p>
      </div>
      
      <div 
        className="relative w-full max-w-5xl overflow-hidden rounded-[2.5rem] border-[12px] border-white shadow-2xl bg-gradient-to-b from-sky-200 to-green-100 cursor-crosshair mb-8" 
        style={{ height: '600px' }}
        onClick={addPhoto}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="absolute p-3 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] animate-fade-in transition-transform hover:scale-110 hover:z-50"
            style={{
              left: photo.x - 70,
              top: photo.y - 70,
              transform: `rotate(${photo.rotation}deg)`,
              width: '140px'
            }}
          >
            <div className="w-full h-[120px] overflow-hidden bg-gray-50 mb-3 border border-gray-100">
              <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-center">
               <Heart size={12} className="text-pink-200 fill-pink-200" />
            </div>
          </div>
        ))}

        {photos.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-400 opacity-60 pointer-events-none">
            <div className="animate-bounce mb-4">
               <ImageIcon size={64} />
            </div>
            <p className="text-lg font-medium">点击这片草地，随机召唤一张合照</p>

          </div>
        )}
      </div>

      <button 
        onClick={() => setPhotos([])}
        className="flex items-center gap-2 px-8 py-3 bg-white text-pink-500 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
      >
        <RefreshCcw size={18} /> 清空墙面
      </button>
    </div>
  );
};

export default MemoryGarden;
