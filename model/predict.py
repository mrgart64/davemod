import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# 1. Load Metadata & Setup Tokenizer
print("Loading model and metadata...")
with open("moderation_meta.json", "r", encoding="utf-8") as f:
    meta = json.load(f)

categories = meta["categories"]
inv_label_map = {idx: cat for idx, cat in enumerate(categories)}
max_len = meta["max_len"]
vocab_size = meta["vocab_size"]
oov_token = meta["oov_token"]

# Rekonstruksi Tokenizer dari word_index yang disimpan saat training
tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_token, lower=True)
tokenizer.word_index = meta["word_index"]

# 2. Load TFLite Interpreter
interpreter = tf.lite.Interpreter(model_path="text_moderator.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# def moderate_text(text):
#     # Preprocessing teks input
#     seq = tokenizer.texts_to_sequences([text])
#     padded_seq = pad_sequences(seq, maxlen=max_len, padding='post', truncating='post')
    
#     input_data = np.array(padded_seq, dtype=np.float32)
#     interpreter.set_tensor(input_details[0]['index'], input_data)
#     interpreter.invoke()
    
#     probabilities = interpreter.get_tensor(output_details[0]['index'])[0]
#     predicted_class_id = np.argmax(probabilities)
#     confidence = probabilities[predicted_class_id]
#     predicted_label = inv_label_map[predicted_class_id]
    
#     print(f"Pesan    : '{text}'")
#     print(f"Prediksi : [{predicted_label.upper()}] (Confidence: {confidence*100:.2f}%)")
#     print("-" * 50)

def moderate_text(text):
    # Preprocessing teks input
    seq = tokenizer.texts_to_sequences([text])
    padded_seq = pad_sequences(seq, maxlen=max_len, padding='post', truncating='post')
    
    input_data = np.array(padded_seq, dtype=np.float32)
    
    # PERBAIKAN: Duplikasi baris dari shape (1, max_len) menjadi (8, max_len)
    if input_data.shape[0] != 8 and False:
        input_data = np.repeat(input_data, 8, axis=0)
    
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    
    # Ambil hasil prediksi untuk data pertama (index [0])
    probabilities = interpreter.get_tensor(output_details[0]['index'])[0]
    predicted_class_id = np.argmax(probabilities)
    confidence = probabilities[predicted_class_id]
    predicted_label = inv_label_map[predicted_class_id]
    
    print(f"Pesan    : '{text}'")
    print(f"Prediksi : [{predicted_label.upper()}] (Confidence: {confidence*100:.2f}%)")
    print("-" * 50)

# ==========================================
# PENGUJIAN PREDIKSI
# ==========================================
if __name__ == "__main__":
    print("\n=== PENGUJIAN MODEL MODERASI TEKS ===\n")
    
    test_messages = [
  "Halo, kami dari PT Maju Jaya mengundang Anda untuk mengikuti proses wawancara kerja besok pagi. Mohon siapkan CV Anda. Seluruh proses ini tidak dipungut biaya apa pun.",
  "Kerja frelance modal hp doang kak, dpt komisi 50rb per tgas. Cuma lke n subscribe yutub aja.",
  '''
  [PANGGILAN INTERVIEW & SELEKSI KARYAWAN PT ANGKASA JAYA TBK]
Berdasarkan evaluasi data resume yang Anda kirimkan melalui Jobstreet/Indeed, kualifikasi Anda memenuhi kriteria perusahaan kami.
Anda dijadwalkan hadir pada proses Wawancara & Seleksi pada:
🗓️ Hari/Tanggal: Senin, 2 November 2026
⏰ Waktu: 09.00 WIB - Selesai
📍 Lokasi: Gedung Antariksa Lt. 5, Jl. Sudirman No. 12, Jakarta Selatan.
KODE REGISTRASI: PT.AJ/049/2026
PENTING (WAJIB DIBACA):
Proses seleksi ini bekerja sama dengan agen travel resmi "Duta Tour & Travel" untuk akomodasi (tiket pesawat/hotel) bagi peserta dari luar kota. Biaya travel ditanggung sementara oleh peserta dan akan di-REIMBURSE (DIGANTI 100%) oleh perusahaan setelah wawancara selesai.
Silakan hubungi admin travel untuk reservasi tiket Anda:
WhatsApp Travel: 0812-3456-XXXX (Bpk. Rian)
Konfirmasi kehadiran Anda segera dengan membalas pesan ini: NAMA_HADIR/TIDAK HADIR.
  ''',
  '''
  Dari: recruitment@gotocompany.com
Kepada: ryan.hidayat@email.com
Subjek: Surat Penawaran Kerja (Job Offer) – UI/UX Designer – Ryan Hidayat
Kepada Yth.
Ryan Hidayat
Jakarta Selatan
Halo Ryan,
Terima kasih atas waktu dan diskusi yang sangat produktif selama rangkaian proses seleksi di perusahaan kami, mulai dari tahap seleksi portfolio, technical assignment, hingga wawancara akhir bersama tim Product Design.
Berdasarkan hasil evaluasi menyeluruh, dengan sukacita kami menginformasikan bahwa tim manajemen PT GoTo Gojek Tokopedia Tbk memutuskan untuk memberikan penawaran kerja kepada Anda untuk posisi UI/UX Designer (Level: Associate). Kami sangat terkesan dengan solusi desain yang Anda paparkan saat sesi studi kasus minggu lalu.
Sebagai ringkasan, berikut adalah detail poin penawaran yang kami ajukan:
• Status Kepegawaian: Karyawan Kontrak (Full-time Contract) untuk jangka waktu 12 bulan, dengan opsi pengangkatan menjadi karyawan tetap berdasarkan performa tahunan.
• Tanggal Mulai Bekerja: 1 Desember 2026.
• Skema Kerja: Hybrid (Minimal 3 hari kerja dari kantor/WFO di GoTo HQ Jakarta, dan 2 hari kerja dari rumah/WFH).
• Fasilitas Perusahaan: Penyediaan perangkat kerja MacBook Pro, asuransi kesehatan swasta Mandiri Inhealth, serta saldo tunjangan mobilitas bulanan via aplikasi Gojek.
Rincian mengenai nilai gaji pokok bulanan sebesar Rp12.500.000, Tunjangan Hari Raya (THR), serta benefit proteksi BPJS Ketenagakerjaan dan Kesehatan telah kami lampirkan secara hukum dalam dokumen Official_Offer_Letter_GoTo_Ryan.pdf yang ada di dalam lampiran email ini.
Mohon untuk meninjau seluruh dokumen yang terlampir. Jika Anda menerima penawaran ini, silakan berikan tanda tangan elektronik Anda pada dokumen tersebut dan kirimkan kembali sebagai balasan email ini paling lambat hari Jumat, 6 November 2026 pukul 17.00 WIB.
Jika ada poin dalam surat penawaran ini yang ingin Anda tanyakan atau negosiasikan lebih lanjut, silakan hubungi saya melalui email ini atau kontak resmi perusahaan di nomor (021) 2910-1072.
Kami sangat berharap Anda dapat bergabung dan tumbuh bersama untuk membawa dampak positif bagi jutaan pengguna layanan kami di Indonesia.
Selamat bergabung di keluarga besar GoTo!
Hormat kami,
Dian Sastrowardoyo
Lead Talent Acquisition
PT GoTo Gojek Tokopedia Tbk
Gedung Pasaraya Blok M, Lantai 6, Jl. Iskandarsyah II No. 2, Kebayoran Baru, Jakarta Selatan 12160
Situs Resmi: https://www.gotocompany.com/
  ''',
  '''
  Dari: hrd.ptgotogojektokopediatbk@gmail.com
Kepada: ryan.hidayat@email.com
Subjek: PANGGILAN INTERVIEW & SELEKSI KARYAWAN PT GO COMP COMPANY TBK
Kepada Yth.
Ryan Hidayat
Di Tempat
Selamat siang,
Berdasarkan hasil evaluasi data resume dan portofolio yang Anda kirimkan melalui platform Lowongan Kerja Nasional, dengan sukacita kami menginformasikan bahwa dokumen Anda memenuhi kriteria kualifikasi dari komite seleksi perusahaan kami untuk posisi UI/UX Designer.
Anda dinyatakan lulus seleksi administrasi awal dan diwajibkan untuk hadir mengikuti tahapan Wawancara Tatap Muka serta Pengarahan Kerja Akhir yang akan dilaksanakan pada:
• Hari / Tanggal: Senin, 2 November 2026.
• Waktu: Jam 09.00 WIB s/d Selesai.
• Lokasi Kantor: Gedung Pasaraya Blok M, Lantai 6, Jl. Iskandarsyah II No. 2, Kebayoran Baru, Jakarta Selatan.
• Fasilitas Peserta: Seluruh biaya akomodasi, tiket pesawat/kereta api, penginapan hotel, serta uang saku harian peserta akan ditanggung 100% oleh perusahaan melalui sistem penggantian (reimbursement) setelah proses wawancara selesai.
Mengingat kuota peserta yang sangat terbatas dan ketat, proses pengadaan transportasi dan reservasi akomodasi perjalanan wajib dilakukan secara kolektif melalui agen biro perjalanan resmi yang telah ditunjuk oleh perusahaan kami, yaitu "Nusantara Tour & Travel".
Peserta diwajibkan untuk segera melakukan pemesanan tiket dan kamar hotel kepada agen penanggung jawab kami sebelum hari Jumat, 30 Oktober 2026 pukul 17.00 WIB melalui kontak di bawah ini:
• WhatsApp Admin Travel: 0821-3456-7890 (Bpk. Aryo Perkasa)
• Format Konfirmasi: GOTO_RYAN HIDAYAT_HADIR
Tolong lampirkan bukti transfer pembayaran tiket Anda kepada admin travel tersebut agar nomor registrasi tes dan berkas pencairan klaim reimburse Anda di bagian keuangan kantor kami bisa segera diterbitkan. Keterlambatan melakukan reservasi tiket akan dianggap sebagai bentuk pengunduran diri dari proses seleksi ini.
Terima kasih atas kerja samanya. Kami tunggu kehadiran Anda di Jakarta.
Hormat kami,
Dian Sastrowardoyo
Head of Recruitment Team
PT GoTo Gojek Tokopedia Tbk
Gedung Pasaraya Blok M, Lantai 6, Jl. Iskandarsyah II No. 2, Kebayoran Baru, Jakarta Selatan 12160
  ''',
  '''
  "Halo, saya Rini dari Departemen HRD Shopee Indonesia. Kami sedang membuka lowongan kerja paruh waktu berbasis ponsel dari rumah.
Tugas: Anda hanya perlu memberikan Like pada video YouTube atau produk toko online yang kami kirimkan.
Gaji: Rp 200.000 - Rp 2.000.000 per hari. Gaji langsung ditransfer ke rekening Anda setelah tugas selesai.
Syarat: Hanya butuh HP, kuota internet, dan umur di atas 18 tahun.
Jika Anda tertarik untuk mengambil komisi pertama Anda, silakan balas pesan ini dengan mengetik "SAYA TERTARIK" untuk kami hubungi melalui Telegram."
  ''',
  
  '''
  PANGGILAN SELEKSI WAWANCARA KERJA PT. PERTAMINA (PERSERO)
Berdasarkan hasil seleksi berkas administrasi, Anda dinyatakan memenuhi syarat untuk mengikuti tahapan wawancara yang akan dilaksanakan pada:
• Hari/Tanggal: Senin, 2 November 2026
• Waktu: 09.00 WIB - Selesai
• Tempat: Gedung Utama Pertamina, Jakarta Pusat
PENTING: Untuk efisiensi biaya, akomodasi, dan transportasi (tiket pesawat & hotel), semua peserta wajib memesan tiket melalui agen travel resmi penunjukan kami: "BUANA TRAVEL" (Contact: 0812-0911-6769).
Seluruh biaya travel yang Anda keluarkan akan diganti secara penuh (reimbursement) oleh perusahaan setelah proses wawancara selesai. Kegagalan menghubungi agen travel di atas akan membatalkan status kelulusan Anda.
''',

'''
Subjek: Undangan Wawancara - Finance Advisor - PT Bank Central Asia Tbk
Yth. Rusdi Supriyanto,
Terima kasih atas ketertarikan Anda untuk bergabung dengan PT Bank Central Asia Tbk. Berdasarkan tinjauan kami terhadap resume Anda yang masuk melalui portal Jobstreet untuk posisi Management Trainee (MT), kami ingin mengundang Anda untuk mengikuti tahap wawancara awal.
Wawancara akan dilaksanakan secara daring (online) pada:
• Hari/Tanggal: Rabu, 4 November 2026
• Waktu: 10.00 - 11.00 WIB
• Platform: Zoom Meeting (Tautan akan dikirimkan setelah konfirmasi)
• Pewawancara: Tim Talent Acquisition BCA
Mohon konfirmasikan ketersediaan Anda dengan membalas email ini paling lambat Selasa, 3 November 2026 pukul 15.00 WIB dengan format: Nama_Hadir atau Nama_Reschedule.
PENTING: PT Bank Central Asia Tbk tidak memungut biaya apa pun dalam seluruh proses rekrutmen. Kami tidak pernah bekerja sama dengan agen perjalanan (travel) mana pun. Seluruh proses seleksi dilakukan secara transparan.
Hormat kami,
Tim Talent Acquisition
PT Bank Central Asia Tbk
www.bca.co.id
''',
'''
Halo Reza Auditore,
Salam kenal. Saya Silviana Lenjau, Talent Scout dari Tokopedia.
Saya melihat profil Anda di LinkedIn dan sangat terkesan dengan pengalaman Anda selama 2 tahun terakhir di bidang Digital Marketing. Saat ini, tim kami sedang berkembang dan mencari seorang Senior Digital Marketing Specialist untuk bergabung di kantor Jakarta.
Melihat latar belakang Anda yang kuat dalam mengelola paid ads dan strategi SEO, saya rasa posisi ini akan sangat menarik untuk pertumbuhan karier Anda.
Jika Anda sedang terbuka untuk peluang baru, bolehkah saya meminta CV terbaru Anda? Kita juga bisa menjadwalkan obrolan santai via telepon selama 15 menit minggu ini untuk membahas posisi ini lebih detail.
Terima kasih atas waktunya, dan saya tunggu kabar baik dari Anda.
Salam hangat,
Silviana Lenjau
Talent Acquisition Specialist | Tokopedia
''',
'''
Subjek: Penawaran Kerja Langsung - PT Digital Asia Utama
Halo Asep,
Kami telah melihat profil Anda di platform pencari kerja dan sangat tertarik dengan kualifikasi Anda. Perusahaan kami sedang membutuhkan posisi Administrasi Data Entry dengan sistem kerja Work From Home (WFH).
• Gaji Pokok: Rp 8.500.000 / bulan
• Fasilitas: Laptop kerja dan subsidi internet bulanan.
Karena posisi ini sangat terbatas, Anda bisa langsung diterima tanpa wawancara tatap muka. Silakan lengkapi formulir pendaftaran dan unggah Foto KTP, Foto Selfie memegang KTP, serta Nomor Rekening Anda melalui tautan berikut: bit.ly/pendaftaran-kerja-cepat
''',
'''
INFO REKRUTMEN PT INDOFOOD
Anda terpilih untuk posisi Staff Admin Gudang (Gaji Rp 5,5 Juta/Bulan, Fasilitas: Mess & BPJS).
Jadwal Interview: Besok Pagi, Jam 09.00 WIB di Kantor Pusat Jakarta.
Catatan: Wajib membawa uang Rp 150.000 untuk biaya seragam & kartu id.
Hubungi HRD Ibu Siska via WA: 0857-6124-0759 untuk konfirmasi kehadiran Anda sekarang. (KUOTA TERBATAS)
''',

'''
LOWONGAN PARUH WAKTU SHOPEE
Kerja dari rumah via HP. Tugas hanya like dan subscribe video. Komisi Rp 50.000 – Rp 2.000.000/hari. Gaji harian langsung cair. Hubungi Admin lewat WA/Telegram sekarang: bit.ly/kerjaparttime-shope
''',

'''
PT GOTO GOJEK TOKOPEDIA
Selamat, Anda lolos seleksi berkas posisi Admin Data. Untuk pembuatan kontrak kerja WFH dan pencairan laptop inventaris, kirimkan Foto KTP, Foto Selfie Pegang KTP, dan Nomor Rekening Anda ke WA ini sekarang. Batas waktu 2 jam.
''',

'''
"Selamat pagi Kak Rizal Wukwuk. Saya Lord Mamang dari Team Talent Acquisition PT Shopee Indonesia.
Menindaklanjuti lamaran Kakak di Glints untuk posisi Live Streamer, kami ingin mengundang Kakak untuk tahap Interview Online via Zoom pada esok hari, Jumat jam 14.00 WIB.
Apakah Kakak bersedia? Jika bersedia, silakan balas pesan ini agar saya kirimkan link Zoom-nya. Terima kasih."
''',

'''
"Selamat pagi Kak Faisal. Saya Risa, HRD dari Kopi Kenangan.
Menindaklanjuti lamaran Kakak di KitaLulus untuk posisi Barista, kami ingin mengundang Kakak mengikuti interview online via Google Meet besok, Jumat pukul 10.00 WIB.
Apakah Kakak bersedia? Sampaikan konfirmasi Kakak dengan membalas pesan ini ya. Terima kasih."
''',
'''
"Selamat siang Rusdi, saya Linda dari HRD PT Kalbe Farma Tbk.\nTerima kasih telah mengikuti interview tahap awal minggu lalu. Untuk melanjutkan ke tahap User Interview, mohon bantuannya untuk mengirimkan portofolio kerja terbaru Anda ke email resmi kami di recruitment@kalbe.co.id paling lambat sore ini. Terima kasih."
''',

'''
PANGGILAN KERJA PT SENTOSA LOGISTIK
Posisi: Admin Gudang. Gaji Rp 4,8 Juta + Mess. Interview Besok Jam 09.00 WIB. Alamat: Jl. Jend. Sudirman No. 12, JKT. NB: Bawa uang Rp 100.000 untuk ID Card & Seragam. Balas "HADIR" untuk kunci slot.
''',

'''
INFO RESMI: Anda lulus seleksi berkas PT KAI (Persero) untuk posisi Staf Administrasi (Gaji 7,5 Juta/Bulan). Penempatan sesuai domisili Anda. Segera ambil Surat Kelulusan lewat WA HRD hari ini: 0857-5561-7739.
''',

'''
LOKER NYAMPILAN TIKTOK
Tugas cuma tonton video 15 detik & kasih like. Komisi Rp 15.000 per video. Sehari bisa dapat Rp 200rb - Rp 1jt langsung cair ke e-wallet (DANA/OVO). Gabung sekarang, klik: bit.ly/misi-tiktok-cuan
''',

'''
KERJA RUMAHAN SICEPAT ESPRESS
Lowongan melipat kotak/mengepak barang dari rumah. Upah Rp 300rb per dus. Bahan diantar jemput ke rumah gratis. Minat? Hubungi WA: 0813-2296-7827. (Catatan: Wajib deposit Rp 50.000 untuk jaminan bahan tidak rusak).
''',

'''
PANGGILAN KERJA PT PERTAMINA
Dibutuhkan Driver Operational. Gaji Rp 5,5 Juta + Uang Makan Rp 50rb/hari. Wawancara besok jam 09.00 WIB. Pemesanan tiket travel transportasi PP wajib lewat agen mitra: Bintang Travel (0812-0143-7639). Biaya di-reimburse kantor.
''',

'''
URGENT: DIBUTUHKAN STAFF KETIK DATA WFH
Tugas menyalin teks ke Microsoft Word. Gaji Rp 3,5 Juta per proyek. Tidak perlu pengalaman, kuota hanya untuk 5 orang pertama hari ini. Daftar gratis, cukup kirim foto KTP Anda ke WA ini sekarang.
''',

'''
Selamat siang Kak Rena. Saya Vita dari Recruitment PT Kalbe Farma Tbk.
Terima kasih telah melamar posisi Admin Production melalui Jobstreet. Kami mengundang Kakak untuk mengikuti tes psikotes online pada besok, Jumat jam 09.00 WIB.
Mohon konfirmasi kehadiran Kakak dengan membalas pesan ini 'HADIR'. Terima kasih.
''',

'''
Selamat pagi Kak Dimas Saputra. Saya Citra Kirana dari Team Talent Acquisition PT Shopee International Indonesia.
Menindaklanjuti lamaran Kak Dimas di platform Glints untuk posisi Live Streamer Specialist, kami ingin mengundang Kakak mengikuti tahap Initial Interview secara online via Zoom pada hari Jumat, 30 Oktober 2026 pukul 14.00 WIB.
Apakah Kak Dimas bersedia hadir? Mohon balas pesan ini untuk konfirmasi agar saya bisa mengirimkan tautan Zoom-nya. Terima kasih.
''',


'''
Selamat siang Mas Aditya Wijaya. Saya Rian Nugraha, Recruitment Specialist dari PT Paragon Technology and Innovation (Wardah).
Terima kasih telah mengirimkan lamaran untuk posisi Operator Produksi melalui website karier kami. Kami mengundang Mas Aditya untuk mengikuti tes psikotes online yang akan dilaksanakan besok pagi, Jumat jam 09.00 WIB.
Petunjuk pengerjaan telah kami kirimkan ke email aditya.wijaya@gmail.com. Mohon konfirmasi kehadiran Anda dengan membalas pesan ini 'HADIR'. Terima kasih.
''',

'''
Halo Mbak Stefani Putri, salam kenal. Saya Amanda Rizky, Talent Scout dari PT Bank Jago Tbk.
Saya melihat profil LinkedIn Anda dan sangat tertarik dengan pengalaman Anda selama 3 tahun terakhir sebagai UI/UX Designer di industri fintech. Saat ini tim produk kami sedang berkembang dan mencari kandidat dengan latar belakang yang kuat seperti Anda.
Jika Anda sedang terbuka untuk peluang baru, bolehkah saya meminta CV atau portofolio terbaru Anda ke email amanda.rizky@jago.com? Terima kasih atas waktunya.
''',

'''
Selamat sore Kak Reza Pahlevi. Saya Budi Santoso, Store Manager Starbucks Indonesia Cabang Menteng, Jakarta.
Kami telah meninjau CV yang Kakak kirimkan melalui KitaLulus untuk posisi Barista (Part-Time). Kami mengundang Kak Reza untuk hadir dalam sesi Walk-in Interview langsung di gerai Starbucks Menteng pada hari Sabtu, 31 Oktober 2026 pukul 10.00 WIB.
Cukup membawa CV cetak dan berpakaian rapi kemeja hitam. Mohon konfirmasinya jika Kakak bersedia hadir. Terima kasih.
''',

'''
INFO LOKER PART TIME SHOPEE
Halo Kak Linda Permata, saya Putri dari HRD Shopee Indonesia. Akun Anda terpilih untuk menyelesaikan tugas harian memberikan like dan rating toko online kami. Komisi Rp 450.000 per hari langsung cair ke rekening. Kerja santai hanya lewat HP. Silakan ambil tugas pertama Anda melalui link Telegram berikut: bit.ly/shopee-misi-cuan
''',

'''
PANGGILAN TES PT PERTAMINA (PERSERO)
Selamat kepada sdr. Rian Hidayat, Anda lulus seleksi berkas posisi Staff Administrasi. Tes wawancara kerja akan diadakan besok Jumat di Kantor Pusat Jakarta. Anda diwajibkan memesan tiket pesawat dan hotel melalui agen mitra kami: Antariksa Travel (0812-3456-7764). Seluruh biaya travel akan diganti (reimburse) oleh perusahaan saat Anda tiba di lokasi tes.
''',

'''
UNDANGAN INTERVIEW PT ASTRA GROUP
Ditujukan kepada Mas Doni Setiawan, jadwal interview posisi Operator Produksi dijadwalkan besok pagi jam 09.00 WIB di Kantor Perwakilan Bekasi. Penempatan kerja akan disesuaikan dengan domisili Anda.
Catatan: Mohon menyiapkan uang Rp 150.000 untuk biaya pembuatan ID Card dan seragam kerja. Hubungi Ibu Dewi via WA untuk konfirmasi kehadiran Anda.
''',

'''
LOWONGAN KERJA SICEPAT EXPRESS
Selamat siang Mbak Anita Sari, lamaran Anda sebagai Admin Ketik Data (Sistem Kerja dari Rumah/WFH) telah disetujui dengan gaji Rp 4.500.000/bulan. Untuk pembuatan akun sistem kerja dan pengiriman laptop inventaris kantor, mohon kirimkan foto KTP, foto selfie memegang KTP, beserta nomor rekening Anda ke WhatsApp ini sekarang juga.
''',

'''
PANGGILAN INTERVIEW PT INDOFOOD TBK
Selamat siang Sdr. Fajar Utama, lamaran Anda sebagai Staff Gudang telah kami seleksi. Diundang untuk hadir interview langsung besok pagi, Jumat 30 Oktober 2026 jam 09.00 WIB.
• Alamat: Gedung Pusat Niaga, Ruko Blok C No. 12, Jl. Sudirman, Jakarta.
• HRD: Ibu Siska, S.Psi.
• NB: Harap menyiapkan uang Rp 100.000 untuk biaya cetak ID Card dan jaminan Seragam Kerja. Balas "HADIR" untuk konfirmasi slot interview.
''',

'''
UNDANGAN SELEKSI TAHAP AKHIR PT PERTAMINA
Kepada Yth. Rian Hidayat, Anda diundang menghadiri interview tatap muka posisi Administrasi pada hari Senin di Kantor Pusat Pertamina Jakarta.
Karena kuota terbatas, Anda wajib melakukan reservasi tiket pesawat/kereta dan hotel melalui mitra resmi kami: Abadi Travel (WA: 0813-2124-3762) paling lambat sore ini. Biaya travel akan diganti penuh (reimbursement) oleh perusahaan setelah interview selesai.
''',

'''
JADWAL INTERVIEW KERJA PT ASTRA GROUP
Halo Mbak Mega Lestari, jadwal wawancara Anda untuk posisi Operator Produksi dijadwalkan besok jam 08.30 WIB. Penempatan langsung sesuai domisili.
• Lokasi: Kantor Seleksi Pusat, Jl. Ahmad Yani No. 45 (Samping Swalayan), Bekasi.
• Catatan: Langsung penempatan kerja tanpa tes bagi yang membawa dokumen lengkap dan biaya registrasi kelulusan sebesar Rp 150.000. Hubungi Pak Budi (HRD) untuk kunci posisi.
''',

'''
INTERVIEW ONLINE PT KAI (PERSERO)
Selamat Mas Doni Setiawan, Anda dinyatakan lolos seleksi berkas posisi Customer Service. Untuk tahap interview lanjutan, Anda tidak perlu datang ke kantor. Perekrut kami akan melakukan interview singkat melalui chat WA ini. Sebagai syarat pembukaan berkas wawancara, mohon kirimkan foto KTP dan foto selfie memegang KTP Anda sekarang juga.
''',

'''
URGENT HIRING: LOWONGAN KERJA LUAR NEGERI (POIPET/SIHANOUKVILLE)
Dibutuhkan segera 30 orang untuk posisi Customer Service (CS) / Admin Ketik Data di Perusahaan Entertainment Luar Negeri.
Fasilitas Mewah:
• Gaji Pokok USD 1.200 - USD 1.500 (Sekitar Rp18 Juta - Rp23 Juta/bulan)
• Bonus target, komisi bulanan, dan THR
• Mess/Apartemen gratis (fasilitas gym & kolam renang)
• Makan 3x sehari ditanggung perusahaan
• GRATIS TIKET PESAWAT, PASPOR, & VISA (Semua diurus tim agen)
Persyaratan Ringan:
• Pria/Wanita, usia 18 - 35 tahun
• Pendidikan minimal SMP/SMA sederajat
• Bisa mengetik di komputer dan mengoperasikan HP android
• Tidak perlu bisa bahasa asing (ada tim translator)
• Siap berangkat dalam minggu ini
LANGSUNG INTERVIEW VIA TELEGRAM & BERANGKAT.
Hubungi Agen Resmi (Bpk. Rusdi): t.me/rekrutmen_overseas_official
''',

'''
LOWONGAN KERJA RESTORAN & KASINO DI THAILAND
Dibuka pendaftaran untuk posisi Staff Digital Marketing & Operator Live Chat.
• Gaji Bersih: Rp15.000.000 / bulan (Diluar bonus)
• Fasilitas: Tiket PP gratis, akomodasi ditanggung penuh.
• Rute Keberangkatan: Jakarta - Bangkok (Menggunakan Visa Liburan/Turis agar proses cepat bebas birokrasi).
Siap kerja kontrak minimal 1 tahun. Kuota sisa 3 slot lagi untuk penerbangan minggu depan. Kirim CV Anda ke WhatsApp: 0812-7759-2260.
''',

'''
JOB THAILAND: KASIR & STAFF PACKING RESTORAN
Dibutuhkan segera 10 orang pekerja untuk penempatan di Bangkok, Thailand. Gaji pokok Rp12 Juta/bulan bersih, makan 3x dan tempat tinggal disediakan gratis.
• Syarat: Usia 18–33 tahun, tidak perlu ijazah tinggi atau bisa bahasa Inggris.
• Fasilitas: Tiket keberangkatan Jakarta-Bangkok ditanggung perusahaan (berangkat menggunakan visa turis agar cepat). Hubungi Agen Resmi Pak Ferry melalui WA: 0853-1167-6629.
''',

'''
PANGGILAN INTERVIEW EKSKLUSIF - PT ASIA PACIFIC OUTSOURCING
Ditujukan kepada Sdr. Hendra Wijaya, Anda diundang mengikuti interview kerja tatap muka untuk posisi Admin Data Entry Maskapai di Kuala Lumpur, Malaysia.
• Waktu: Besok, Jam 10.00 WIB.
• Tempat: Hotel Grand Permata, Ruang Meeting Flamboyan, Jakarta Barat.
• NB: Harap membawa PASPOR ASLI Anda (jika ada) saat wawancara untuk langsung diproses pemesanan tiket penerbangan oleh tim HRD kami.
''',

'''
PENGUMUMAN SELEKSI PT EMIRATES DIGITAL (DUBAI CORP)
Selamat Mbak Siska Amelia, berdasarkan Interview Video Call kemarin, Anda dinyatakan LULUS sebagai Customer Service di Dubai dengan gaji USD 1.300 (Rp20 Juta/bulan).
Dikarenakan kendala visa kerja langsung ke Dubai, perusahaan mengambil rute transit cepat: Jakarta - Bangkok (Thailand) menggunakan Visa Turis. Sesampainya di Bangkok, Anda akan dijemput oleh perwakilan travel resmi perusahaan untuk pengurusan visa Dubai. Harap kirimkan foto tiket konfirmasi Anda ke Telegram: t.me/hrd_dubai_recruitment.
''',

'''
PENGUMUMAN SELEKSI PT BANK CENTRAL ASIA TBK
Yth. Pelamar Magang Bakti BCA, silakan cek status kelulusan berkas administrasi Anda dan jadwal verifikasi dokumen dengan masuk ke portal HRD di: https://bca-recrutment.com
''',

'''
Selamat pagi Mas Fadel Muhammad. Saya Amanda, tim Talent Acquisition dari PT Tokopedia.
Menindaklanjuti lamaran Anda di Glints untuk posisi Junior Data Analyst, kami ingin mengundang Anda untuk mengikuti tahapan Initial Interview secara daring. Wawancara akan dilakukan melalui Google Meet pada hari Senin, 2 November 2026 pukul 10.00 WIB.
Mohon konfirmasikan ketersediaan Anda dengan membalas pesan ini. Tautan Google Meet akan kami kirimkan setelah Anda memberikan konfirmasi. Terima kasih.
''',

'''
[PEMBERITAHUAN RESMI PEMENANG GIVEAWAY WINDAH BASUDARA 2026] 🥳🎉
Selamat untuk pemilik akun ini! Anda terpilih menjadi salah satu dari 5 pemenang beruntung yang berhak mendapatkan hadiah spesial dari Bang Brando (Windah Basudara):
🎁 1 UNIT SMARTPHONE ASUS ROG PHONE 8 PRO (512 GB)
Hadiah wajib diambil hari ini dan tidak dapat diwakilkan. Silakan langsung melakukan validasi data pemenang melalui Kontak WhatsApp Layanan Pengiriman Gudang Hadiah kami:
• Nama Admin: Sdr. Budi Setiawan (Divisi Humas & Distribusi Hadiah)
• Nomor WhatsApp Resmi: 0812-3456-7890
• Tautan Konfirmasi Instan: bit.ly
⚠️ SYARAT & KETENTUAN PENGAMBILAN HADIAH:
1. Kirimkan tangkapan layar (screenshot) pesan ini ke nomor WhatsApp 0812-3456-7890 di atas.
2. Lampirkan foto Kartu Pelajar atau KTP Anda untuk verifikasi identitas pengiriman barang.
3. Pemenang wajib menyelesaikan biaya jaminan asuransi pengiriman sebesar Rp 175.000,- ke nomor rekening yang nanti diberikan oleh Admin Budi Setiawan. (Uang jaminan ini akan diserahkan kembali di dalam paket bersama unit HP).
Catatan: Jika dalam waktu 1 jam tidak ada respons atau kuota jaminan asuransi belum diselesaikan, maka status pemenang dianggap gugur dan hadiah dialihkan ke penonton live streaming lainnya.
''',

'''
Baru nemu situs 𝗗𝗘𝗪𝗔𝗔𝗦𝗘𝗣𝟴𝟴 yang beneran bayar lunas tanpa ribet. WD ratusan juta langsung masuk rekening semenit. Cek bio!
''',

'''
Ga nyangka bisa hoki maen di asep88
''',

'''
Kak, makasih ya buat tips dietnya di video kemarin bermanfaat banget! Btw, aku udah taruh video kelanjutan tutor yang kakak maksud di profil aku, silakan dicek m.e.l.i.a.t./a-s-e-p-8-8 biar gak hilang 🙏
''',

'''
Bener-bener gak nyangka tutorial dari video kakak kemarin bisa langsung dipraktekin dan langsung membuahkan hasil masuk ke rekening pribadi siang ini. Buat temen-temen yang mau tau platform alternatif yang lagi legit dan terbukti membayar ini, caranya tinggal buka google terus ketik keyword 🔍 ₳₴Ɇ₱88 🔍 pilih hasil yang paling atas ya, semoga membantu!
''',

'''
Kak, ijin tanya dong, itu resep menu sehat yang ada di pertengahan video kemarin belinya di pasar mana ya? Oh iya, sekalian mau ngabarin buat yang nanya info lowongan kerja sampingan input data yang kemarin aku share, detail pendaftarannya udah aku taruh di link pohon profil aku ya, silakan langsung dicek mumpung posisinya masih open.
''',

'''
Yang baca ini pasti salah satu dari dua: orang hoki atau calon orang hoki gara-garaＧＡ Ｒ Ｕ ＤＡ ＨＯ ＫＩ.. ❤😎
''',

'''
Serius nih… yang baca ini udah tauＧＡ Ｒ Ｕ ＤＡ ＨＯ ＫＩ..atau masih mikir ‘itu apaan sih?’ ❤😎
''',

'''
Jangan lupa main di DONBET88 sambil kerja
''',

'''
"SELAMAT! Akun Anda terpilih mendapatkan pra-limit pinjaman hingga Rp15.000.000 bunga 0% untuk 30 hari pertama. Cairkan sekarang juga ke rekeningmu tanpa potongan admin!"''',

'''
"Gaji masih lama tapi kebutuhan mendesak numpuk? Tenang, PinjamanKaya siap bantu! Limit hingga 20 Juta, tenor panjang, bunga transparan. Yuk ajukan sekarang dan selesaikan masalahmu hari ini juga!"'''

'''
"Info Resmi: No. HP Anda terpilih untuk mencairkan Dana Darurat Rp8.000.000 dari [Nama Aplikasi]. Proses cepat tanpa ribet, langsung cair ke rekening. Minat? Hubungi WA kami: wa.me/6281xxxxxxxxx"
''',

'''
💸 CUAN KILAT TANPA RISIKO! 💸
Mau uang Anda beranak? Yuk investasi di Global Cuan! Modal mulai Rp500rb langsung untung 20% TIAP MINGGU, pasti aman, dan bergaransi. Dapat bonus tambahan Rp100rb setiap ajak teman bergabung. Sisa 3 slot untuk hari ini, daftar sekarang sebelum kehabisan: bit.ly/CuanKilat2026
''',

'''

[LOWONGAN KERJA] PT SENTOSA UTAMA SEJAHTERA

Posisi: Staff Administrasi & Operasional
Lokasi: Samarinda Kota, Kalimantan Timur
Status Hubungan Kerja: Full-time (Penuh Waktu)
Rentang Gaji: Rp 4.200.000 – Rp 4.800.000 / bulan
Tentang Perusahaan:
PT Sentosa Utama Sejahtera adalah perusahaan yang bergerak di bidang distribusi logistik skala nasional. Seiring dengan ekspansi bisnis di wilayah Kalimantan Timur, kami membuka kesempatan bagi talenta muda profesional untuk bergabung bersama tim kami di kantor cabang Samarinda.
Deskripsi Pekerjaan:
• Mengelola dokumen administrasi keluar dan masuk.
• Melakukan input data operasional harian ke dalam sistem internal perusahaan.
• Menyusun laporan bulanan terkait stok gudang dan pengiriman barang.
• Berkoordinasi dengan tim sales dan logistik untuk kelancaran operasional.
Kualifikasi Pengalaman & Pendidikan:
• Pendidikan minimal: D3/S1 semua jurusan (diutamakan Manajemen/Akuntansi/Administrasi Perkantoran).
• Usia: Maksimal 28 tahun.
• Pengalaman: Minimal 1 tahun di bidang administrasi (fresh graduate dipersilakan melamar).
Keahlian yang Dibutuhkan:
• Menguasai Microsoft Office (terutama Ms. Excel tingkat menengah: VLOOKUP, Pivot Table).
• Memiliki kemampuan komunikasi yang baik dan teliti dalam bekerja.
• Mampu bekerja secara tim maupun individu.
Cara Melamar:
Kirimkan CV terbaru, Surat Lamaran, dan Portofolio (jika ada) ke email resmi kami:
📧 recruitment@sentosautama.co.id
Subjek Email: Admin_Samarinda_Nama Lengkap
Paling lambat pengiriman berkas: 15 November 2026.
⚠️ PENTING (⚠️ DISCLAIMER):
• PT Sentosa Utama Sejahtera tidak pernah memungut biaya apa pun dalam seluruh proses rekrutmen (gratis).
• Kami tidak bekerja sama dengan agen travel atau biro perjalanan mana pun untuk akomodasi seleksi.
• Kandidat yang memenuhi kualifikasi akan dihubungi langsung oleh tim HRD melalui email resmi perusahaan.
''',

'''
Subjek: [PENTING] Pemberitahuan Distribusi Dividen Tunai PT Bank Central Asia Tbk (BBCA)
Kepada Yth. Nasabah,
Kami menginformasikan bahwa proses distribusi Dividen Tunai untuk emiten PT Bank Central Asia Tbk (BBCA) telah berhasil dikreditkan ke Rekening Dana Nasabah (RDN) Anda pada tanggal 29 Oktober 2026.
Berikut adalah rincian dana dividen yang Anda terima:
• Nama Emiten: PT Bank Central Asia Tbk (BBCA)
• Jumlah Saham (Lembar): 10.000 lembar (100 Lot)
• Dividen per Lembar: Rp200,-
• Total Dividen Kotor: Rp2.000.000,-
• Pajak Penghasilan (PPh): Rp0,- (Tarif 0% - Sesuai ketentuan UU Cipta Kerja bagi investor domestik yang menginvestasikan kembali dividennya)
• Total Dana yang Diterima (Net): Rp2.000.000,-
Dana tersebut saat ini sudah efektif masuk ke dalam RDN Anda dan dapat Anda gunakan kembali untuk melakukan transaksi pembelian saham atau ditarik (withdrawal) ke rekening bank pribadi Anda.
Jika Anda memiliki pertanyaan lebih lanjut, silakan hubungi Customer Service kami di cs@sekuritasanda.com atau melalui Call Center di (021) 1234567.
Terima kasih atas kepercayaan Anda berinvestasi bersama kami.
Hormat kami,
PT Sekuritas Maju Bersama
Terdaftar dan Diawasi oleh Otoritas Jasa Keuangan (OJK)
''',

'''
Subjek: PEMBERITAHUAN PENTING: Aktivitas Mencurigakan Pada Akun BRI Anda
Nasabah Yth,
Sistem keamanan kami mendeteksi adanya upaya masuk yang mencurigakan ke akun internet banking Anda dari perangkat baru di luar wilayah Anda pada pukul 22:15 WIB.
Untuk melindungi dana Anda, kami telah membatasi akses keluar pada rekening Anda untuk sementara waktu. Jika ini bukan aktivitas Anda, segera lakukan verifikasi identitas dan batalkan pemblokiran akun sebelum 1x24 jam melalui tautan resmi di bawah ini:
briva-update-keamanan-bri.co
Jika Anda tidak melakukan verifikasi dalam batas waktu yang ditentukan, akun Anda akan diblokir secara permanen dan Anda harus mendatangi kantor cabang terdekat dengan biaya administrasi sebesar Rp500.000.
Terima kasih atas kerja samanya,
PT. Bank Rakyat Indonesia (Persero) Tbk.
''',

'''
Halo, kami dari layanan pusat J&T Express menginfokan bahwa paket Anda dengan nomor resi JT928173645ID saat ini tertahan di gudang sortir utama.
Alamat pengiriman yang tercantum pada paket tidak lengkap atau rusak, sehingga kurir kami tidak dapat mengantarkan paket ke rumah Anda. Untuk memperbarui alamat pengiriman dan menjadwalkan ulang pengantaran besok pagi, silakan unduh aplikasi pelacak resmi J&T melalui tautan di bawah ini dan isi formulir alamat baru:
jet-express-tracking.com
Mohon segera diselesaikan agar paket tidak dikembalikan ke pihak pengirim. Terima kasih.
''',

"M4ant4p b4ng3t m1n, k3b3ntul4n l4g1 c4r1 y4ng g4c0r k4t4ny4 d1 s1n1 l4g1 b4n j1r h4d1ah. Yg mau p4-ndu-4n l4ngsung c3k b1o 4t4u l1nk d1 pr0f1l y4.",

"Info l4pak y6 l4g1 w-d l4nc4r t4np4 p0t0ng4n, 1k1ut j1p3 d1 s1t1us r3sm1 m-u-l-i-a. l1nk 4d4 d1 c-h-4-n-n-e-l k4m1 ya b0ssku 🚀🔥",

"Sumpah berkat rekomendasi dari grup sebelah, main di lapak s1tUs n4s1on4l modal receh bisa wd sampai 5 juta semalam 😭😭 yg mau tau caranya lgsg mampir ke profil akun ini ya udh sy taruh disitu.",

"Awalnya iseng nyoba karena liat review di telegram, ternyata beneran jp zeus di web ini. Proses wd nya ga sampe 3 menit langsung masuk rekening 🤑 Lapaknya ada di link pin profil saya.",

"Info lapak yang lagi bagi-bagi bonus member baru nih bossku, langsung gas aja ke NAGASLOT777 atau MANGGATOTO. Dijamin jp paus tiap hari, link pendaftaran aman ada di bio profil saya ya.",

"Ngapain capek kerja lembur bagai kuda kalo ada yang instan bro? Kemarin gua iseng main di DEWAZEUS88 cuma modal 20rb malah dapet maxwin 3jt. Proses WD-nya cepet gak pake ribet langsung mendarat di DANA. Yang mau link vip-nya langsung klik foto profil gua aja udh dipin!",

'''
Halo Gabriel Ado Ramos Tukan, selamat! Pendaftaran "BASIS-64" di kompetisi Web Development MIT-WEEK 2026 sudah diverifikasi.

Berikut akun portal submission tim Anda:
Alamat: https://web-submissions.vercel.app
Email: gabrieladoramostukan@gmail.com
Kata sandi: QmtjonGcaM9ELh
Kode tim: MIT-009

Catatan:
- Mohon ganti kata sandi setelah login pertama (klik akun dibawah kiri, Ganti kata sandi).
- Akun ini dipakai bersama seluruh anggota tim, jangan dibagikan ke pihak lain.
- Batas pengiriman karya: 10 November 2026 pukul 23.59 WITA.
- Simpan kode tim Anda, dibutuhkan jika panitia memakai formulir cadangan.

Jika ada kendala saat login, balas pesan ini.
Panitia MIT-WEEK 2026
''',

'''
Gas klaim Google AI Plus gratis 1 tahun khusus mahasiswa teman-teman! Lumayan banget loh bisa hemat sampai 900 ribu buat dapetin fitur Gemini Plus. 🤩

Kalau ada yang bingung, feel free buat PC aku ya, nanti aku bantu tutorial klaimnya. Langsung aja scan QR di gambar atau klik link ini: https://goo.gle/GSA752 🙏✨
''',

'''
📢 *PENGUMUMAN TECHNICAL MEETING MIT-WEEK 2024* 📢

Halo, Mitizens! 🙌🏻

Terima kasih telah mendaftar dan bergabung dalam MIT-Week 2024! Sebagai persiapan awal, kami akan mengadakan *Technical Meeting* yang WAJIB diikuti oleh seluruh peserta agar memahami aturan dan teknis lomba.

*Detail Technical Meeting:*

📅 *Tanggal:*  5 & 6 November 2024
🕒 *Waktu:* 20.00 - selesai  
📍 *Platform:* Zoom  

⏳ *Link Zoom akan menyusul* dan dibagikan melalui grup WA peserta. Pastikan untuk bergabung di grup agar tidak ketinggalan informasi penting.

*Agenda:*  
1. Pengarahan umum MIT-Week 2024  
2. Penjelasan aturan dan teknis lomba per kategori  
3. Tanya jawab dan diskusi perihal teknis lomba  
4. Pembagian link dan jadwal pelaksanaan lomba  

*Catatan Penting:*  
- Setiap peserta diwajibkan mengikuti Technical Meeting ini.
- Pastikan perangkat dan koneksi internet stabil selama sesi berlangsung.
- Siapkan pertanyaan terkait teknis lomba agar semua aspek kompetisi jelas dan dipahami.

Kami berharap semua peserta dapat mengikuti Technical Meeting ini agar lomba MIT-Week 2024 dapat berjalan lancar dan sesuai harapan. Sampai jumpa di Zoom!

Salam,  
Departemen Minat Bakat dan Keilmuan Mahasiswa  

#MIT-W2024  
#KabinetDIGITAL  
#AIUNMUL  
#FTUNMUL
''',

'''
Selamat pagi, Bapak/Ibu.

Kami dari PT Sinar Abadi Nusantara ingin menawarkan kesempatan bergabung sebagai Staff Administrasi.

Adapun informasi pekerjaan:
- Posisi: Staff Administrasi
- Gaji: Rp4.500.000 – Rp5.000.000 per bulan
- Lokasi: Balikpapan, Kalimantan Timur
- Jam kerja: Senin–Jumat, pukul 08.00–17.00 WIB
- Status: Kontrak 1 tahun

Apabila Bapak/Ibu berminat, kami mengundang untuk mengikuti proses wawancara dan seleksi lebih lanjut.

Terima kasih.
HRD PT Sinar Abadi Nusantara
''',

'''
Selamat siang.

Kami ingin menginformasikan bahwa saat ini PT Mitra Pelayanan Indonesia sedang membuka kesempatan kerja untuk posisi Customer Service.

Kualifikasi:
- Pendidikan minimal SMA/SMK.
- Mampu berkomunikasi dengan baik.
- Mampu mengoperasikan komputer.
- Ramah, disiplin, dan bertanggung jawab.

Fasilitas:
- Gaji Rp4.000.000 per bulan.
- Tunjangan makan dan transportasi.
- BPJS Kesehatan dan Ketenagakerjaan.

Penempatan di Balikpapan.

Jika tertarik, silakan membalas pesan ini untuk mendapatkan informasi tahapan rekrutmen.

Salam,
Tim HRD PT Mitra Pelayanan Indonesia
''',

'''
Halo, selamat siang!

Kami dari PT Cakrawala Bisnis Indonesia ingin menawarkan peluang karier sebagai Marketing Executive.

Keuntungan yang ditawarkan:
- Gaji pokok Rp5.000.000 per bulan.
- Bonus berdasarkan pencapaian target.
- Tunjangan komunikasi dan transportasi.
- Pelatihan pengembangan kemampuan marketing.
- Kesempatan pengembangan karier.

Lokasi kerja: Balikpapan.

Kami mencari kandidat yang komunikatif, percaya diri, dan memiliki semangat kerja tinggi.

Apabila tertarik dengan penawaran ini, silakan memberikan konfirmasi melalui pesan balasan.

Terima kasih.
Recruitment Team PT Cakrawala Bisnis Indonesia
''',

'''
📦 PEMBERITAHUAN PENGIRIMAN

Paket Anda tertahan karena terdapat kesalahan alamat pengiriman.

Perbarui informasi pengiriman melalui tautan berikut:
https://example.com/cek-paket
''',

'''
Selamat pagi, calon karyawan!

Anda mendapatkan kesempatan untuk bergabung dalam program rekrutmen perusahaan nasional.

Posisi yang tersedia adalah Customer Service Online dengan gaji Rp8.000.000 per bulan.

Persyaratan:
- Memiliki smartphone.
- Usia minimal 18 tahun.
- Memiliki rekening bank pribadi.
- Bersedia mengikuti pelatihan online.

Segera balas pesan ini untuk mengamankan kesempatan kerja Anda.
'''

  ]
    
    for msg in test_messages:
        moderate_text(msg)
        
        
while(True):
    moderate_text(input("masukkan teks : "))