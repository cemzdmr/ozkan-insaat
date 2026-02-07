'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  date: string;
  read: boolean;
}

export default function AdminContact() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filterRead, setFilterRead] = useState('all');
  
  useEffect(() => {
    const stored = localStorage.getItem('admin_contacts');
    if (stored) {
      setContacts(JSON.parse(stored));
    } else {
      const defaultContacts: Contact[] = [
        {
          id: 1,
          name: 'Ahmet Yılmaz',
          email: 'ahmet@example.com',
          phone: '0532 123 45 67',
          subject: 'Proje Teklifi',
          message: 'Merhaba, yeni bir proje için teklif almak istiyorum...',
          date: new Date().toISOString(),
          read: false
        }
      ];
      setContacts(defaultContacts);
      localStorage.setItem('admin_contacts', JSON.stringify(defaultContacts));
    }
  }, []);
  
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('admin_contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const filteredContacts = contacts.filter(contact => {
    if (filterRead === 'read') return contact.read;
    if (filterRead === 'unread') return !contact.read;
    return true;
  });

  const handleToggleRead = (id: number) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, read: !c.read } : c
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">İletişim Mesajları</h1>
          <p className="text-gray-400 mt-1">{filteredContacts.length} mesaj bulundu</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex gap-4">
          <button
            onClick={() => setFilterRead('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterRead === 'all' 
                ? 'bg-yellow-400 text-black font-medium' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Tümü ({contacts.length})
          </button>
          <button
            onClick={() => setFilterRead('unread')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterRead === 'unread' 
                ? 'bg-yellow-400 text-black font-medium' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Okunmamış ({contacts.filter(c => !c.read).length})
          </button>
          <button
            onClick={() => setFilterRead('read')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterRead === 'read' 
                ? 'bg-yellow-400 text-black font-medium' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Okunmuş ({contacts.filter(c => c.read).length})
          </button>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gray-800 rounded-xl p-6 border ${
              contact.read ? 'border-gray-700' : 'border-yellow-400'
            } hover:border-yellow-400 transition-colors`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {contact.name}
                  {!contact.read && (
                    <span className="px-2 py-1 bg-yellow-400 text-black text-xs rounded-full">
                      Yeni
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-400">{new Date(contact.date).toLocaleDateString('tr-TR')}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleRead(contact.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    contact.read 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {contact.read ? 'Okunmadı İşaretle' : 'Okundu İşaretle'}
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Sil"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${contact.email}`} className="text-yellow-400 hover:underline">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${contact.phone}`} className="text-yellow-400 hover:underline">
                    {contact.phone}
                  </a>
                </div>
              )}
            </div>

            {contact.subject && (
              <div className="mb-2">
                <p className="text-sm text-gray-400">Konu:</p>
                <p className="text-white font-medium">{contact.subject}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-400 mb-2">Mesaj:</p>
              <p className="text-white">{contact.message}</p>
            </div>
          </motion.div>
        ))}

        {filteredContacts.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
            <EnvelopeIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Henüz mesaj bulunmuyor</p>
          </div>
        )}
      </div>
    </div>
  );
}
