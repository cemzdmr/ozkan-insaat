# 🚀 cPanel Deployment - Hızlı Başlangıç

## 5 Dakikada Deployment

### Ön Hazırlık (Lokal Bilgisayarınızda)

```powershell
# 1. Deployment klasörünü oluştur
cd c:\ozkaninsaat
.\deploy.ps1
```

Bu script:
- ✅ Frontend'i build eder
- ✅ Backend'i hazırlar  
- ✅ `deploy` klasörü oluşturur
- ✅ Tüm dosyaları kopyalar

### cPanel'de Yapılacaklar

#### 1️⃣ Database Oluştur (2 dk)

**cPanel → PostgreSQL Databases**

```sql
Database Name: ozkaninsaat_db
Username: ozkaninsaat_user
Password: [güçlü bir şifre]
```

✅ Kullanıcıyı veritabanına ekle (ALL PRIVILEGES)

#### 2️⃣ Frontend Yükle (3 dk)

**Yöntem 1: File Manager**
1. cPanel → File Manager
2. `public_html` klasörüne git
3. Mevcut dosyaları yedekle/sil
4. `deploy/frontend/*` dosyalarını yükle (drag & drop)
5. `.htaccess.cpanel` dosyasını `.htaccess` olarak yeniden adlandır

**Yöntem 2: FTP (Önerilen - Daha Hızlı)**
```
FileZilla ile:
Host: ftp.ozkan-insaat.com
User: [cpanel_kullanıcı_adınız]
Pass: [cpanel_şifreniz]

Lokal: c:\ozkaninsaat\deploy\frontend\*
Uzak:  /public_html/
```

#### 3️⃣ Backend Yükle (Opsiyonel - API için)

**cPanel → Setup Node.js App**

Ayarlar:
- Node version: 18.x
- Application root: `backend`
- Application URL: `api.ozkan-insaat.com` (subdomain oluştur)
- Startup file: `src/index.js`

**Terminal'de:**
```bash
cd ~/backend
npm install
npx prisma generate
npx prisma db push
```

#### 4️⃣ SSL Kur (1 dk)

**cPanel → SSL/TLS Status**
- Let's Encrypt SSL seç
- www.ozkan-insaat.com için kur
- Auto-renew aktif

#### 5️⃣ Test Et

✅ **Frontend**: https://www.ozkan-insaat.com  
✅ **Admin Panel**: https://www.ozkan-insaat.com/admin/login  
✅ **API** (varsa): https://api.ozkan-insaat.com/api/health

---

## 🔧 Sadece Static Site (Backend Yok)

Backend kullanmayacaksanız:

```powershell
# frontend/next.config.js
output: 'export',
images: { unoptimized: true }
```

Sonra:
```powershell
cd c:\ozkaninsaat\frontend
npm run build
```

`out` klasöründeki dosyaları `public_html`'e yükle. **Bitti!** ✅

---

## ⚡ Hızlı Komutlar

### Lokal Build Testi
```powershell
cd c:\ozkaninsaat\frontend
npm run build
npm start  # test için
```

### Yeniden Deploy
```powershell
# Değişiklikleri yap, sonra:
.\deploy.ps1

# Sadece değişen dosyaları FTP'le yükle
```

### Database Reset (Dikkat!)
```bash
# SSH ile cPanel'e bağlan
cd ~/backend
npx prisma db push --force-reset
```

---

## 🆘 Sorun Giderme

### Site açılmıyor
1. .htaccess dosyası var mı?
2. SSL kurulu mu?
3. DNS propagation bitti mi? (24 saat)

### Admin panel 404 veriyor
Dosyalar doğru yüklendi mi?
```
/public_html/
  ├── admin/
  │   └── login.html
  ├── index.html
  └── .htaccess
```

### Database bağlanamıyor
1. cPanel → Remote PostgreSQL → IP ekle
2. .env dosyası DATABASE_URL doğru mu?
3. User permissions kontrol et

### Images yüklenmiyor
`next.config.js`:
```js
images: { unoptimized: true }
```

---

## 📞 Destek

**Hosting sorunları için:**
- Hosting sağlayıcı support ticket
- Live chat

**Proje sorunları için:**
- Email: destek@ozkaninsaat.com

---

## 🎯 Deployment Yapıldı mı?

- [ ] Frontend yüklendi
- [ ] SSL kuruldu  
- [ ] Site açılıyor
- [ ] Admin panel çalışıyor
- [ ] Database bağlandı (backend varsa)

### Hepsi ✅ ise → Tebrikler! 🎉

**Site canlıda:** https://www.ozkan-insaat.com

---

## 📚 Detaylı Dokümantasyon

Daha fazla bilgi için:
- **Tam rehber**: `CPANEL_DEPLOYMENT.md`
- **Alternatif hostingler**: Vercel, Netlify, Railway

---

**Son güncelleme**: Şubat 2026  
**Versiyon**: 1.0
