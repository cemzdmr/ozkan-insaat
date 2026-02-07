'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DocumentTextIcon,
  FolderIcon,
  UserGroupIcon,
  EnvelopeIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

interface Stats {
  pages: number;
  projects: number;
  references: number;
  contacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pages: 0,
    projects: 0,
    references: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get stats from localStorage
      const projects = JSON.parse(localStorage.getItem('admin_projects') || '[]');
      const references = JSON.parse(localStorage.getItem('admin_references') || '[]');
      const services = JSON.parse(localStorage.getItem('admin_services') || '[]');
      const contacts = JSON.parse(localStorage.getItem('admin_contacts') || '[]');

      setStats({
        pages: services.length,
        projects: projects.length,
        references: references.length,
        contacts: contacts.length,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Toplam Hizmet',
      value: stats.pages,
      icon: WrenchScrewdriverIcon,
      color: 'bg-blue-500',
      href: '/admin/services',
    },
    {
      name: 'Toplam Proje',
      value: stats.projects,
      icon: FolderIcon,
      color: 'bg-green-500',
      href: '/admin/projects',
    },
    {
      name: 'Toplam Referans',
      value: stats.references,
      icon: UserGroupIcon,
      color: 'bg-purple-500',
      href: '/admin/references',
    },
    {
      name: 'İletişim Mesajları',
      value: stats.contacts,
      icon: EnvelopeIcon,
      color: 'bg-orange-500',
      href: '/admin/contact',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Özkan İnşaat Yönetim Paneli</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="text-gray-400">Yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{card.name}</p>
                  <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/services"
            className="flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            <WrenchScrewdriverIcon className="h-5 w-5" />
            <span>Hizmetleri Yönet</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
          >
            <FolderIcon className="h-5 w-5" />
            <span>Projeleri Yönet</span>
          </Link>
          <Link
            href="/admin/references"
            className="flex items-center gap-3 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
          >
            <UserGroupIcon className="h-5 w-5" />
            <span>Referansları Yönet</span>
          </Link>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Sistem Bilgileri</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Platform:</span>
            <span className="text-white">Next.js 14 + Node.js + PostgreSQL</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Durum:</span>
            <span className="text-green-500">● Aktif</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Veritabanı:</span>
            <span className="text-white">PostgreSQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
