'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Reference {
  id: number;
  name: string;
  category: string;
  location: string;
  year: number;
  description: string;
  logo?: string;
}

export default function AdminReferences() {
  const [references, setReferences] = useState<Reference[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('admin_references');
    if (stored) {
      setReferences(JSON.parse(stored));
    } else {
      const defaultReferences = [
        {
          id: 1,
          name: 'ABC Holding',
          category: 'Özel Sektör',
          location: 'İstanbul',
          year: 2023,
          description: 'Ofis binası inşaatı ve iç mimari tasarım'
        },
        {
          id: 2,
          name: 'İstanbul Büyükşehir Belediyesi',
          category: 'Kamu',
          location: 'İstanbul',
          year: 2022,
          description: 'Altyapı ve kentsel dönüşüm projeleri'
        }
      ];
      setReferences(defaultReferences);
      localStorage.setItem('admin_references', JSON.stringify(defaultReferences));
    }
  }, []);
  
  useEffect(() => {
    if (references.length > 0) {
      localStorage.setItem('admin_references', JSON.stringify(references));
    }
  }, [references]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tümü');
  const [showModal, setShowModal] = useState(false);
  const [editingReference, setEditingReference] = useState<Reference | null>(null);
  const [formData, setFormData] = useState<Partial<Reference>>({
    name: '',
    category: 'Özel Sektör',
    location: '',
    year: new Date().getFullYear(),
    description: '',
    logo: ''
  });

  const categories = ['Tümü', 'Özel Sektör', 'Kamu', 'Uluslararası', 'Diğer'];

  const filteredReferences = references.filter(ref => {
    const matchesSearch = ref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ref.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Tümü' || ref.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (reference?: Reference) => {
    if (reference) {
      setEditingReference(reference);
      setFormData(reference);
    } else {
      setEditingReference(null);
      setFormData({
        name: '',
        category: 'Özel Sektör',
        location: '',
        year: new Date().getFullYear(),
        description: '',
        logo: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingReference(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingReference) {
      setReferences(references.map(r => 
        r.id === editingReference.id ? { ...formData, id: editingReference.id } as Reference : r
      ));
    } else {
      const newReference = {
        ...formData,
        id: Math.max(...references.map(r => r.id)) + 1
      } as Reference;
      setReferences([...references, newReference]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
      setReferences(references.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Referans Yönetimi</h1>
          <p className="text-gray-400 mt-1">{filteredReferences.length} referans bulundu</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Yeni Referans Ekle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Referans ara..."
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
        </div>
      </div>

      {/* References Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Firma Adı</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Lokasyon</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Yıl</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Açıklama</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredReferences.map((reference) => (
                <motion.tr
                  key={reference.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-750 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {reference.logo && (
                        <img
                          src={reference.logo}
                          alt={reference.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <span className="text-white font-medium">{reference.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium">
                      {reference.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{reference.location}</td>
                  <td className="px-6 py-4 text-gray-300">{reference.year}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm max-w-xs truncate">
                    {reference.description}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(reference)}
                        className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(reference.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title="Sil"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
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
                {editingReference ? 'Referans Düzenle' : 'Yeni Referans Ekle'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Firma Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logo URL (Opsiyonel)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.logo}
                    onChange={(e) => setFormData({...formData, logo: e.target.value})}
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
                  placeholder="Bu firma ile yapılan çalışmaların detayları..."
                />
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
                  {editingReference ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
