'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Project {
  id: number;
  title: string;
  location: string;
  year: number;
  status: string;
  category: string;
  area: string;
  duration: string;
  image: string;
  description: string;
  featured?: boolean;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('admin_projects');
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      // Default projects
      const defaultProjects = [
        {
          id: 1,
          title: 'Modern Rezidans Projesi',
          location: 'İstanbul, Beşiktaş',
          year: 2023,
          status: 'Tamamlandı',
          category: 'Konut',
          area: '25.000 m²',
          duration: '24 ay',
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
          description: 'Modern mimari tasarıma sahip lüks konut projesi'
        },
        {
          id: 2,
          title: 'AVM İnşaatı',
          location: 'Ankara, Çankaya',
          year: 2024,
          status: 'Devam Ediyor',
          category: 'Ticari',
          area: '45.000 m²',
          duration: '36 ay',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
          description: 'Şehir merkezinde modern alışveriş merkezi'
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('admin_projects', JSON.stringify(defaultProjects));
    }
  }, []);
  
  // Save to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('admin_projects', JSON.stringify(projects));
    }
  }, [projects]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tümü');
  const [filterStatus, setFilterStatus] = useState('Tümü');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    location: '',
    year: new Date().getFullYear(),
    status: 'Devam Ediyor',
    category: 'Konut',
    area: '',
    duration: '',
    image: '',
    description: '',
    featured: false
  });

  const categories = ['Tümü', 'Konut', 'Ticari', 'Altyapı', 'Endüstriyel'];
  const statuses = ['Tümü', 'Devam Ediyor', 'Tamamlandı', 'Planlanan'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Tümü' || project.category === filterCategory;
    const matchesStatus = filterStatus === 'Tümü' || project.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        location: '',
        year: new Date().getFullYear(),
        status: 'Devam Ediyor',
        category: 'Konut',
        area: '',
        duration: '',
        image: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id ? { ...formData, id: editingProject.id } as Project : p
      ));
    } else {
      // Add new project
      const newProject = {
        ...formData,
        id: Math.max(...projects.map(p => p.id)) + 1
      } as Project;
      setProjects([...projects, newProject]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Proje Yönetimi</h1>
          <p className="text-gray-400 mt-1">{filteredProjects.length} proje bulundu</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Yeni Proje Ekle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Proje ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-400 transition-colors"
          >
            {/* Project Image */}
            <div className="relative h-48">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {project.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-black">
                    ⭐ Öne Çıkan
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Tamamlandı' ? 'bg-green-500 text-white' :
                  project.status === 'Devam Ediyor' ? 'bg-blue-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-400">{project.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-gray-400">Kategori</p>
                  <p className="text-white font-medium">{project.category}</p>
                </div>
                <div>
                  <p className="text-gray-400">Yıl</p>
                  <p className="text-white font-medium">{project.year}</p>
                </div>
                <div>
                  <p className="text-gray-400">Alan</p>
                  <p className="text-white font-medium">{project.area}</p>
                </div>
                <div>
                  <p className="text-gray-400">Süre</p>
                  <p className="text-white font-medium">{project.duration}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          >
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {editingProject ? 'Proje Düzenle' : 'Yeni Proje Ekle'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Proje Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Lokasyon *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kategori *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  >
                    {categories.filter(c => c !== 'Tümü').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Durum *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  >
                    {statuses.filter(s => s !== 'Tümü').map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Yıl *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Alan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ör: 25.000 m²"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Süre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ör: 24 ay"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Görsel URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Açıklama *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-300">⭐ Anasayfada öne çıkan olarak göster</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium transition-colors"
                >
                  {editingProject ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
