# cPanel'e Deployment Rehberi - Özkan İnşaat

## 📋 Gereksinimler

### cPanel Hosting Gereksinimleri
- **Node.js desteği** (Node.js 18.x veya üzeri)
- **PostgreSQL veya MySQL** veritabanı
- **SSH erişimi** (opsiyonel ama önerilir)
- **SSL Sertifikası** (Let's Encrypt ücretsiz)
- **En az 1GB RAM** (Next.js için)
- **Domain veya subdomain**: www.ozkan-insaat.com

### Lokal Bilgisayarınızda
- FileZilla veya benzeri FTP/SFTP istemcisi
- Git Bash veya Terminal
- Node.js kurulu

---

## 🎯 Deployment Stratejileri

cPanel'de Next.js uygulaması için 2 ana strateji var:

### **Strateji 1: Static Export (Önerilen - Basit Hosting)**
Next.js uygulamasını tamamen static HTML/CSS/JS dosyalarına dönüştürme. En uyumlu ve kolay yöntem.

### **Strateji 2: Node.js Server (Gelişmiş)**
cPanel'in Node.js desteği ile tam Next.js server çalıştırma. Tüm özellikleri kullanabilirsiniz.

Bu rehberde **her iki stratejiyi** anlatacağım.

---

## 📦 Strateji 1: Static Export ile Deployment

### Adım 1: Projeyi Static Export için Hazırlama

#### 1.1. next.config.js Güncelleme

```bash
cd c:\ozkaninsaat\frontend
```

`next.config.js` dosyasını düzenleyin:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export için
  images: {
    unoptimized: true, // cPanel static hosting için gerekli
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ozkan-insaat.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true, // SEO için
};

module.exports = nextConfig;
```

#### 1.2. Package.json'a Export Script Ekleme

`frontend/package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next build && next export",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### 1.3. Static Export Oluşturma

```bash
cd c:\ozkaninsaat\frontend
npm run build
```

Build tamamlandıktan sonra `out` klasörü oluşacak. Bu klasör tüm static dosyaları içerir.

### Adım 2: cPanel'e Dosyaları Yükleme

#### 2.1. cPanel'e Giriş Yapın
- https://www.ozkan-insaat.com:2083 veya hosting sağlayıcınızın cPanel URL'si
- Kullanıcı adı ve şifrenizle giriş yapın

#### 2.2. File Manager ile Yükleme

1. **File Manager**'ı açın
2. `public_html` klasörüne gidin (veya subdomain için ilgili klasör)
3. Mevcut dosyaları yedekleyin (varsa)
4. `frontend/out` klasöründeki **TÜM** dosyaları `public_html`'e yükleyin

**Manuel Upload:**
- File Manager → Upload
- `out` klasöründeki tüm dosyaları sürükle-bırak

**FTP ile Upload (Daha Hızlı):**

```bash
# FileZilla kullanarak:
Host: ftp.ozkan-insaat.com
Username: your_cpanel_username
Password: your_cpanel_password
Port: 21

# Yerel: c:\ozkaninsaat\frontend\out\*
# Uzak: /public_html/
```

### Adım 3: .htaccess Yapılandırması

`public_html/.htaccess` dosyası oluşturun veya düzenleyin:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Handle routing for Next.js pages
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access 1 year"
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/gif "access 1 year"
  ExpiresByType image/png "access 1 year"
  ExpiresByType text/css "access 1 month"
  ExpiresByType application/javascript "access 1 month"
</IfModule>
```

### Adım 4: Domain SSL Kurulumu

1. **SSL/TLS Status** bölümüne gidin
2. **Let's Encrypt SSL** seçin
3. `www.ozkan-insaat.com` için SSL kurun
4. Auto-Renew'i aktifleştirin

---

## 🚀 Strateji 2: Node.js Server ile Deployment

### Adım 1: cPanel Node.js Uygulaması Oluşturma

#### 1.1. Setup Node.js App
1. cPanel → **Setup Node.js App**
2. Yeni uygulama oluştur:
   - **Node.js version**: 18.x veya 20.x
   - **Application mode**: Production
   - **Application root**: `ozkaninsaat/frontend`
   - **Application URL**: `www.ozkan-insaat.com`
   - **Application startup file**: `server.js`

#### 1.2. Server.js Oluşturma

`frontend/server.js`:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
  .listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### Adım 2: Dosyaları SSH ile Yükleme

```bash
# Git kullanarak (SSH erişimi varsa)
ssh your_username@www.ozkan-insaat.com
cd ~/ozkaninsaat
git clone https://github.com/yourusername/ozkaninsaat.git
cd ozkaninsaat/frontend
npm install
npm run build
```

### Adım 3: Environment Variables

cPanel Node.js App ayarlarında:

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.ozkan-insaat.com/api
NEXT_PUBLIC_SITE_URL=https://www.ozkan-insaat.com
```

---

## 🗄️ Database Kurulumu

### PostgreSQL (Önerilir)

#### 1. cPanel → PostgreSQL Databases
1. **Yeni veritabanı oluştur**: `ozkaninsaat_db`
2. **Yeni kullanıcı oluştur**: `ozkaninsaat_user`
3. Kullanıcıyı veritabanına ekle (TÜM yetkiler)

#### 2. Uzak Erişim İzni
- **Remote PostgreSQL** → IP adresinizi ekleyin
- Veya `%` (tüm IP'ler - güvenli değil)

#### 3. Connection String

```bash
DATABASE_URL="postgresql://ozkaninsaat_user:PASSWORD@localhost:5432/ozkaninsaat_db"
```

### MySQL Alternatifi

cPanel → MySQL Databases ile aynı adımlar.

Prisma schema'yı MySQL için düzenleyin:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

---

## 🔧 Backend API Deployment

### Seçenek 1: Subdomain (api.ozkan-insaat.com)

#### 1. Subdomain Oluştur
cPanel → Subdomains → `api.ozkan-insaat.com` → `public_html/api`

#### 2. Node.js App Kur
- Setup Node.js App → `api` subdomain için
- Application root: `ozkaninsaat/backend`
- Startup file: `src/index.js`

#### 3. Backend Dosyaları Yükle

```bash
# Backend klasörünü yükle
cd c:\ozkaninsaat\backend
# FTP veya Git ile tüm dosyaları yükle
```

#### 4. Dependencies Yükle

SSH veya Terminal ile:

```bash
cd ~/ozkaninsaat/backend
npm install
npx prisma generate
npx prisma db push
```

### Seçenek 2: Aynı Domain Alt Yolu (/api)

.htaccess ile proxy:

```apache
RewriteEngine On
RewriteRule ^api/(.*)$ http://localhost:4000/api/$1 [P,L]
```

---

## 📝 Build ve Deploy Script

### Windows için deploy.ps1

`c:\ozkaninsaat\deploy.ps1`:

```powershell
# Özkan İnşaat - cPanel Deploy Script

Write-Host "🚀 Özkan İnşaat - cPanel Deployment" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# 1. Frontend Build
Write-Host "`n📦 Building Frontend..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\frontend"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend build successful!" -ForegroundColor Green

# 2. Backend Hazırlama
Write-Host "`n📦 Preparing Backend..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\backend"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Backend prepared!" -ForegroundColor Green

# 3. FTP Bilgileri
$FTP_HOST = Read-Host "FTP Host (örn: ftp.ozkan-insaat.com)"
$FTP_USER = Read-Host "FTP Username"
$FTP_PASS = Read-Host "FTP Password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($FTP_PASS)
$FTP_PASS_PLAIN = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# 4. FileZilla veya WinSCP ile upload
Write-Host "`n📤 FileZilla/WinSCP ile dosyaları yükleyin:" -ForegroundColor Yellow
Write-Host "Frontend: $PSScriptRoot\frontend\out\* → /public_html/" -ForegroundColor Cyan
Write-Host "Backend: $PSScriptRoot\backend\* → /ozkaninsaat/backend/" -ForegroundColor Cyan

Write-Host "`n✅ Deployment hazırlıkları tamamlandı!" -ForegroundColor Green
Write-Host "Manuel olarak FTP ile dosyaları yükleyin." -ForegroundColor Yellow
```

Çalıştırmak için:

```powershell
cd c:\ozkaninsaat
.\deploy.ps1
```

---

## ✅ Deployment Checklist

### Pre-Deployment

- [ ] Frontend build testi yaptım (`npm run build`)
- [ ] Backend build testi yaptım
- [ ] Environment variables hazır
- [ ] Database backup aldım
- [ ] Domain DNS ayarları doğru
- [ ] SSL sertifikası hazır

### Deployment

- [ ] Database oluşturuldu
- [ ] Frontend dosyları yüklendi
- [ ] Backend dosyaları yüklendi
- [ ] .htaccess yapılandırıldı
- [ ] Node.js apps başlatıldı
- [ ] Environment variables ayarlandı

### Post-Deployment

- [ ] Site açılıyor (https://www.ozkan-insaat.com)
- [ ] Admin paneli çalışıyor (/admin/login)
- [ ] API endpoint çalışıyor
- [ ] Database bağlantısı çalışıyor
- [ ] SSL sertifikası aktif
- [ ] Google Analytics eklendi (opsiyonel)
- [ ] Error logs kontrol edildi

---

## 🔍 Troubleshooting

### 1. 500 Internal Server Error

**Sorun**: .htaccess hatalı veya PHP versiyonu uyumsuz

**Çözüm**:
```bash
# .htaccess dosyasını geçici olarak yeniden adlandır
# File Manager'da hata loglarını kontrol et
```

### 2. Next.js Routing Çalışmıyor

**Sorun**: .htaccess rewrite kuralları eksik

**Çözüm**: Yukarıdaki .htaccess örneğini kullanın

### 3. Node.js App Başlamıyor

**Sorun**: Port çakışması veya memory yetersiz

**Çözüm**:
```bash
# cPanel → Setup Node.js App → Restart
# Error logs kontrol et
```

### 4. Database Connection Failed

**Sorun**: Connection string yanlış

**Çözüm**:
```bash
# cPanel → PostgreSQL → Allow Remote Connections
# Kullanıcı izinlerini kontrol et
```

### 5. Images Yüklenmiyor

**Sorun**: next/image optimization cPanel'de çalışmıyor

**Çözüm**: next.config.js'de `images.unoptimized: true`

---

## 📊 Performance Optimization

### 1. CDN Kullanımı (Cloudflare - Ücretsiz)

1. Cloudflare'e kayıt olun
2. Domain'i ekleyin: www.ozkan-insaat.com
3. Nameserver'ları değiştirin
4. SSL: Full (Strict) modu aktif
5. Caching: Cache Level = Standard

### 2. Compression

.htaccess'e ekleyin:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### 3. Browser Caching

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
</IfModule>
```

---

## 📱 Domain Yönetimi

### DNS Ayarları

cPanel → Zone Editor:

```
Type    Name                Value                          TTL
A       @                   YOUR_SERVER_IP                 14400
A       www                 YOUR_SERVER_IP                 14400
CNAME   api                 www.ozkan-insaat.com           14400
TXT     @                   "v=spf1 include:_spf.mx.google.com ~all"
```

### SSL Auto-Renewal

cPanel → SSL/TLS Status → AutoSSL aktif

---

## 🆘 Destek

### Hosting Sağlayıcı Desteği

1. cPanel hosting'iniz Node.js destekliyor mu?
2. PostgreSQL kurulu mu?
3. SSH erişimi var mı?
4. Memory limiti nedir?

### Alternatif Deployment

cPanel uygun değilse:

- **Vercel** (Frontend için - Ücretsiz) - vercel.com
- **Railway** (Backend için - Ücretsiz başlangıç) - railway.app
- **DigitalOcean** (Full stack - $5/ay) - digitalocean.com
- **Netlify** (Static export için - Ücretsiz) - netlify.com

---

## 📞 İletişim

Deployment sırasında sorun yaşarsanız:

- Email: destek@ozkaninsaat.com
- Hosting support ticket açın
- cPanel documentation: docs.cpanel.net

---

## 🎉 Başarılı Deployment!

Site canlıya alındıktan sonra:

1. **Google Search Console** ekleyin
2. **Google Analytics** kurun
3. **Sitemap** gönderin (automatic Next.js)
4. **robots.txt** kontrol edin
5. **Yedekleme planı** oluşturun

**Site URL**: https://www.ozkan-insaat.com
**Admin Panel**: https://www.ozkan-insaat.com/admin

---

**Not**: Bu rehber genel cPanel yapılandırması içindir. Hosting sağlayıcınıza göre bazı adımlar değişiklik gösterebilir.
