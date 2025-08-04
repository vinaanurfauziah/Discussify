# 💬 Forum Diskusi App — Automation Testing & CI/CD

Repositori ini merupakan bagian dari submission akhir kelas **Menjadi React Web Developer Expert** dari Dicoding. Fokus utama proyek ini adalah menerapkan **Automation Testing**, **Continuous Integration**, dan **Continuous Deployment** (CI/CD) pada aplikasi forum diskusi yang telah dikembangkan pada submission sebelumnya.

---

## 🚀 Fitur Unggulan Aplikasi

- Otentikasi pengguna (login/register)
- Membuat dan membalas thread diskusi
- Voting thread dan komentar
- Leaderboard pengguna aktif
- Filter thread berdasarkan kategori
- UI interaktif dan mobile-friendly

---

## ✅ Checklist Submission Akhir

### 🔹 Kriteria Utama 1: Automation Testing

| Jenis Pengujian | Jumlah | Tools |
|------------------|--------|-------|
| Reducer Testing  | ✅ 2+   | Jest |
| Thunk Function   | ✅ 2+   | Jest |
| React Component  | ✅ 2+   | React Testing Library |
| End-to-End       | ✅ 1+   | Cypress |

🧪 Pengujian dapat dijalankan dengan:
```bash
npm test          # untuk unit & integration test
npm run e2e       # untuk E2E test menggunakan Cypress
```
## 🚀 Deployment & React Ecosystem

### 🔹 Kriteria Utama 2: CI/CD Deployment

✅ **CI**: GitHub Actions untuk otomatisasi testing  
✅ **CD**: Deploy otomatis ke Vercel  
✅ **Branch** `main` dilindungi dengan Branch Protection Rules  

📷 **Bukti Implementasi** (tersimpan di folder `screenshots/` dalam ZIP submission):
- `1_ci_check_error.png`
- `2_ci_check_pass.png`
- `3_branch_protection.png`

🔗 **Live URL**: https://forum-diskusi-app.vercel.app

---

### 🔹 Kriteria Utama 3: React Ecosystem

Aplikasi ini memanfaatkan:

✅ **Framer Motion** — untuk animasi transisi UI  
✅ **Zustand** — alternatif pengelolaan state  
✅ **Storybook** — dokumentasi dan pengujian visual komponen UI

---

### 🔹 Kriteria Utama 4: Kelengkapan Submission Sebelumnya

Aplikasi tetap memenuhi fungsionalitas submission sebelumnya:

✅ Fitur voting thread & komentar  
✅ Halaman leaderboard  
✅ Filter thread berdasarkan kategori  
✅ Penanganan bugs yang disorot oleh reviewer sebelumnya

---

## 📦 Install dan Jalankan Aplikasi

### 1. Clone repositori
```bash
git clone https://github.com/username/forum-diskusi-app.git
cd forum-diskusi-app

