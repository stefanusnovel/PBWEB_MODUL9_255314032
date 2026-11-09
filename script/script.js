//Mencari tombol dengan id "btn-tema" dan menyimpannya dalam variabel tombolTema
const tombolTema = document.getElementById("btn-tema");

function muatPreferensiTema(){
    const tema = localStorage.getItem("tema");
    if(tema === "dark"){
        document.body.classList.add("dark-mode");
    }
}

muatPreferensiTema();

//Mendefinisikan fungsi gantiTema yang akan menambahkan atau 
//menghapus kelas "dark-mode" pada elemen body
function gantiTema() {
    document.body.classList.toggle("dark-mode");
    const temaSekarang = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("tema", temaSekarang);
}

//Menambahkan event listener pada tombolTema yang akan memanggil fungsi gantiTema saat tombol diklik
if (tombolTema) {
    tombolTema.addEventListener("click", gantiTema);
}

//Mendefinisikan array dataPortofolio yang berisi objek-objek portofolio
const dataPortofolio = [
    {
        judul: "Membuat Website Portofolio",
        deskripsi: "Membuat website portofolio menggunakan HTML, CSS, dan JavaScript."
    },
    {
        judul: "Praktikum DOM JS",
        deskripsi: "Membuat website portofolio menggunakan DOM JS."
    }
];

//Mencari elemen dengan class "daftar-portofolio" dan menyimpannya dalam variabel daftarPortofolio
const daftarPortofolio = document.querySelector(".daftar-portofolio");
//Mencari tombol dengan id "btn-tambah" dan menyimpannya dalam variabel tombolTambah
const tombolTambah = document.getElementById("btn-tambah");

//Menyimpan jumlah like
function simpanLike(judulArtikel, jumlah){
    const semuaLike = JSON.parse(localStorage.getItem("semuaLike")) || {};
    semuaLike[judulArtikel] = jumlah;
    localStorage.setItem("semuaLike", JSON.stringify(semuaLike));
}

// PERBAIKAN: Membuat fungsi ambilLike yang sebelumnya hilang
function ambilLike(judulArtikel) {
    const semuaLike = JSON.parse(localStorage.getItem("semuaLike")) || {};
    return semuaLike[judulArtikel] || 0;
}

//Memperbarui like menggunakan PATCH
async function perbaruiLikeKeServer(postId, jumlahLike) {
    let status;
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ likes: jumlahLike }),
        });

        status = response.status;
        if (!response.ok) throw new Error("Status: " + response.status);
        console.log("Like berhasil diperbarui di server");
    } catch (error) {
        alert(pesanDariStatus(status));
        console.error("Gagal memperbarui like:", error);
    }
}

//Mendefinisikan fungsi renderItem yang akan membuat elemen artikel untuk setiap item portofolio
function renderItem(data) {
    const artikel = document.createElement("article");
    const judul = document.createElement("h3"); 
    judul.textContent = data.judul;
    const deskripsi = document.createElement("p");
    deskripsi.textContent = data.deskripsi;
    
    //Persiapan Tombol Like 
    const tombolLike = document.createElement("button");
    const jumlahLike = ambilLike(data.judul);
    tombolLike.textContent = `Like (${jumlahLike})`;
    tombolLike.dataset.like = jumlahLike;
    tombolLike.dataset.postId = dataPortofolio.indexOf(data) + 1;

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    
    artikel.appendChild(judul);
    artikel.appendChild(deskripsi);
    artikel.appendChild(tombolLike);
    artikel.appendChild(tombolHapus);
    
    daftarPortofolio.appendChild(artikel);
}

//Jika elemen daftarPortofolio ada, maka setiap item dalam dataPortofolio akan dirender menggunakan fungsi renderItem 
if (daftarPortofolio) {
    dataPortofolio.forEach(renderItem);

    //Efek hover pada artikel portofolio
    daftarPortofolio.addEventListener("mouseover", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.add("artikel-hover");
    });

    daftarPortofolio.addEventListener("mouseout", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.remove("artikel-hover");
    });

    //Efek klik pada tombol Like & Hapus
    daftarPortofolio.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            //Tombol hapus
            if (e.target.textContent === "Hapus") {
                e.target.closest("article").remove();
            } 
            //Tombol Like
            else if (e.target.textContent.startsWith("Like")) {
                let jumlah = parseInt(e.target.dataset.like || 0);
                jumlah++;
                e.target.dataset.like = jumlah;
                e.target.textContent = `Like (${jumlah})`;

                const judulArtikel = e.target.closest("article").querySelector("h3").textContent;
                simpanLike(judulArtikel, jumlah);
                perbaruiLikeKeServer(e.target.dataset.postId, jumlah);
            }
        }
    });
}

//Jika tombolTambah ada, maka akan ditambahkan event listener yang akan menambahkan item baru ke daftar portofolio saat tombol diklik.  
if (tombolTambah) {
    tombolTambah.addEventListener("click", () => {
        const inputJudul = document.getElementById("input-judul");
        const inputDeskripsi = document.getElementById("input-deskripsi");
        
        //Jika input judul atau deskripsi kosong, maka akan menampilkan alert dan menghentikan eksekusi fungsi.
        if (inputJudul.value.trim() === "" || inputDeskripsi.value.trim() === "") {
            alert("Judul dan deskripsi harus diisi!");
            return;
        }
        const itemBaru = {
            judul: inputJudul.value,
            deskripsi: inputDeskripsi.value
        };
        //Menambahkan item baru ke array dataPortofolio
        dataPortofolio.push(itemBaru);
        renderItem(itemBaru);
        inputJudul.value = "";
        inputDeskripsi.value = "";
    });
}
//Form komentar ,validasi, error di halaman, daan tombol hapus masing-masing
const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");
const errorMessage = document.querySelector("#error-message");
const inputPesanKomen = document.querySelector("#input-pesan");
const tombolKirimKomentar = formKomentar.querySelector('button[type="submit"]');
let komentarDiedit = null;

//Pesan berdasarkan status code
function pesanDariStatus(status) {
    if (status === 404) return "Data tidak ditemukan di server.";
    if (status === 400) return "Data yang dikirim tidak valid.";
    if (status >= 500) return "Server sedang bermasalah, coba lagi nanti.";
    return "Terjadi kesalahan tidak terduga.";
}

//Mengirim komentar dengan POST 
async function kirimKomentarKeServer(nama, pesan) {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nama, body: pesan, postId: 1 }),
    });

    if (!response.ok) {
        const error = new Error("Gagal mengirim komentar, status: " + response.status);
        error.status = response.status;
        throw error;
    }
    return await response.json();
}

//Mengedit komentar dengan PATCH 
async function perbaruiKomentarKeServer(id, nama, pesan) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nama, body: pesan }),
    });

    if (!response.ok) {
        const error = new Error("Status: " + response.status);
        error.status = response.status;
        throw error;
    }
    return await response.json();
}

//Menampilkan respons POST 
function tampilkanKomentar(hasil) {
    const itemKomentar = document.createElement("li");
    itemKomentar.textContent = `${hasil.name}: ${hasil.body}`;
    itemKomentar.dataset.id = hasil.id; 
    itemKomentar.dataset.nama = hasil.name;
    itemKomentar.dataset.pesan = hasil.body;

    const tombolEdit = document.createElement("button");
    tombolEdit.textContent = "Edit";
    tombolEdit.classList.add("btn-edit");

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.classList.add("btn-hapus");

    itemKomentar.appendChild(tombolEdit);
    itemKomentar.appendChild(tombolHapus);
    daftarKomentar.appendChild(itemKomentar);
}

if (formKomentar) {
    formKomentar.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nama = document.querySelector("#input-nama").value.trim();
        const pesan = document.querySelector("#input-pesan").value.trim();

        //Validasi kosong
        if (nama === "" || pesan === "") {
            errorMessage.textContent = "Nama dan komentar wajib diisi!";
            errorMessage.classList.add("show");
            return;
        }

        //Validasi minimal 5 Karakter 
        if (pesan.length < 5) {
            errorMessage.textContent = "Komentar terlalu pendek! Minimal 5 karakter.";
            errorMessage.classList.add("show");
            return;
        }

        //Sembunyikan error jika berhasil
        errorMessage.classList.remove("show");
        tombolKirimKomentar.disabled = true; 

        try {
            if (komentarDiedit) {
                const hasil = await perbaruiKomentarKeServer(komentarDiedit.dataset.id, nama, pesan);
                komentarDiedit.firstChild.textContent = `${hasil.name}: ${hasil.body}`;
                komentarDiedit.dataset.nama = hasil.name;
                komentarDiedit.dataset.pesan = hasil.body;
                komentarDiedit = null;
                tombolKirimKomentar.textContent = "Kirim";
            } else {
                const hasil = await kirimKomentarKeServer(nama, pesan);
                console.log("Komentar tersimpan di server, id:", hasil.id);
                tampilkanKomentar(hasil);
            }
            formKomentar.reset();
            sessionStorage.removeItem("draftKomentar");
        } catch (error) {
            alert(pesanDariStatus(error.status));
            console.error(error);
        } finally {
            tombolKirimKomentar.disabled = false;
        }
    });
}

//Event Delegation untuk menghapus komentar satuan
if (daftarKomentar) {
    daftarKomentar.addEventListener("click", async (e) => {
        if (e.target.tagName === "BUTTON") {
            const li = e.target.closest("li");
            const id = li.dataset.id;

            if (e.target.classList.contains("btn-edit")) {
                komentarDiedit = li;
                document.querySelector("#input-nama").value = li.dataset.nama;
                inputPesanKomen.value = li.dataset.pesan;
                tombolKirimKomentar.textContent = "Simpan Perubahan";
            }

            if (e.target.classList.contains("btn-hapus")) {
                let status;
                e.target.disabled = true;
                try {
                    const response = await fetch(
                        `https://jsonplaceholder.typicode.com/comments/${id}`, {
                        method: "DELETE",
                    });
                    status = response.status;
                    if (!response.ok) throw new Error("Status: " + response.status);
                    li.remove();
                    if (komentarDiedit === li) {
                        komentarDiedit = null;
                        tombolKirimKomentar.textContent = "Kirim";
                        formKomentar.reset();
                    }
                } catch (error) {
                    alert(pesanDariStatus(status));
                    console.error(error);
                } finally {
                    e.target.disabled = false;
                }
            }
        }
    });
}

//Tombol hapus semua komentar
const btnHapusSemua = document.getElementById("btn-hapus-semua");
if (btnHapusSemua) {
    btnHapusSemua.addEventListener("click", () => {
        localStorage.removeItem("komentar");
        daftarKomentar.innerHTML = "";
        komentarDiedit = null;
        tombolKirimKomentar.textContent = "Kirim";
    });
}

//scroll untuk tombol "Kembali ke Atas"
const btnKembaliAtas = document.getElementById("btn-kembali-atas");
if (btnKembaliAtas) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnKembaliAtas.style.display = "block";
        } else {
            btnKembaliAtas.style.display = "none";
        }
    });

    btnKembaliAtas.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

//Keyboard shortcut dark mode
document.addEventListener("keydown", (e) => {
    //Abaikan jika sedang mengetik di kolom input atau textarea
    const sedangMengetik = ["INPUT", "TEXTAREA"].includes(e.target.tagName);
    if (!sedangMengetik && e.key.toLowerCase() === "d") {
        gantiTema();
    }
});

const btnReset = document.querySelector("#btn-reset");
if(btnReset){
    btnReset.addEventListener("click", () => {
        const konfirmasi = confirm("Hapus semua data");
        if(konfirmasi){
            localStorage.clear();
            location.reload();
        }
    });
}

if(inputPesanKomen){
    inputPesanKomen.addEventListener("input", function(){
        sessionStorage.setItem("draftKomentar", this.value);
    });

    const draft = sessionStorage.getItem("draftKomentar");
    if(draft){
        inputPesanKomen.value = draft;
    }
}

const btnTampilAside = document.getElementById("btn-tampil-aside");
const sidebar = document.querySelector("aside");

if(btnTampilAside && sidebar){
    const isAsideHidden = localStorage.getItem("asideStatus") === "true";
    if(isAsideHidden){
        sidebar.style.display = "none";
    }

    btnTampilAside.addEventListener("click", () => {
        const isHidden = sidebar.style.display === "none";
        if(isHidden){
            sidebar.style.display = "block";
            localStorage.setItem("asideStatus", "false");
        }else{
            sidebar.style.display = "none";
            localStorage.setItem("asideStatus", "true");
        }
    });
}

//Memuat artikel dari array kke  API
async function muatArtikelDariAPI() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

        if (!response.ok) {
            throw new Error("Status: " + response.status);
        }

        const daftarPost = await response.json();

        daftarPost.forEach((post) => {
            const article = document.createElement("article");

            const judul = document.createElement("h3");
            judul.textContent = post.title;

            const isi = document.createElement("p");
            isi.textContent = post.body;

            //Tombol Like
            const tombolLike = document.createElement("button");
            const jumlahLike = ambilLike(post.title);
            tombolLike.textContent = `Like (${jumlahLike})`;
            tombolLike.dataset.like = jumlahLike;
            tombolLike.dataset.postId = post.id;

            //Tombol Hapus
            const tombolHapus = document.createElement("button");
            tombolHapus.textContent = "Hapus";

            article.appendChild(judul);
            article.appendChild(isi);
            article.appendChild(tombolLike);
            article.appendChild(tombolHapus);

            daftarPortofolio.appendChild(article);
        });

    } catch (error) {
        const pesan = document.createElement("p");
        pesan.textContent = "Gagal memuat artikel, silakan coba lagi nanti.";
        daftarPortofolio.appendChild(pesan);
        console.error("Gagal mengambil artikel:", error);
    }
}

muatArtikelDariAPI();


//Mengambil komentar awal dari API
async function muatKomentarAPI() {
    const loading = document.querySelector("#loading");
    loading.style.display = "block";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1/comments");

        if (!response.ok) {
            throw new Error("Status: " + response.status);
        }

        const daftar = await response.json();

        daftar.forEach((komentar) => {
            tampilkanKomentar(komentar);
        });

    } catch (error) {
        daftarKomentar.textContent = "Gagal memuat komentar, silakan coba lagi nanti.";
        console.error("Gagal memuat komentar:", error);
    } finally {
        loading.style.display = "none";
    }
}

muatKomentarAPI();

