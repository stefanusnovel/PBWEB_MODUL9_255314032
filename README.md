
## Perancangan

Pada praktikum ini, saya melanjutkan website profil pribadi dari praktikum sebelumnya. Jika sebelumnya Fetch API hanya digunakan untuk mengambil artikel dan komentar, sekarang saya menambahkan fitur untuk mengirim, mengubah, dan menghapus data menggunakan method POST, PATCH, dan DELETE.

### 1. Mengirim Komentar (POST)

Pertama, saya mengubah proses pengiriman komentar yang sebelumnya menggunakan localStorage menjadi POST ke JSONPlaceholder.

Data yang dikirim berupa nama dan isi komentar. Setelah server memberikan respons, komentar akan ditampilkan pada website beserta ID yang diberikan oleh server.

Fungsi yang digunakan adalah `kirimKomentarKeServer()`.

### 2. Menampilkan Komentar

Komentar ditampilkan menggunakan fungsi `tampilkanKomentar()`. Pada fungsi ini, saya membuat elemen `li` untuk menampilkan nama dan isi komentar.

Saya juga menggunakan `dataset.id` untuk menyimpan ID komentar. ID ini nantinya digunakan ketika ingin mengedit atau menghapus komentar.

Setiap komentar memiliki tombol Edit dan Hapus.

### 3. Memperbarui Like (PATCH)

Pada bagian portofolio, saya menambahkan penggunaan PATCH pada tombol Like.

Ketika tombol Like diklik, jumlah Like akan bertambah dan program mengirim pembaruan ke API menggunakan fungsi `perbaruiLikeKeServer()`.

Artikel yang berasal dari API juga diberikan tombol Like dan Hapus agar tampilannya sama seperti portofolio yang dibuat sebelumnya.

### 4. Mengedit Komentar (PATCH)

Saya menambahkan tombol Edit pada setiap komentar sesuai tugas praktikum mandiri.

Saat tombol Edit diklik, nama dan isi komentar akan dimasukkan kembali ke form. Setelah komentar diubah, pengguna bisa menekan tombol Simpan Perubahan.

Program kemudian menggunakan fungsi `perbaruiKomentarKeServer()` untuk mengirim perubahan dengan PATCH berdasarkan ID komentar yang dipilih.

### 5. Menghapus Komentar (DELETE)

Untuk menghapus komentar, saya menggunakan method DELETE.

Ketika tombol Hapus diklik, program akan mengambil ID komentar dari `dataset.id`, kemudian mengirim permintaan DELETE ke JSONPlaceholder.

Jika respons berhasil, komentar akan dihapus dari tampilan website.

### 6. Menangani Error dan Loading

Saya menggunakan fungsi `pesanDariStatus()` untuk menampilkan pesan kesalahan berdasarkan status code yang diterima dari server.

Status 400 menunjukkan data tidak valid, 404 menunjukkan data tidak ditemukan, dan 500 menunjukkan masalah pada server.

Selain itu, saya menambahkan `disabled = true` pada tombol ketika proses pengiriman atau penghapusan berlangsung. Setelah proses selesai, tombol akan diaktifkan kembali supaya tidak terjadi klik berulang.

API yang digunakan adalah JSONPlaceholder, sehingga perubahan data hanya berupa simulasi dan tidak tersimpan secara permanen pada server.
