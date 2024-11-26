# Lost It Find It | PAW Tugas Akhir

![header lost it find it](https://github.com/saaip7/PAW_TA_lostit-findit/blob/main/documentation/header-git.png)

**Lost It Find It** adalah aplikasi web yang dirancang untuk membantu mahasiswa mencari atau melaporkan barang-barang yang hilang atau ditemukan di area kampus. Aplikasi ini memungkinkan pengguna untuk mengunggah informasi barang temuan serta mencari barang mereka yang hilang. Proyek ini dikembangkan sebagai bagian dari Tugas Akhir untuk mata kuliah *Pengembangan Aplikasi Web*.

### Tim Pengembang

| No  | Nama                        | NIM                 |
|-----|-----------------------------|---------------------|
| 1   | Tsabitah Inayah              | 22/498733/TK/54717  |
| 2   | Abyyu Abdul Azhim Raihan     | 22/497717/TK/54562  |
| 3   | Melvin Waluyo                | 22/492978/TK/53972  |
| 4   | Fatimah Nadia Eka Putri      | 22/497876/TK/54588  |
| 5   | Syaifullah Hilmi Ma’arij     | 22/497775/TK/54568  |


### Links

- **Presentasi PowerPoint:**
  - [Google Drive](https://bit.ly/paw05-slide)
  - [Canva](https://www.canva.com/design/DAGXeFT3kq0/bFXnTsLIVpHl77FaPTLNbw/edit?utm_content=DAGXeFT3kq0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
  
- **Frontend Deployment:**
  - [https://lost-it-find-it.vercel.app/](https://lost-it-find-it.vercel.app/)

- **Demo Video:**
  - [YouTube Link](https://youtu.be/XmsMzmOMlsY)

- **Figma**
  - [Figma Desain](https://www.figma.com/design/dnyah6Box0ev2cUpI3nzMo/PAW---LostIt%3F-FindIt!?node-id=40-6495&t=UhATQ4dzstu3RkAk-1)



---

## Cara Menjalankan

### 1. Clone Repository
Jalankan perintah berikut untuk menyalin repository ke lokal:
```bash
git clone https://github.com/saaip7/PAW_TA_lostit-findit.git
cd lost-it-find-it
```

### 2. Instalasi Dependensi
Jalankan perintah berikut untuk menginstal semua dependensi:
```bash
npm install
```


> [!IMPORTANT]
> Terkadang ada dependensi yang harus diinstall dalam folder `client` tersendiri maupun dalam folder `server` tersendiri.
> Jadi perhatikan jika ada error

### 3. Konfigurasi Environment
Ada dua file `.env` yang harus dibuat.

- Untuk `.env` dalam folder `server`
```env
MONGO_URI = ""
JWT_SECRET = ""
CLOUDINARY_CLOUD_NAME= ""
CLOUDINARY_API_KEY= ""
CLOUDINARY_API_SECRET= ""
```
Sesuaikan dengan key milikmu


- Untuk `.env` dalam folder `client`
```env
NEXT_PUBLIC_API_URL= ""
```
Karena dijalankan di local, gunakan `http://localhost:port/` sesuai dengan port yang digunakan, **pastikan backend sudah berjalan**


### 4. Menjalankan Aplikasi
> [!TIP]
> Gunakan cara pertama untuk mempermudah run aplikasi

Terdapat dua cara untuk menjalankan aplikasi
- Langsung di dalam folder root `..\PAW_TA_lostit-findit\` (tidak dalam folder `server` maupun `client`)
```bash
npm run start
```

- Dengan run di kedua folder
Buka dua terminal yang berbeda, masing-masing `cd` ke dalam folder `server` dan `client`. Kemudian jalankan kode dibawah dimasing-masing terminal
```bash
npm run dev
```

> Akses aplikasi di browser melalui alamat: [http://localhost:3000](http://localhost:3000). (Normalnya NEXT.JS akan running di port 3000)


---

## Akun Tersedia
Kami sediakan akun untuk mencoba role yang ada. Untuk akun role `user`, bisa dicoba untuk membuat akun sendiri

<details>
<summary>Klik untuk membuka</summary>

  
**ADMIN**

> email: admin@mail.com
> 
> pass: admin


**USER**
> email: fufu@mail.com
> 
> pass: fufu

</details>

> [!CAUTION]
> Harap gunakan akun kami (terutama admin) dengan bijak.


