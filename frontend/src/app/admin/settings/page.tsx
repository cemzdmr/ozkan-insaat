'use client';

import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Sistem Ayarları</h1>
        <p className="text-gray-400 mt-1">Site ayarlarını yönetin</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
        <Cog6ToothIcon className="w-24 h-24 text-gray-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Yakında!</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Ayarlar sayfası yakında eklenecek. Bu bölümde site başlığı, logo, sosyal medya linkleri ve diğer genel ayarları düzenleyebileceksiniz.
        </p>
      </div>
    </div>
  );
}
