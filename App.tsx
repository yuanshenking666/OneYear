
import React, { useState, useEffect } from 'react';
import TimeCounter from './components/TimeCounter';
import LoveNotes from './components/LoveNotes';
import MemoryGarden from './components/MemoryGarden';
import Footprints from './components/Footprints';
import { AppSection, Note, Footprint } from './types';
import { checkIncomingSync } from './utils/syncProvider';
import { Heart, MessageCircle, Flower2, Map, Menu, X, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSyncToast, setShowSyncToast] = useState(false);

  useEffect(() => {
    // 监听 URL 同步信号
    const hasSync = checkIncomingSync(
      (newNote: Note) => {
        const existing = JSON.parse(localStorage.getItem('love_notes') || '[]');
        if (!existing.find((n: Note) => n.id === newNote.id)) {
          localStorage.setItem('love_notes', JSON.stringify([newNote, ...existing]));
          setActiveSection(AppSection.NOTES);
          setShowSyncToast(true);
        }
      },
      (newFp: Footprint) => {
        const existing = JSON.parse(localStorage.getItem('our_dynamic_footprints') || '[]');
        if (!existing.find((f: Footprint) => f.id === newFp.id)) {
          localStorage.setItem('our_dynamic_footprints', JSON.stringify([...existing, newFp]));
          setActiveSection(AppSection.TIMELINE);
          setShowSyncToast(true);
        }
      }
    );

    if (showSyncToast) {
      const timer = setTimeout(() => setShowSyncToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSyncToast]);

  const NavItem = ({ section, icon: Icon, label }: { section: AppSection, icon: any, label: string }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setIsMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
        activeSection === section 
        ? 'bg-pink-500 text-white shadow-lg scale-105' 
        : 'text-pink-400 hover:bg-pink-100'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen pb-24 relative">
      {/* 同步成功提示 */}
      {showSyncToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-pink-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles size={18} />
          <span>成功接收到一份爱的同步数据！</span>
        </div>
      )}

      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-pink-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-cursive font-bold text-pink-600">我们的无限时刻</h1>
        
        <nav className="hidden md:flex gap-4">
          <NavItem section={AppSection.HOME} icon={Heart} label="首页" />
          <NavItem section={AppSection.NOTES} icon={MessageCircle} label="留言" />
          <NavItem section={AppSection.GARDEN} icon={Flower2} label="照片墙" />
          <NavItem section={AppSection.TIMELINE} icon={Map} label="足迹" />
        </nav>

        <button className="md:hidden text-pink-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-pink-50/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 md:hidden animate-fade-in">
          <NavItem section={AppSection.HOME} icon={Heart} label="首页" />
          <NavItem section={AppSection.NOTES} icon={MessageCircle} label="留言" />
          <NavItem section={AppSection.GARDEN} icon={Flower2} label="照片墙" />
          <NavItem section={AppSection.TIMELINE} icon={Map} label="足迹" />
        </div>
      )}

      <main className="container mx-auto px-4 pt-28">
        {activeSection === AppSection.HOME && (
          <div className="space-y-12 animate-fade-in">
            <section className="text-center max-w-2xl mx-auto">
              <div className="relative inline-block mb-6 animate-float">
                <Heart className="text-pink-500 fill-pink-200" size={80} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-xs text-pink-600 font-bold">永远</span>
                </div>
              </div>
              <TimeCounter />
            </section>


          </div>
        )}

        {activeSection === AppSection.NOTES && <LoveNotes />}
        {activeSection === AppSection.GARDEN && <MemoryGarden />}
        {activeSection === AppSection.TIMELINE && <Footprints />}
      </main>

      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute animate-float opacity-10" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, transform: `scale(${0.5 + Math.random()})` }}>
            <Heart className="text-pink-300 fill-pink-300" size={Math.random() * 40 + 20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
