'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Pin, 
  Calendar, 
  Edit3, 
  Check, 
  X,
  Clock,
  Tag,
  Copy,
  LayoutGrid,
  List,
  MoreVertical,
  Globe,
  Download,
  Share2,
  Heart,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeTab, setActiveTab] = useState('My Notes'); // 'My Notes' or 'Explore'

  const categories = ['All', 'Work', 'Personal', 'Ideas', 'Todo'];

  const communityNotes = [
    {
      id: 'comm-1',
      title: '🚀 Strategic Growth 2026',
      content: 'Key focus areas: AI integration, customer-centric UX, and sustainable scaling. Focus on product-market fit in emerging economies.',
      createdAt: Date.now() - 86400000 * 2,
      updatedAt: Date.now() - 86400000 * 2,
      category: 'Work',
      author: 'Alex Rivera',
      isPublic: true,
      saves: 124
    },
    {
      id: 'comm-2',
      title: '🧠 Peak Performance Habits',
      content: '1. Deep work 90min sessions\n2. Digital detox 1hr before bed\n3. Daily gratitude journaling\n4. Cold plunges for focus.',
      createdAt: Date.now() - 86400000,
      updatedAt: Date.now() - 86400000,
      category: 'Personal',
      author: 'Sarah Chen',
      isPublic: true,
      saves: 342
    },
    {
      id: 'comm-3',
      title: '🎨 Design Inspiration List',
      content: 'Check out: Framer motion for interactions, Linear for clean layouts, and Stripe for payments experience.',
      createdAt: Date.now() - 5000000,
      updatedAt: Date.now() - 5000000,
      category: 'Ideas',
      author: 'Jordan Bell',
      isPublic: true,
      saves: 89
    }
  ];

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('pro-notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse saved notes", e);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pro-notes', JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!input.trim() && !title.trim()) return;

    if (isEditing) {
      setNotes(notes.map(note => 
        note.id === isEditing 
          ? { ...note, title, content: input, updatedAt: Date.now() } 
          : note
      ));
      setIsEditing(null);
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title: title || 'Untitled Note',
        content: input,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        category: selectedCategory === 'All' ? 'Personal' : selectedCategory,
        isPinned: false,
      };
      setNotes([newNote, ...notes]);
    }
    
    setInput('');
    setTitle('');
  };

  const cloneNote = (note) => {
    const clonedNote = {
      ...note,
      id: crypto.randomUUID(),
      title: `${note.title} (Saved)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPinned: false,
    };
    setNotes([clonedNote, ...notes]);
    setActiveTab('My Notes');
    // alert('Note saved to your collection!');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const startEdit = (note) => {
    setIsEditing(note.id);
    setTitle(note.title);
    setInput(note.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setTitle('');
    setInput('');
  };

  const filteredNotes = useMemo(() => {
    if (activeTab === 'Explore') {
      return communityNotes.filter(note => 
        note.title.toLowerCase().includes(search.toLowerCase()) || 
        note.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    return notes
      .filter(note => {
        const matchesSearch = 
          note.title.toLowerCase().includes(search.toLowerCase()) || 
          note.content.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        return b.updatedAt - a.updatedAt;
      });
  }, [notes, search, selectedCategory, activeTab]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-extrabold gradient-text tracking-tight mb-2">
            Notes Saver Pro
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-muted text-lg font-medium">Capture your thoughts in premium style.</p>
            <div className="h-4 w-px bg-card-border" />
            <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
              {['My Notes', 'Explore'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === tab 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-muted hover:text-foreground'
                  }`}
                >
                  {tab === 'Explore' && <Globe className="w-3 h-3 inline mr-1" />}
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={activeTab === 'Explore' ? "Search community notes..." : "Search my notes..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-card rounded-2xl outline-none focus:ring-2 focus:ring-primary/40 transition-all text-foreground placeholder:text-muted/60"
            />
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-3 glass-card rounded-xl hover:bg-white/5 transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-6 h-6" /> : <LayoutGrid className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Sidebar/Section (Only show in My Notes) */}
        {activeTab === 'My Notes' && (
          <aside className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-3xl p-6 shadow-2xl sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h2 className="text-xl font-bold">{isEditing ? 'Edit Note' : 'New Note'}</h2>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Note Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent border-b border-card-border py-2 text-xl font-semibold outline-none focus:border-primary transition-colors"
                />
                <textarea
                  placeholder="Start typing your thoughts..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent min-h-[150px] resize-none outline-none py-2 text-foreground/80 leading-relaxed custom-scrollbar"
                />
                
                <div className="pt-4 border-t border-card-border space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {categories.filter(c => c !== 'All').map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          selectedCategory === cat 
                          ? 'bg-primary text-white shadow-lg shadow-primary/40' 
                          : 'bg-white/5 text-muted hover:bg-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={saveNote}
                      disabled={!input.trim() && !title.trim()}
                      className="flex-1 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      {isEditing ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {isEditing ? 'Update Note' : 'Create Note'}
                    </button>
                    {isEditing && (
                      <button
                        onClick={cancelEdit}
                        className="px-4 glass-card rounded-2xl hover:bg-red-500/10 hover:border-red-500/50 transition-all text-red-500"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Notes Feed */}
        <section className={activeTab === 'My Notes' ? 'lg:col-span-8' : 'lg:col-span-12'}>
          {/* Category Filter Desktop */}
          {activeTab === 'My Notes' && (
            <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-6 py-2 rounded-2xl font-bold transition-all ${
                    selectedCategory === cat 
                    ? 'bg-primary/20 text-primary border border-primary/50' 
                    : 'text-muted hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {filteredNotes.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  {activeTab === 'Explore' ? <Search className="w-10 h-10 text-muted" /> : <Edit3 className="w-10 h-10 text-muted" />}
                </div>
                <h3 className="text-2xl font-bold mb-2">No {activeTab === 'Explore' ? 'community' : ''} notes found</h3>
                <p className="text-muted">
                  {activeTab === 'Explore' ? 'Try searching for something else!' : 'Start by creating your first masterpiece!'}
                </p>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className={`grid gap-6 ${viewMode === 'grid' ? (activeTab === 'Explore' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2') : 'grid-cols-1'}`}
              >
                {filteredNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -4 }}
                    className={`group glass-card rounded-3xl p-6 transition-all hover:bg-white/5 relative flex flex-col ${
                      note.isPinned ? 'ring-1 ring-primary/40 bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider mb-1">
                          {note.category}
                        </span>
                        {note.author && (
                          <span className="text-[10px] text-muted font-medium">By {note.author}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {activeTab === 'Explore' ? (
                          <button
                            onClick={() => cloneNote(note)}
                            className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all group/btn"
                            title="Save to my notes"
                          >
                            <Bookmark className="w-4 h-4 group-focus-within/btn:fill-current" />
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => togglePin(note.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                note.isPinned ? 'text-primary bg-primary/10' : 'text-muted hover:text-foreground hover:bg-white/5'
                              }`}
                            >
                              <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-primary' : ''}`} />
                            </button>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              <button
                                onClick={() => startEdit(note)}
                                className="p-2 text-muted hover:text-accent hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteNote(note.id)}
                                className="p-2 text-muted hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{note.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                      {note.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-card-border mt-auto">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Calendar className="w-3 h-3" />
                        {formatDate(note.createdAt)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        {activeTab === 'Explore' ? (
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                            {note.saves}
                          </div>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}