'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { siteConfig } from '@/config/site';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Demo mode: Check credentials locally without backend
      if (email === siteConfig.adminCredentials.email && password === 'AdminPass123!') {
        // Create a demo token
        const demoToken = 'demo-token-' + Date.now();
        localStorage.setItem('adminToken', demoToken);
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
        return;
      }

      // Try backend API if available
      try {
        const response = await axios.post('http://localhost:4000/api/auth/login', {
          email,
          password,
        });

        // Store token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } catch (backendError) {
        // If backend is not available, show error
        throw new Error('E-posta veya şifre hatalı!');
      }
    } catch (err: any) {
      setError(err.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Özkan İnşaat</h1>
          <p className="text-gray-400">Admin Paneli</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Giriş Yap</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={siteConfig.adminCredentials.email}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          {/* Default Credentials Info */}
          <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 mb-2">Varsayılan Giriş Bilgileri:</p>
            <p className="text-xs text-gray-300">E-posta: {siteConfig.adminCredentials.email}</p>
            <p className="text-xs text-gray-300">Şifre: AdminPass123!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
