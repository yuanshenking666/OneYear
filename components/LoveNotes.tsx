
import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { generateSyncLink } from '../utils/syncProvider';
import { Heart, Send, Trash2, Share2, Check } from 'lucide-react';

const LoveNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('love_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem('love_notes', JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (!inputValue.trim()) return;
    const newNote: Note = {
      id: 'note_' + Date.now().toString(),
      content: inputValue,
      author: authorName || '某人',
      timestamp: Date.now()
    };
    saveNotes([newNote, ...notes]);
    setInputValue('');
  };

  const handleShare = (note: Note) => {
    const link = generateSyncLink('note', note);
    navigator.clipboard.writeText(link);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-fade-in">
      <section className="bg-white/60 p-8 rounded-[2rem] shadow-xl border border-pink-100 backdrop-blur-xl">
        <h3 className="text-2xl font-serif text-pink-800 mb-4 flex items-center gap-2">
          <Heart className="fill-pink-500 text-pink-500" size={24} /> 甜蜜寄语
        </h3>
        <p className="text-gray-600 mb-6">写下一段话，生成“分享链接”发给TA，TA点开后就会永久保存在TA的留言板上。</p>
        
        <div className="space-y-4">
          <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} placeholder="你的昵称" className="w-full px-4 py-3 rounded-xl border border-pink-50 focus:ring-2 focus:ring-pink-200 outline-none bg-white/40" />
          <textarea value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="我想对你说..." rows={3} className="w-full px-4 py-3 rounded-xl border border-pink-50 focus:ring-2 focus:ring-pink-200 outline-none bg-white/40 resize-none" />
          <button onClick={addNote} className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors">
            <Send size={18} /> 发布留言
          </button>
        </div>
      </section>

      <div className="space-y-4">
        {notes.map(note => (
          <div key={note.id} className="bg-white/50 p-6 rounded-2xl border border-white shadow-sm flex justify-between items-start group">
            <div className="space-y-3 flex-1">
              <p className="text-gray-800 text-lg leading-relaxed">{note.content}</p>
              <div className="flex items-center gap-2 text-xs text-pink-400 font-medium">
                <span>— {note.author}</span>
                <span>•</span>
                <span>{new Date(note.timestamp).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleShare(note)} className="p-2 text-pink-200 hover:text-pink-500 transition-colors">
                {copiedId === note.id ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
              </button>
              <button onClick={() => saveNotes(notes.filter(n => n.id !== note.id))} className="p-2 text-pink-100 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveNotes;
