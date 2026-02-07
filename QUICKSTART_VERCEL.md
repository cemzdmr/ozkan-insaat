# 🚀 GitHub ve Vercel Deployment - Hızlı Başlangıç

## 1️⃣ GitHub'a Yükle (Terminal'de)

```powershell
# İlk kez ise Git init
cd c:\ozkaninsaat
git init
git add .
git commit -m "Initial commit - Özkan İnşaat"

# GitHub'a bağlan (kendi bilgilerinizle değiştirin)
git remote add origin https://github.com/KULLANICI_ADI/ozkan-insaat.git
git branch -M main
git push -u origin main
```

**Not**: GitHub kullanıcı adı ve token gerekir.

---

## 2️⃣ Vercel'de Deploy Et

### A) Web Arayüzü (Önerilen)

1. [vercel.com](https://vercel.com) → GitHub ile giriş yap
2. "New Project" → Repository seç
3. **Root Directory**: `frontend`
4. "Deploy" → 3 dakika bekle ✨

### B) CLI

```powershell
npm install -g vercel
vercel login
cd c:\ozkaninsaat
vercel
```

---

## 3️⃣ Test Et

✅ Site: `https://ozkan-insaat.vercel.app`  
✅ Admin: `https://ozkan-insaat.vercel.app/admin/login`

**Giriş:**
- Email: admin@ozkaninsaat.com
- Şifre: admin123

---

## 🌐 Custom Domain (Opsiyonel)

Vercel Dashboard → Domains → Add `www.ozkan-insaat.com`

DNS ayarları:
```
A Record:    @ → 76.76.21.21
CNAME:       www → cname.vercel-dns.com
```

---

## 🔄 Güncelleme

```powershell
git add .
git commit -m "Güncelleme"
git push
# Otomatik deploy! ✅
```

**Detaylı rehber**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
