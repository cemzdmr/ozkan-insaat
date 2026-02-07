# 🚀 Vercel Deployment Rehberi

## Neden Vercel?

✅ **Next.js'in yaratıcısı** - Tam uyumluluk  
✅ **Ücretsiz** - Hobby plan, sınırsız proje  
✅ **5 dakika** - Otomatik deployment  
✅ **SSL ücretsiz** - HTTPS otomatik  
✅ **localStorage çalışır** - Client-side rendering tam destek  
✅ **Admin panel çalışır** - Tüm özellikler aktif  
✅ **Otomatik güncelleme** - Git push = Canlıya geçer  

---

## ⚡ Hızlı Deployment (2 Yöntem)

### Yöntem 1: GitHub ile (Önerilen)

#### 1. GitHub'a Repository Oluştur

1. [GitHub.com](https://github.com/new) → "New repository"
2. Repository adı: `ozkan-insaat`
3. Public/Private seç
4. **"Create repository"**

#### 2. Projeyi GitHub'a Yükle

```powershell
# Terminal'de (c:\ozkaninsaat klasöründe)
cd c:\ozkaninsaat

# Git init (eğer yoksa)
git init

# Tüm dosyaları ekle
git add .

# Commit yap
git commit -m "Initial commit - Özkan İnşaat website"

# GitHub'a bağlan (KULLANICI_ADI ve REPO_ADI kendi bilgileriniz)
git remote add origin https://github.com/KULLANICI_ADI/ozkan-insaat.git

# Push (ilk kez)
git branch -M main
git push -u origin main
```

**Not**: GitHub kullanıcı adı/şifre yerine **Personal Access Token** kullanmanız gerekebilir:
- GitHub → Settings → Developer settings → Personal access tokens → Generate new
- Repo access ver
- Token'ı kopyala ve şifre yerine kullan

#### 3. Vercel'de Deploy Et

1. [Vercel.com](https://vercel.com) → "Sign Up" (GitHub ile giriş yap)
2. **"Add New Project"**
3. GitHub repository seç: `ozkan-insaat`
4. **"Import"**

**Ayarlar:**
```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
```

**Environment Variables (Opsiyonel):**
```env
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

5. **"Deploy"** → 2-3 dakika bekle ✨

**🎉 Site hazır!** → `https://ozkan-insaat.vercel.app`

---

### Yöntem 2: Vercel CLI (Terminal'den)

#### 1. Vercel CLI Kur

```powershell
npm install -g vercel
```

#### 2. Login

```powershell
vercel login
```

Email ile giriş yap (doğrulama linki gelecek)

#### 3. Deploy

```powershell
cd c:\ozkaninsaat\frontend
vercel
```

**Sorulara cevaplar:**
```
? Set up and deploy "frontend"? [Y/n] Y
? Which scope? [Kendi hesabınız]
? Link to existing project? [N]
? What's your project's name? ozkan-insaat
? In which directory is your code located? ./
```

**🎉 Deployment başladı!**

İlk deployment sonrası:
```powershell
# Production'a deploy
vercel --prod
```

---

## 🌐 Custom Domain (www.ozkan-insaat.com)

### 1. Vercel Dashboard'da Domain Ekle

1. Vercel → Project → **"Settings"** → **"Domains"**
2. **"Add Domain"**
3. `www.ozkan-insaat.com` yaz
4. Vercel size DNS kayıtlarını gösterecek

### 2. Domain Sağlayıcıda DNS Ayarla

Domain yönetim panelinde (GoDaddy, Namecheap, vb.):

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Alternatif (Sadece CNAME):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL Otomatik

Vercel otomatik SSL sertifikası kurar (Let's Encrypt)  
24 saat içinde aktif olur ✅

---

## 📁 Proje Yapısı (Önemli)

Vercel'de deployment yaparken `frontend` klasörü **root directory** olmalı:

```
ozkan-insaat/
├── frontend/          ← Vercel buraya bakar
│   ├── src/
│   ├── package.json
│   └── next.config.js
└── backend/           ← Şimdilik kullanılmıyor
```

**Vercel ayarında:**
- Root Directory: `frontend`

---

## 🔧 Vercel Ayarları

### Build & Development Settings

```
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

### Environment Variables

Dashboard → Settings → Environment Variables:

```env
# Production
NEXT_PUBLIC_SITE_URL=https://www.ozkan-insaat.com
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
NODE_ENV=production
```

---

## 🔄 Otomatik Güncelleme

Her `git push` = Otomatik deployment:

```powershell
# Değişiklik yap
git add .
git commit -m "Güncelleme mesajı"
git push

# Vercel otomatik deploy eder (2-3 dk)
```

**Preview deployments**: Her branch otomatik preview URL alır!

---

## 🎯 Deployment Sonrası Kontroller

### ✅ Checklist

- [ ] Ana sayfa açılıyor: `https://your-project.vercel.app`
- [ ] Projeler sayfası çalışıyor: `/projeler`
- [ ] Referanslar sayfası çalışıyor: `/referanslar`
- [ ] Hizmetler sayfası çalışıyor: `/hizmetler`
- [ ] İletişim formu çalışıyor: `/iletisim`
- [ ] Admin panel açılıyor: `/admin/login`
- [ ] Admin login çalışıyor (localStorage)
- [ ] Admin CRUD işlemleri çalışıyor
- [ ] Resimler görünüyor
- [ ] SSL aktif (HTTPS)
- [ ] Mobil responsive
- [ ] Sayfalar hızlı yükleniyor

### Test Admin Girişi

```
Email: admin@ozkaninsaat.com
Şifre: admin123
```

---

## 🆘 Sorun Giderme

### Build hatası: "Module not found"

```powershell
# node_modules ve package-lock.json sil
cd c:\ozkaninsaat\frontend
Remove-Item -Recurse node_modules
Remove-Item package-lock.json

# Yeniden kur
npm install

# Test build
npm run build

# Git'e push
git add .
git commit -m "Fix dependencies"
git push
```

### "window is not defined" hatası

Componenti `'use client'` ile işaretle:

```tsx
'use client';

import { useState } from 'react';
// ... component code
```

### Images yüklenmiyor

`next.config.js` kontrol et:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
},
```

### Domain propagation uzun sürüyor

- DNS değişikliği 24-48 saat sürebilir
- Kontrol: [whatsmydns.net](https://whatsmydns.net)
- Vercel dashboard'da "Valid Configuration" görmeli

### Deployment çok yavaş

- Büyük node_modules → `.vercelignore` ekle
- Gereksiz dosyalar → `.gitignore` kontrol et

---

## 📊 Vercel Dashboard

### Analytics (Ücretsiz)

Vercel → Project → **"Analytics"**
- Page views
- Visitor stats
- Performance metrics

### Logs

Vercel → Project → **"Deployments"** → Deployment seç → **"View Function Logs"**

### Performance

Vercel → **"Speed Insights"** (Lighthouse skorları)

---

## 💰 Ücretlendirme

### Hobby Plan (Ücretsiz)

✅ Sınırsız proje  
✅ 100 GB bandwidth  
✅ SSL sertifikaları  
✅ Otomatik preview deployments  
✅ 1 takım üyesi  

**Özkan İnşaat için yeterli!** 🎉

### Pro Plan ($20/ay)

- Daha fazla bandwidth
- Takım işbirliği
- Analytics++
- Priority support

---

## 🔐 Güvenlik

### Environment Variables

Hassas bilgileri Vercel Dashboard'a ekle, **asla kod'a yazma**:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
ADMIN_PASSWORD=...
```

### Headers (Otomatik)

Vercel otomatik güvenlik headers ekler:
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

---

## 🚀 Gelişmiş Özellikler

### Preview Deployments

Her branch otomatik URL alır:

```powershell
git checkout -b feature/yeni-ozellik
git push origin feature/yeni-ozellik

# Vercel otomatik preview URL oluşturur
# https://ozkan-insaat-git-feature-yeni-ozellik.vercel.app
```

### Edge Functions

`middleware.ts` ile edge functions:

```ts
// middleware.ts
export function middleware(request: Request) {
  // Edge'de çalışır (hızlı!)
}
```

### Serverless Functions

`/api` routes otomatik serverless olur (ama şu an backend yok)

---

## 📞 Destek

**Vercel Help:**
- Docs: [vercel.com/docs](https://vercel.com/docs)
- Discord: [vercel.com/discord](https://vercel.com/discord)
- Email: support@vercel.com

**GitHub Issues:**
- Next.js: [github.com/vercel/next.js/issues](https://github.com/vercel/next.js/issues)

---

## 🎉 Özet

1. **GitHub'a push et**
2. **Vercel'e bağla**
3. **Deploy düğmesine bas**
4. **5 dakika bekle**
5. **Site canlıda!** 🚀

**www.ozkan-insaat.com** → Custom domain ekle (15 dk)

---

## 📚 Alternatif Hostingler

Vercel yerine başka seçenekler:

1. **Netlify** - Vercel benzeri, ücretsiz
2. **Railway** - Backend + Frontend
3. **AWS Amplify** - AWS ekosistemi
4. **Cloudflare Pages** - CDN + hosting

Ama **Next.js için en iyisi Vercel!** ✅

---

**Son güncelleme**: Şubat 2026  
**Proje**: Özkan İnşaat Corporate Website  
**Framework**: Next.js 14.1.0  
**Deployment**: Vercel (Önerilen)
