
import React, { useState, useEffect } from 'react';
import { Footprint } from '../types';
import { PERMANENT_FOOTPRINTS } from '../siteData';
import { generateSyncLink } from '../utils/syncProvider';
import { Plus, Calendar, MapPin, Trash2, Share2, Check } from 'lucide-react';

const Footprints: React.FC = () => {
  const [localFootprints, setLocalFootprints] = useState<Footprint[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('our_dynamic_footprints');
    if (saved) setLocalFootprints(JSON.parse(saved));
  }, []);

  // 合并永久数据和本地数据
  const allFootprints = [...PERMANENT_FOOTPRINTS, ...localFootprints].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const saveLocal = (data: Footprint[]) => {
    setLocalFootprints(data);
    localStorage.setItem('our_dynamic_footprints', JSON.stringify(data));
  };

  const handleAdd = () => {
    if (!newDate || !newTitle) return;
    const newItem: Footprint = {
      id: 'dynamic_' + Date.now().toString(),
      date: newDate,
      title: newTitle,
      description: newDesc
    };
    saveLocal([...localFootprints, newItem]);
    setIsAdding(false);
    setNewDate(''); setNewTitle(''); setNewDesc('');
  };

  const handleShare = (fp: Footprint) => {
    const link = generateSyncLink('footprint', fp);
    navigator.clipboard.writeText(link);
    setCopiedId(fp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteItem = (id: string) => {
    saveLocal(localFootprints.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
      <div className="flex justify-between items-center px-4">
        <div>
          <h2 className="text-4xl font-serif text-pink-900">我们的足迹</h2>
          <p className="text-pink-400 text-sm mt-1">记录共同走过的每一个精彩瞬间</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:rotate-90 transition-all"
        >
          <Plus />
        </button>
      </div>

      {isAdding && (
        <div className="mx-4 glass p-6 rounded-3xl border-2 border-pink-200 animate-fade-in shadow-2xl">
          <h4 className="text-lg font-bold text-pink-800 mb-4">记录新的瞬间</h4>
          <div className="grid gap-4">
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="px-4 py-2 rounded-xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300" />
            <input type="text" placeholder="标题 (例如: 第一次远行)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="px-4 py-2 rounded-xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300" />
            <textarea placeholder="描述这一天的细节..." value={newDesc} onChange={e => setNewDesc(e.target.value)} className="px-4 py-2 rounded-xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300 h-24 resize-none" />
            <button onClick={handleAdd} className="bg-pink-500 text-white py-3 rounded-xl font-bold">保存到本地</button>
          </div>
        </div>
      )}

      <div className="relative border-l-4 border-dashed border-pink-200 ml-8 md:ml-16 pl-10 space-y-12">
        {allFootprints.map((item) => (
          <div key={item.id} className="relative group">
            <div className="absolute -left-[54px] top-2 bg-white w-6 h-6 rounded-full border-4 border-pink-500 shadow-md z-10"></div>
            <div className="glass p-6 rounded-3xl relative transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Calendar size={12} /> {item.date}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare(item)} 
                    className="p-2 text-pink-300 hover:text-pink-600 transition-colors"
                    title="生成分享链接发给TA"
                  >
                    {copiedId === item.id ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
                  </button>
                  {item.id.startsWith('dynamic_') && (
                    <button onClick={() => deleteItem(item.id)} className="p-2 text-pink-100 hover:text-rose-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
              <h4 className="text-xl font-bold text-pink-900 flex items-center gap-2">
                <MapPin size={18} className="text-pink-400" /> {item.title}
              </h4>
              <p className="text-gray-600 mt-3 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-pink-50 rounded-2xl mx-4 border border-pink-100 flex items-start gap-3">
        <div className="bg-pink-500 text-white p-1 rounded mt-1"><Share2 size={14}/></div>
        <p className="text-xs text-pink-400 leading-normal">
          <b>提示：</b>在这里添加的足迹保存在你的浏览器中。点击足迹右上角的“分享”图标，将生成的链接发给TA，TA点开后这个足迹就会出现在TA的手机上啦！
        </p>
      </div>
    </div>
  );
};

export default Footprints;
