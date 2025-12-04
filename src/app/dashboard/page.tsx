"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { getToken, logoutUser } from "@/lib/auth"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogOut, Plus, Pencil, Trash2, Search, X, Save, Briefcase } from "lucide-react"; 

// Types
interface JwtPayload {
  username: string; 
  email: string;
  role: string;
}

interface Position {
  position_id?: number; 
  id?: number;         
  position_code: string;
  position_name: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // CRUD States
  const [items, setItems] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<Position>>({});
  const [formData, setFormData] = useState({ position_code: "", position_name: "" });

  // API URL
  const API_URL = "https://nestjs-jnff.onrender.com/positions"; 

  // --- AUTH CHECK ---
  useEffect(() => {
    setIsMounted(true);
    const storedToken = getToken();

    if (!storedToken) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      setUser(decoded);
      fetchItems(storedToken); // Load items immediately
    } catch (e) {
      handleLogout();
    }
  }, [router]);

  // --- HELPER: Get ID ---
  const getId = (item: Position) => item.position_id || item.id;

  // --- CRUD FUNCTIONS ---

  // 1. READ (Fetch Data)
  const fetchItems = async (token: string) => {
    try {
      const res = await fetch(API_URL, {
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
        },
      });
      
      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. CREATE & UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const token = getToken();
    
    const payload = {
        position_code: formData.position_code,
        position_name: formData.position_name
    };

    try {
        if (isEditing && currentItem) {
            const id = getId(currentItem as Position);
            // UPDATE (PUT)
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(payload),
            });
             if (!res.ok) throw new Error();
        } else {
            // CREATE (POST)
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error();
        }
        setIsModalOpen(false);
        if(token) fetchItems(token); // Refresh list
    } catch (error) {
        alert("Nabigo ang operasyon. Pakisuyong suriin ang iyong input o koneksyon.");
    }
  };

  // 3. DELETE
  const handleDelete = async (id?: number) => {
    if(!id) return;
    if(!confirm("Sigurado ka bang nais mong tanggalin ang posisyong ito?")) return;

    const token = getToken();
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) throw new Error();
``
        if(token) fetchItems(token); // Refresh List
    } catch (error) {
        alert("Nabigong magtanggal");
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  // Modal Helpers
  const openAddModal = () => {
      setIsEditing(false);
      setCurrentItem({});
      setFormData({ position_code: "", position_name: "" });
      setIsModalOpen(true);
  };

  const openEditModal = (item: Position) => {
      setIsEditing(true);
      setCurrentItem(item);
      setFormData({ 
          position_code: item.position_code, 
          position_name: item.position_name 
      });
      setIsModalOpen(true);
  };

  // Filter items
  const filteredItems = items.filter(item => 
    item.position_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.position_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isMounted || !user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950 text-white z-50">
        <p className="animate-pulse">Naglo-load ang Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-950 overflow-hidden flex flex-col">
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-950/95 backdrop-blur-[2px]"></div>

      {/* --- DASHBOARD CONTENT --- */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-7xl mx-auto p-4 md:p-8">
        
{/* HEADER: Welcome + Buttons */}
<div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md gap-4 shadow-lg">
    <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
            {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                Hello, <span className="text-blue-400 capitalize">{user.username}</span>!
            </h1>
            <p className="text-slate-400 text-sm">Pamahalaan ang iyong mga posisyon nang maayos.</p>
        </div>
    </div>

    {/* BUTTONS: Go to Portfolio + Logout */}
    <div className="flex gap-3 w-full md:w-auto">
        <Button
            onClick={() => router.push("/")}
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/20 w-full md:w-auto"
        >
            See my portfolio
        </Button>

        <Button
            variant="destructive"
            onClick={handleLogout}
            className="shadow-lg hover:shadow-red-500/20 w-full md:w-auto"
        >
            <LogOut size={18} className="mr-2" /> Mag-logout
        </Button>
    </div>
</div>
        {/* CRUD TOOLBAR */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                    placeholder="Maghanap ng mga posisyon..." 
                    className="pl-10 bg-white/5 border-white/10 text-white focus:border-blue-500 h-11 rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all hover:scale-105 h-11">
                <Plus size={18} className="mr-2" /> Magdagdag ng Bagong Posisyon
            </Button>
        </div>

        {/* DATA GRID (LIST OF POSITIONS) */}
        <div className="flex-1 overflow-y-auto pr-2 pb-20 custom-scrollbar">
            {loading ? (
                <div className="text-center text-slate-500 mt-20 flex flex-col items-center">
                    <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    Naglo-load ng data...
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 flex flex-col items-center">
                    <Briefcase size={48} className="text-slate-600 mb-4" />
                    <p className="text-slate-400 text-lg">Walang natagpuang mga posisyon.</p>
                    <p className="text-slate-600 text-sm">I-click ang "Magdagdag ng Bagong Posisyon" para gumawa ng isa.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                        <Card key={getId(item)} className="bg-white/5 border-white/10 text-white backdrop-blur-sm hover:bg-white/10 transition-all group relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-bold flex items-center gap-2 text-blue-100">
                                    <Briefcase size={18} className="text-blue-500" />
                                    {item.position_name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400 text-sm mb-6 font-mono bg-black/20 p-2 rounded border border-white/5">
                                    CODE: {item.position_code}
                                </p>
                                <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
                                    <Button size="sm" variant="outline" onClick={() => openEditModal(item)} className="h-8 border-white/20 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200">
                                        <Pencil size={14} className="mr-1" /> I-edit
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDelete(getId(item))} className="h-8 border-white/20 text-red-400 hover:bg-red-500/20 hover:text-red-200">
                                        <Trash2 size={14} className="mr-1" /> Tanggalin
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>

      </div>

      {/* --- CUSTOM MODAL (POPUP) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-white/20">
                
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {isEditing ? <Pencil size={20} className="text-yellow-400" /> : <Plus size={20} className="text-blue-400" />}
                        {isEditing ? "I-edit ang Posisyon" : "Magdagdag ng Bagong Posisyon"}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                {/* Modal Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Code ng Posisyon</label>
                        <Input 
                            value={formData.position_code} 
                            onChange={(e) => setFormData({...formData, position_code: e.target.value})}
                            className="bg-black/40 border-white/10 text-white focus:border-blue-500 h-11 rounded-lg font-mono"
                            placeholder="hal. IT-001"
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Pangalan ng Posisyon</label>
                        <Input 
                            value={formData.position_name} 
                            onChange={(e) => setFormData({...formData, position_name: e.target.value})}
                            className="bg-black/40 border-white/10 text-white focus:border-blue-500 h-11 rounded-lg"
                            placeholder="hal. Software Engineer"
                            required
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white hover:bg-white/5">
                            Kanselahin
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg">
                            <Save size={16} /> {isEditing ? "I-update" : "Lumikha"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}