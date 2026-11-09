# PB_WEB_JS_MODUL 8

Perancangan 
1. Fitur pengambilan artikel dari API 
Fungsi muatArtikelDariAPI() digunakan untuk mengambil 5 data artikel dari API JSONPlaceholder secara asynchronous menggunakan async/await. Data judul (title) dan isi (body) yang diterima diubah menjadi elemen HTML <article> lalu dimasukkan ke dalam tampilan portofolio (.daftar-portofolio).

2. Fitur komentar dari API dan loading
Fungsi muatKomentarAPI() bertugas mengambil daftar komentar dari endpoint /posts/1/comments. Saat data sedang dimuat, animasi spinner loading (#loading) ditampilkan (display = "block"). Setelah proses selesai atau gagal, indikator loading disembunyikan kembali pada blok finally (display = "none"), lalu data komentar dimasukkan ke dalam daftar <ul>.

3. Fitur error handling
Proses fetch dibungkus dengan struktur try-catch-finally. Karena fetch() tidak otomatis menganggap respon status HTTP 404 atau 500 sebagai error, program mengecek kondisi !response.ok. Jika ada masalah, program melempar error (throw new Error()) secara manual agar ditangkap oleh blok catch untuk menampilkan pesan kesalahan yang jelas di layar.

4. Fitur integrasi data API dengan manipulasi  DOM
Data artikel dan komentar yang diambil dari API dihubungkan langsung dengan fungsi DOM dari modul sebelumnya. Elemen hasil fetch tetap bisa diinteraksi oleh pengguna (seperti tombol like, tombol hapus, dan penyimpanan local storage) tanpa memicu bentrok fungsi atau error pada program.

