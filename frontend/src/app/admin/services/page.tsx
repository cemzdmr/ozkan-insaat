'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  active: boolean;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('admin_services');
    if (stored) {
      setServices(JSON.parse(stored));
    } else {
      const defaultServices = [
        {
          id: 1,
          title: 'Konut İnşaatı',
          description: 'Modern konut projelerinde uzman ekibimizle hizmetinizdeyiz',
          icon: '🏠',
          features: ['Villa projeleri', 'Apartman inşaatı', 'Toplu konut projeleri', 'İç mimari'],
          active: true
        },
        {
          id: 2,
          title: 'Ticari İnşaat',
          description: 'İş merkezleri ve ticari alanlar için kapsamlı çözümler',
          icon: '🏢',
          features: ['Ofis binaları', 'AVM inşaatı', 'Otel projeleri', 'Endüstriyel yapılar'],
          active: true
        }
      ];
      setServices(defaultServices);
      localStorage.setItem('admin_services', JSON.stringify(defaultServices));
    }
  }, []);
  
  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem('admin_services', JSON.stringify(services));
    }
  }, [services]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: '🏗️',
    features: [''],
    active: true
  });

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        icon: '🏗️',
        features: [''],
        active: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id ? { ...formData, id: editingService.id } as Service : s
      ));
    } else {
      const newService = {
        ...formData,
        id: Math.max(...services.map(s => s.id), 0) + 1
      } as Service;
      setServices([...services, newService]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const toggleActive = (id: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), '']
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, features: newFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Hizmet Yönetimi</h1>
          <p className="text-gray-400 mt-1">{services.length} hizmet bulundu</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Yeni Hizmet Ekle
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gray-800 rounded-xl p-6 border ${
              service.active ? 'border-gray-700 hover:border-yellow-400' : 'border-red-500/50'
            } transition-colors relative`}
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => toggleActive(service.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  service.active 
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                    : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                }`}
              >
                {service.active ? 'Aktif' : 'Pasif'}
              </button>
            </div>

            {/* Icon */}
            <div className="text-5xl mb-4">{service.icon}</div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{service.description}</p>

            {/* Features */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 mb-2">ÖZELLİKLER:</p>
              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    {feature}
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-gray-400">
                    +{service.features.length - 3} daha fazla
                  </li>
                )}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={() => handleOpenModal(service)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <PencilIcon className="w-4 h-4" />
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
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
                {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hizmet Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    placeholder="ör: Konut İnşaatı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    İkon (Emoji) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    placeholder="🏗️"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Açıklama *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    placeholder="Hizmet hakkında kısa açıklama..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Özellikler *
                  </label>
                  <div className="space-y-2">
                    {formData.features?.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                          placeholder={`Özellik ${index + 1}`}
                        />
                        {formData.features && formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                    >
                      + Özellik Ekle
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({...formData, active: e.target.checked})}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
                    />
                    <span className="text-sm text-gray-300">Hizmeti aktif olarak göster</span>
                  </label>
                </div>
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
                  {editingService ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
