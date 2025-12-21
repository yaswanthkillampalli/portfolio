"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Save, ShieldCheck, Image as ImageIcon, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // -- Login Form State --
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // -- Data Entry State --
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Project Form Data
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    link: "",
    image_url: "",
    technologies: "", 
  });

  // Skill Form Data
  const [skillData, setSkillData] = useState({
    name: "",
    category: "Frontend",
    icon: "",
  });

  // Check if user is already logged in when page loads
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // -- Handlers --

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const techArray = projectData.technologies.split(',').map(t => t.trim());

      const { error } = await supabase.from('projects').insert([{
        title: projectData.title,
        description: projectData.description,
        link: projectData.link,
        image_url: projectData.image_url,
        technologies: techArray
      }]);

      if (error) throw error;
      setMessage("✅ Project added successfully!");
      setProjectData({ title: "", description: "", link: "", image_url: "", technologies: "" });
    } catch (error: any) {
      setMessage("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.from('skills').insert([skillData]);

      if (error) throw error;
      setMessage("✅ Skill added successfully!");
      setSkillData({ name: "", category: "Frontend", icon: "" });
    } catch (error: any) {
      setMessage("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // -- 1. Loading State --
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  // -- 2. Login Screen (If not logged in) --
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] pointer-events-none"></div>
        
        <form onSubmit={handleLogin} className="relative bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-gray-800 w-full max-w-sm shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <ShieldCheck className="text-blue-500" size={32} />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Login</h1>
          <p className="text-gray-400 text-center mb-6 text-sm">Sign in to manage your portfolio</p>
          
          {loginError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
              {loginError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold ml-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded-lg mt-1 focus:border-blue-500 outline-none transition"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold ml-1">Password</label>
              <input 
                type="password" 
                className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded-lg mt-1 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button disabled={loading} className="w-full bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white p-3 rounded-lg font-bold mt-6 transition shadow-lg shadow-blue-500/20 disabled:opacity-50 flex justify-center">
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  // -- 3. Admin Dashboard (If logged in) --
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Welcome back, {session.user.email}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm font-medium border border-red-500/20"
            >
              <LogOut size={16} /> Logout
            </button>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-8 text-center font-bold border ${message.includes("✅") ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* --- ADD PROJECT CARD --- */}
          <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
              <Plus size={20} /> Add New Project
            </h2>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Title</label>
                <input 
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                  value={projectData.title}
                  onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                  placeholder="e.g. MoodLens"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Description</label>
                <textarea 
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none h-28 transition resize-none"
                  value={projectData.description}
                  onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                  placeholder="Project details..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Link</label>
                    <input 
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                    value={projectData.link}
                    onChange={(e) => setProjectData({...projectData, link: e.target.value})}
                    placeholder="https://..."
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Tech (comma split)</label>
                    <input 
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                    value={projectData.technologies}
                    onChange={(e) => setProjectData({...projectData, technologies: e.target.value})}
                    placeholder="React, CSS"
                    />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Image URL</label>
                <div className="flex gap-2">
                    <input 
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition"
                    value={projectData.image_url}
                    onChange={(e) => setProjectData({...projectData, image_url: e.target.value})}
                    placeholder="Supabase URL"
                    />
                    <a href="https://supabase.com/dashboard/project/_/storage/buckets/portfolio-images" target="_blank" className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 border border-gray-700 text-gray-400 hover:text-white transition">
                        <ImageIcon size={20} />
                    </a>
                </div>
              </div>

              <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 flex justify-center items-center gap-2 transition shadow-lg shadow-blue-500/20">
                {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Save Project</>}
              </button>
            </form>
          </div>

          {/* --- ADD SKILL CARD --- */}
          <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 hover:border-purple-500/30 transition shadow-xl h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-purple-400">
              <Plus size={20} /> Add New Skill
            </h2>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Skill Name</label>
                <input 
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition"
                  value={skillData.name}
                  onChange={(e) => setSkillData({...skillData, name: e.target.value})}
                  placeholder="e.g. TypeScript"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Category</label>
                <select 
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition"
                  value={skillData.category}
                  onChange={(e) => setSkillData({...skillData, category: e.target.value})}
                >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="ML">Machine Learning</option>
                    <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1 font-semibold">Icon Name (Lucide)</label>
                <input 
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition"
                  value={skillData.icon}
                  onChange={(e) => setSkillData({...skillData, icon: e.target.value})}
                  placeholder="e.g. brain-circuit"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                    Check <a href="https://lucide.dev/icons" target="_blank" className="text-purple-400 hover:underline">Lucide Icons</a> for names.
                </p>
              </div>

              <button disabled={loading} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg mt-4 flex justify-center items-center gap-2 transition shadow-lg shadow-purple-500/20">
                 {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Save Skill</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}