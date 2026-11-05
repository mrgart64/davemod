export const descriptions = {
	judol: {
		judol: {
			min: 0,
			max: 100,
			desc: "Pesan ini terdeteksi sebagai promosi atau ajakan taruhan judi online, slot gacor, atau manipulasi kata (obfuscation karakter) untuk mengelabui filter sistem.",
			learn: "Judi online sering menyamar menggunakan istilah unik, huruf yang diganti angka (seperti 's1ot' atau 'g4c0r'), atau tautan mencurigakan. Tujuannya adalah memancing Anda menaruh uang pada sistem permainan yang sudah diatur agar Anda selalu rugi.",
			act: "Abaikan dan jangan pernah mengklik link di dalam pesan ini. Jangan tergiur iming-iming bonus atau kemenangan mudah, lalu blokir nomor atau akun pengirimnya."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Pesan ini terdeteksi sebagai ajakan taruhan judi online dengan modus operandi lowongan kerja fiktif.",
			learn: "Penipu sering memakai kedok lowongan kerja mudah dengan gaji besar untuk menjerat korban agar masuk ke situs taruhan atau menyetor uang.",
			act: "Jangan pernah merespons atau mengisi formulir pendaftaran. Blokir kontak dan abaikan tawaran tersebut."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Terdeteksi anomali pada informasi pekerjaan resmi yang tercampur dengan unsur promosi eksternal atau tautan terlarang.",
			learn: "Informasi kerja asli terkadang disusupi tautan iklan atau promosi luar yang tidak aman oleh pihak tidak bertanggung jawab.",
			act: "Verifikasi ulang keabsahan rekrutmen melalui kanal resmi perusahaan dan pastikan domain tidak disusupi."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Modus penipuan undian berhadiah yang sering kali mengarah ke situs perjudian atau phising pengumpulan data.",
			learn: "Hadiah gratis atau undian mendadak biasanya hanya trik untuk memancing Anda mengeklik tautan berbahaya.",
			act: "Abaikan pesan undian yang mencurigakan dan jangan berikan informasi pribadi atau kode OTP apa pun."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Tautan atau penawaran pinjaman cepat yang terafiliasi dengan promosi judi online atau situs taruhan ilegal.",
			learn: "Aplikasi pinjaman kilat ilegal sering bekerja sama dengan jaringan judi online untuk menjebak korban ke dalam lingkaran utang.",
			act: "Hindari mengakses tautan pinjaman tidak resmi untuk mencegah lingkaran utang dan pencurian data."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Skema penawaran keuntungan instan yang mencampurkan modus investasi fiktif dan tautan perjudian.",
			learn: "Janji untung besar tanpa risiko adalah ciri utama penipuan berkedok investasi yang sering disisipkan di pesan promosi.",
			act: "Pastikan entitas keuangan terdaftar di OJK dan abaikan janji keuntungan besar tanpa risiko."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Indikasi konten instrumen legal yang terkontaminasi oleh tautan luar atau indikasi manipulasi pihak ketiga.",
			learn: "Platform investasi resmi tidak pernah menyebarkan tautan promosi melalui pesan singkat pribadi yang mencurigakan.",
			act: "Selalu akses platform investasi melalui aplikasi resmi yang terverifikasi, bukan dari tautan pesan singkat."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Upaya pengarahan ke situs web berbahaya (phising) yang berkedok hiburan, bonus, atau platform judi.",
			learn: "Tautan phising dibuat mirip dengan situs asli untuk mencuri kata sandi atau data pribadi Anda.",
			act: "Jangan klik tautan sama sekali. Periksa URL dengan teliti untuk menghindari pencurian kredensial akun."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Pesan berlabel penting namun memuat tautan atau unsur promosi perjudian yang mencurigakan.",
			learn: "Label 'penting' atau darurat sering dipakai agar korban merasa panik dan langsung menuruti isi pesan.",
			act: "Lakukan verifikasi identitas pengirim secara mandiri sebelum mengambil tindakan lanjutan."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Pesan bernada umum yang menyertakan sisipan promosi atau kata kunci terkait perjudian.",
			learn: "Terkadang pesan biasa sengaja diselipi kata kunci promosi tersembunyi untuk mengecoh sistem keamanan.",
			act: "Tetap waspada terhadap sisipan tautan eksternal yang tidak dikenal di dalam teks."
		}
	},
	tawaran_kerja_palsu: {
		judol: {
			min: 10,
			max: 100,
			desc: "Tawaran pekerjaan fiktif yang menyusupkan tautan atau promosi perjudian online di dalam pesannya.",
			learn: "Lowongan kerja palsu kerap dijadikan jalan masuk untuk menyebarkan link taruhan online.",
			act: "Jangan ikuti instruksi pengirim dan laporkan akun sebagai bentuk penipuan ganda."
		},
		tawaran_kerja_palsu: {
			min: 0,
			max: 100,
			desc: "Pola pesan mencurigakan yang menjanjikan posisi pekerjaan instan dengan syarat mudah, berujung pada permintaan biaya administrasi.",
			learn: "Perusahaan asli tidak pernah meminta uang sepeser pun atau biaya administrasi di awal proses seleksi kerja.",
			act: "Validasi keabsahan perusahaan melalui website resmi. Jangan pernah mentransfer uang atau membagikan data KTP."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Terdapat kemiripan struktur kalimat rekrutmen resmi namun terdeteksi indikasi anomali atau modifikasi penipuan.",
			learn: "Penipu sering meniru gaya bahasa surat resmi perusahaan besar agar terlihat menyakinkan.",
			act: "Konfirmasi ulang lowongan melalui HRD atau domain email resmi instansi terkait."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Modus rekrutmen abal-abal yang menjanjikan hadiah awal atau bonus pendaftaran instan untuk menjerat korban.",
			learn: "Iming-iming bonus pendaftaran kerja instan adalah tipu muslihat agar korban tergiur memberikan data pribadi.",
			act: "Abaikan segala bentuk iming-iming hadiah atau bonus dalam proses seleksi kerja."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Pesan lowongan kerja palsu yang mewajibkan pelamar mengajukan pinjaman online sebagai bagian dari 'pelatihan'.",
			learn: "Modus baru penipuan kerja memaksa korban berutang di pinjol dengan dalih modal kerja atau pelatihan.",
			act: "Tolak serta-merta instruksi peminjaman dana atas nama perusahaan apa pun."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Modus kerja paruh waktu palsu yang mengharuskan korban melakukan 'deposit' atau investasi modal awal.",
			learn: "Pekerjaan 'like video' atau 'tugas klik' yang meminta Anda setor uang duluan pasti berujung penipuan.",
			act: "Jangan pernah menyetor dana dengan dalih tugas kerja atau komisi tugas."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Informasi pekerjaan di sektor keuangan yang menyerupai pola penawaran kerja fiktif.",
			learn: "Hati-hati dengan lowongan di bidang keuangan yang menjanjikan hasil instan tanpa tes kredibilitas yang jelas.",
			act: "Pastikan lowongan berasal dari lembaga keuangan berizin resmi dan terdaftar."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Tautan pendaftaran kerja palsu yang dirancang khusus untuk mencuri data pribadi dan kredensial pelamar.",
			learn: "Formulir lamaran palsu dibuat untuk memanen data KTP, nomor rekening, hingga password Anda.",
			act: "Jangan masukkan data sensitif ke dalam formulir eksternal yang tidak dikenal."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Panggilan darurat atau pengumuman seleksi kerja mendesak yang mengarah ke indikasi penipuan.",
			learn: "Panggilan interview mendadak dengan batas waktu ketat sengaja dibuat agar Anda tidak sempat berpikir panjang.",
			act: "Periksa kembali kebenaran jadwal dan tahapan seleksi melalui portal resmi instansi."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Pesan komunikasi bernada profesional namun mengindikasikan pola rekrutmen penipuan.",
			learn: "Bahasa yang kaku atau formal tidak menjamin pesan tersebut aman dari modus penipuan kerja.",
			act: "Lakukan verifikasi rekam jejak perusahaan sebelum melanjutkan komunikasi."
		}
	},
	tawaran_kerja_asli: {
		judol: {
			min: 10,
			max: 100,
			desc: "Informasi karier valid yang tercemar oleh spam tautan eksternal atau iklan tidak relevan.",
			learn: "Tautan iklan luar yang menyusup di tengah info loker asli biasanya berasal dari pihak ketiga yang tidak aman.",
			act: "Abaikan bagian tautan luar dan fokuskan komunikasi melalui portal rekrutmen resmi."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Pesan rekrutmen yang memadukan informasi perusahaan sah dengan instruksi mencurigakan.",
			learn: "Penipu sering mencatut nama perusahaan besar agar korban percaya sebelum memberikan instruksi palsu.",
			act: "Pastikan seluruh proses administrasi melalui sistem internal perusahaan, bukan chat pribadi."
		},
		tawaran_kerja_asli: {
			min: 0,
			max: 100,
			desc: "Pesan panggilan atau informasi rekrutmen yang menunjukkan karakteristik komunikasi profesional dan standar operasional resmi.",
			learn: "Perekrutan resmi selalu menggunakan email berdomain perusahaan (contoh: @namaperusahaan.co.id) dan melalui wawancara transparan.",
			act: "Pastikan domain email pengirim valid dan konfirmasi jadwal melalui kontak resmi perusahaan."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Informasi rekrutmen sah yang disalahgunakan pihak tidak bertanggung jawab untuk menyebar undian palsu.",
			learn: "Jangan terkecoh jika ada pihak luar yang mengatasnamakan perusahaan tempat Anda melamar untuk membagikan hadiah.",
			act: "Abaikan informasi di luar saluran resmi HRD perusahaan."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Penawaran kerja sah yang tidak wajar karena menyertakan syarat finansial eksternal.",
			learn: "Perusahaan resmi tidak pernah mewajibkan calon karyawannya meminjam uang di aplikasi luar untuk keperluan kerja.",
			act: "Laporkan kejanggalan tersebut kepada bagian dukungan resmi perusahaan."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Informasi karier asli yang mendadak menyisipkan tawaran penanaman modal tidak wajar.",
			learn: "Pekerjaan kantor tidak pernah mengharuskan karyawannya menyetor modal investasi pribadi.",
			act: "Abaikan tawaran finansial di luar ikatan kontrak kerja resmi."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Informasi penempatan kerja atau program kepemilikan instansi yang sah dan terstandarisasi.",
			learn: "Program finansial karyawan resmi selalu diatur secara transparan di dalam kontrak kerja tertulis.",
			act: "Pelajari dokumen penawaran kerja secara saksama sesuai regulasi ketenagakerjaan."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Tautan portal karier resmi yang berpotensi ditiru oleh pihak luar untuk pencurian data.",
			learn: "Selalu pastikan Anda membuka alamat website perusahaan yang benar, bukan tiruan dengan sedikit perbedaan huruf.",
			act: "Pastikan Anda mengakses domain utama perusahaan (misal: .co.id atau .com yang terverifikasi)."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Pemberitahuan penting terkait jadwal wawancara atau tahapan penerimaan kerja.",
			learn: "Jadwal resmi rekrutmen biasanya diumumkan di web utama atau portal karier terdaftar.",
			act: "Catat jadwal dengan baik dan hadir tepat waktu sesuai arahan resmi."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Komunikasi administratif rekrutmen dalam batas wajar dan profesional.",
			learn: "Pesan administratif standar bertujuan untuk mengatur kelancaran komunikasi antara pelamar dan HRD.",
			act: "Simpan arsip komunikasi untuk keperluan koordinasi selanjutnya."
		}
	},
	giveaway_palsu: {
		judol: {
			min: 10,
			max: 100,
			desc: "Modus undian berhadiah yang mengarahkan korban langsung ke situs perjudian atau taruhan online.",
			learn: "Banyak akun palsu mengadakan kuis berhadiah besar tujuannya hanya untuk memancing klik ke situs judi.",
			act: "Jangan ikuti tautan yang diberikan dan blokir akun penyebar pesan."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Pengumuman pemenang hadiah yang dikemas mirip dengan pemberitahuan seleksi atau apresiasi kerja.",
			learn: "Penipu sering mengecoh korban dengan seolah-olah mengumumkan 'terpilih' sebagai pemenang undian kerja.",
			act: "Abaikan klaim hadiah apa pun yang tidak pernah Anda daftarkan sebelumnya."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Konten promosi atau program apresiasi yang menyerupai pola undian mencurigakan.",
			learn: "Program apresiasi asli dari perusahaan selalu disosialisasikan lewat media sosial bercentang biru.",
			act: "Pastikan program apresiasi berasal dari instansi atau perusahaan yang valid."
		},
		giveaway_palsu: {
			min: 0,
			max: 100,
			desc: "Modus penipuan berkedok hadiah atau undian gratis dari figur publik/perusahaan besar yang mewajibkan korban mengklik tautan eksternal.",
			learn: "Undian asli tidak pernah meminta pemenang membayar biaya pajak atau transfer uang terlebih dahulu di awal.",
			act: "Waspada jika pengumuman tidak bersumber dari akun centang biru resmi. Jangan berikan kode OTP."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Iming-iming hadiah besar yang mensyaratkan pencairan dana melalui aplikasi pinjaman online tertentu.",
			learn: "Hadiah uang tunai yang syaratnya harus mencairkan pinjaman online adalah jebakan penipuan klasik.",
			act: "Tolak segala bentuk syarat yang melibatkan transaksi keuangan pribadi."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Modus hadiah gratis yang mewajibkan pemenang membayar biaya administrasi atau deposit investasi.",
			learn: "Jika Anda harus membayar sejumlah uang untuk 'mengambil' hadiah Anda, itu pasti penipuan.",
			act: "Pemenang hadiah sah tidak pernah diminta membayar biaya apa pun di awal."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Program promosi berhadiah dari lembaga keuangan resmi yang perlu diverifikasi ketentuannya.",
			learn: "Lembaga keuangan resmi selalu mencantumkan syarat dan ketentuan program promosi secara transparan.",
			act: "Cek syarat dan ketentuan melalui situs resmi lembaga terkait."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Tautan klaim hadiah palsu yang dirancang untuk mencuri informasi akun media sosial atau perbankan.",
			learn: "Situs klaim hadiah palsu dibuat agar Anda memasukkan password akun agar mereka bisa meretasnya.",
			act: "Jangan pernah memasukkan kata sandi atau data pribadi pada halaman klaim hadiah instan."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Pesan pemberitahuan klaim hadiah mendesak dengan batas waktu palsu.",
			learn: "Batas waktu klaim yang sangat singkat sengaja dibuat agar korban panik dan tidak sempat berpikir.",
			act: "Abaikan batas waktu palsu yang dibuat untuk menciptakan kepanikan."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Pesan umum yang membahas perihal pembagian hadiah atau undian komunitas.",
			learn: "Pembicaraan mengenai undian di grup umum tetap perlu disikapi dengan pikiran jernih dan santai.",
			act: "Pastikan kebenaran informasi sebelum membagikan data kepada pihak lain."
		}
	},
	pinjol: {
		judol: {
			min: 10,
			max: 100,
			desc: "Penawaran dana darurat yang terafiliasi dengan promosi situs judi online.",
			learn: "Iklan pinjaman uang kilat di internet sering kali berafiliasi dengan jaringan bandar judi online.",
			act: "Hindari mengakses layanan keuangan ilegal yang terikat dengan jaringan perjudian."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Modus pinjaman online terselubung dalam proses administrasi lowongan kerja fiktif.",
			learn: "Jangan pernah memberikan foto KTP untuk verifikasi pinjaman yang tidak Anda kenal asal-usulnya.",
			act: "Batalkan proses komunikasi dan jangan berikan foto KTP atau swafoto."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Informasi pembiayaan internal pegawai yang perlu divalidasi keamanannya.",
			learn: "Fasilitas keuangan untuk karyawan diatur secara resmi melalui bagian HRD atau keuangan perusahaan.",
			act: "Gunakan fasilitas keuangan resmi perusahaan melalui prosedur internal yang sah."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Iming-iming dana tunai atau hadiah undian yang berujung pada jeratan pinjaman online ilegal.",
			learn: "Hadiah uang tunai instan sering disalahgunakan sebagai umpan untuk menjebak korban meminjam di aplikasi ilegal.",
			act: "Abaikan tawaran pencairan dana instan tanpa syarat yang jelas."
		},
		pinjol: {
			min: 0,
			max: 100,
			desc: "Penawaran pinjaman dana cepat tanpa verifikasi yang berpotensi melanggar privasi dan mengenakan bunga tinggi.",
			learn: "Pinjaman online ilegal (rentenir online) mengenakan bunga mencekik, denda harian besar, dan mencuri data kontak HP Anda.",
			act: "Periksa legalitas entitas pinjaman melalui daftar resmi Otoritas Jasa Keuangan (OJK)."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Anjuran mengambil pinjaman online untuk disetorkan ke platform investasi ilegal.",
			learn: "Mengambil utang demi modal investasi bodong adalah cara tercepat mengalami kebangkrutan finansial.",
			act: "Jangan mengambil pinjaman untuk tujuan penanaman modal yang tidak jelas."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Layanan pinjaman multiguna atau pembiayaan dari lembaga resmi berizin.",
			learn: "Layanan keuangan legal selalu transparan mengenai cicilan, bunga, serta terdaftar resmi di bawah pengawasan OJK.",
			act: "Pahami rincian suku bunga dan kemampuan bayar sebelum mengambil produk finansial."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Tautan pengajuan pinjaman kilat palsu yang bertujuan mencuri data pribadi dan kontak ponsel.",
			learn: "Aplikasi pinjaman abal-abal meminta izin akses seluruh kontak HP Anda untuk alat ancaman teror penagihan.",
			act: "Unduh aplikasi pinjaman hanya melalui toko aplikasi resmi (Play Store/App Store)."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Pemberitahuan tagihan atau penagihan pinjaman mendesak.",
			learn: "Pesan ancaman penagihan dari nomor tidak dikenal sering dipakai penagih fiktif untuk memeras korban.",
			act: "Verifikasi riwayat transaksi pinjaman Anda secara mandiri di aplikasi resmi."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Informasi umum seputar layanan pembiayaan atau pinjaman digital.",
			learn: "Literasi keuangan yang baik membantu Anda membedakan mana pinjaman legal yang aman dan mana yang berbahaya.",
			act: "Pastikan selalu menjaga kerahasiaan data finansial pribadi."
		}
	},
	investasi_bodong: {
		judol: {
			min: 10,
			max: 100,
			desc: "Penawaran investasi berisiko tinggi yang terindikasi sama dengan jaringan perjudian online.",
			learn: "Banyak situs judi online menyamar sebagai 'game investasi' atau 'trading instan' untuk mengelabui korban.",
			act: "Hindari segala bentuk tawaran penggandaan uang instan."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Skema penipuan investasi yang dibungkus dalam bentuk tugas kerja paruh waktu berbayar.",
			learn: "Modus kerja paruh waktu yang meminta deposit uang di awal adalah ciri utama investasi bodong berkedok tugas.",
			act: "Tolak instruksi penyetoran dana deposit untuk keperluan pekerjaan."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Informasi program keuangan korporat yang perlu dipastikan keabsahannya.",
			learn: "Program keuangan internal perusahaan resmi tidak pernah meminta karyawannya menyetor uang ke rekening pribadi.",
			act: "Konsultasikan penawaran finansial dengan pihak manajemen internal."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Modus investasi berkedok hadiah undian atau modal gratis awal.",
			learn: "Iming-iming modal investasi gratis yang berujung pada keharusan transfer uang adalah bentuk penipuan.",
			act: "Abaikan tawaran modal gratis yang meminta biaya transfer di muka."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Anjuran mengambil pinjaman online untuk disetorkan ke platform investasi ilegal.",
			learn: "Jangan pernah mempertaruhkan uang pinjaman untuk instrumen investasi yang tidak jelas legalitasnya.",
			act: "Jangan pernah menggunakan dana pinjaman untuk instrumen investasi berisiko tinggi."
		},
		investasi_bodong: {
			min: 0,
			max: 100,
			desc: "Skema investasi bodong yang menjanjikan keuntungan pasti (fixed return) dalam waktu singkat tanpa risiko.",
			learn: "Dalam dunia keuangan, tidak ada investasi yang memberikan untung besar pasti dalam waktu singkat tanpa risiko.",
			act: "Gunakan prinsip 2L (Legal dan Logis). Cek izin produk investasi di Bappebti atau OJK."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Informasi instrumen pasar modal yang menyerupai penawaran investasi berisiko.",
			learn: "Investasi asli di pasar modal selalu memiliki fluktuasi naik-turun harga dan tidak menjanjikan untung tetap secara instan.",
			act: "Pastikan instrumen memiliki prospektus resmi dan terdaftar di lembaga regulator."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Tautan palsu portal investasi yang dirancang untuk meretas akun portofolio keuangan Anda.",
			learn: "Situs investasi tiruan dibuat mirip dengan aplikasi trading terkenal untuk mencuri data akun Anda.",
			act: "Selalu ketik alamat situs resmi secara manual dan hindari tautan dari pesan singkat."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Pemberitahuan darurat penarikan dana atau pembekuan akun investasi palsu.",
			learn: "Penipu investasi sering beralasan akun Anda dibekukan dan harus membayar denda agar dana bisa dicairkan.",
			act: "Jangan ikuti instruksi transfer tambahan untuk membuka blokir dana."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Diskusi atau obrolan umum mengenai tren pasar dan instrumen penanaman modal.",
			learn: "Berdiskusi seputar ekonomi membantu menambah wawasan, namun keputusan finansial tetap ada di tangan Anda.",
			act: "Lakukan analisis mandiri sebelum memutuskan penempatan dana."
		}
	},
	investasi_asli: {
		judol: {
			min: 10,
			max: 100,
			desc: "Informasi finansial sah yang tercampur dengan tautan promosi taruhan luar.",
			learn: "Artikel atau info keuangan asli kadang disusupi iklan judi online oleh pihak luar yang tidak bertanggung jawab.",
			act: "Abaikan tautan luar dan fokus pada platform utama yang terdaftar."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Pesan edukasi keuangan yang disusupi tawaran kerja fiktif.",
			learn: "Modus penipuan kerja sering berlindung di balik pembahasan edukasi investasi agar terlihat profesional.",
			act: "Verifikasi keaslian pengirim melalui kanal komunikasi resmi."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Informasi karier di bidang jasa keuangan dan pasar modal yang resmi.",
			learn: "Karier di sektor keuangan resmi selalu mengikuti standar regulasi ketenagakerjaan dan lembaga terkait.",
			act: "Pastikan proses rekrutmen mengikuti standar operasional perusahaan."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Program apresiasi investor resmi yang perlu dipastikan keamanannya dari tiruan penipuan.",
			learn: "Sekuritas atau instansi keuangan resmi tidak pernah membagikan hadiah undian acak via pesan singkat pribadi.",
			act: "Cek pengumuman melalui aplikasi atau website resmi sekuritas."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Produk pembiayaan atau margin trading resmi dari lembaga keuangan terdaftar.",
			learn: "Fasilitas pinjaman atau margin dalam investasi memiliki aturan risiko yang ketat dan transparan.",
			act: "Pahami profil risiko dan ketentuan margin sebelum menggunakannya."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Informasi instrumen resmi yang hampir menyerupai penawaran produk tidak berizin.",
			learn: "Pastikan selalu mengecek daftar entitas legal di OJK agar tidak tertipu produk investasi tiruan.",
			act: "Periksa kembali legalitas produk di situs web regulator keuangan."
		},
		investasi_asli: {
			min: 0,
			max: 100,
			desc: "Informasi instrumen atau instansi penanaman modal yang mematuhi keterbukaan informasi finansial serta terdaftar secara sah.",
			learn: "Investasi yang aman selalu transparan, memiliki izin resmi dari Otoritas Jasa Keuangan (OJK), dan risikonya jelas.",
			act: "Pelajari prospektus risiko secara mendalam dan sesuaikan dengan profil risiko keuangan pribadi."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Tautan masuk platform investasi resmi yang rentan ditiru oleh modus pemalsuan domain.",
			learn: "Pengamanan ganda seperti verifikasi wajah atau PIN sangat penting untuk menjaga akun investasi Anda.",
			act: "Gunakan autentikasi dua faktor (2FA) dan pastikan sertifikat SSL situs aman."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Pengumuman pemeliharaan sistem atau pembaruan regulasi portofolio.",
			learn: "Informasi penting aplikasi investasi biasanya dikirim langsung di dalam aplikasi (in-app notification).",
			act: "Perhatikan instruksi resmi dari manajemen aplikasi investasi Anda."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Berita atau laporan berkala mengenai kondisi pasar keuangan.",
			learn: "Informasi pasar finansial berfungsi sebagai panduan edukasi untuk memahami naik turunnya nilai aset.",
			act: "Gunakan data sebagai referensi edukasi finansial."
		}
	},
	phising: {
		judol: {
			min: 10,
			max: 100,
			desc: "Tautan palsu yang mengarahkan pengguna ke halaman login tiruan situs perjudian atau hiburan.",
			learn: "Situs web tiruan dibuat sedemikian rupa agar mirip aslinya demi mencuri data masuk Anda.",
			act: "Jangan pernah mengklik tautan atau memasukkan data kredensial apa pun."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Formulir online tidak resmi yang mencuri data pribadi dengan dalih pendaftaran kerja.",
			learn: "Formulir lamaran kerja abal-abal dirancang khusus untuk memanen data pribadi Anda.",
			act: "Tutup halaman web dan jangan berikan dokumen identitas diri."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Tautan pendaftaran sah yang perlu diwaspadai dari potensi pemalsuan domain oleh pihak lain.",
			learn: "Waspadai pemalsuan nama domain website resmi yang sepintas terlihat sama namun beda huruf.",
			act: "Pastikan ekstensi domain sesuai dengan instansi resmi yang dituju."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Halaman web klaim hadiah palsu yang dirancang untuk mencuri akses akun media sosial.",
			learn: "Tautan klaim hadiah sering kali meminta Anda login akun media sosial agar peretas bisa mengambil alih akun Anda.",
			act: "Abaikan tautan klaim hadiah instan untuk mengamankan data pribadi."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Situs web tiruan aplikasi pinjaman online untuk memanen data pribadi dan kontak darurat.",
			learn: "Jangan sembarangan mengisi data di link pinjaman online yang disebar lewat pesan singkat.",
			act: "Jangan isi data pribadi pada link yang dibagikan melalui pesan singkat."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Platform web investasi palsu yang merekam kata sandi dan data perbankan korban.",
			learn: "Situs trading palsu dibuat seolah-olah saldo Anda bertambah, padahal uang Anda sudah dicuri.",
			act: "Segera ubah kata sandi akun perbankan jika terlanjur mengeklik tautan mencurigakan."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Situs resmi lembaga keuangan yang perlu dipastikan keamanannya dari serangan tiruan.",
			learn: "Selalu pastikan ikon gembok pengaman SSL aktif pada bilah alamat web sebelum memasukkan data penting.",
			act: "Selalu verifikasi alamat URL sebelum melakukan proses masuk (login)."
		},
		phising: {
			min: 0,
			max: 100,
			desc: "Upaya pencurian data sensitif (kredensial akun, password, atau PIN) melalui tautan palsu yang menyerupai layanan resmi.",
			learn: "Phising adalah jebakan digital untuk mencuri kata sandi, kode OTP, atau PIN Anda dengan membuat halaman login palsu yang mirip aslinya.",
			act: "Jangan pernah klik link atau login. Periksa bilah alamat URL secara teliti dan gunakan autentikasi dua faktor (2FA)."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Notifikasi darurat palsu yang memaksa pengguna masuk ke tautan pemulihan akun tiruan.",
			learn: "Pesan yang mengabarkan akun Anda 'terkena pembatasan' dan menyuruh klik link pemulihan adalah trik phising.",
			act: "Abaikan pesan mendesak yang meminta verifikasi ulang kata sandi."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Pesan umum yang menyertakan tautan tersembunyi berpotensi berbahaya.",
			learn: "Tautan asing di dalam pesan singkat netral sering kali disusupi skrip berbahaya untuk mencuri data perangkat.",
			act: "Jangan mengakses tautan dari sumber yang tidak dikenal."
		}
	},
	penting: {
		judol: {
			min: 10,
			max: 100,
			desc: "Pesan berkedok pengumuman penting yang memuat tautan promosi perjudian terselubung.",
			learn: "Judul penting atau resmi sering dicatut penipu untuk menyebar link promosi perjudian.",
			act: "Verifikasi keaslian informasi melalui instansi atau pihak terkait."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Informasi panggilan seleksi darurat yang mengarah pada modus penipuan kerja.",
			learn: "Panggilan darurat seleksi kerja palsu dirancang agar korban langsung menuruti instruksi tanpa konfirmasi.",
			act: "Pastikan kebenaran jadwal wawancara langsung melalui kontak resmi."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Pemberitahuan mendesak terkait proses administrasi atau penempatan kerja.",
			learn: "Instruksi administrasi mendesak dari kantor resmi biasanya disampaikan melalui portal internal yang aman.",
			act: "Ikuti arahan sesuai SOP internal perusahaan."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Pengumuman batas akhir klaim hadiah yang dirancang untuk menciptakan kepanikan palsu.",
			learn: "Tekanan waktu (seperti 'klaim dalam 1 jam') sengaja dibuat agar Anda tidak sempat berpikir rasional.",
			act: "Abaikan instruksi batas waktu dari pengirim yang tidak dikenal."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Pemberitahuan tenggat waktu pembayaran atau pencairan dana mendesak.",
			learn: "Pesan ancaman tenggat waktu pinjaman dari nomor tidak dikenal adalah taktik teror penagih palsu.",
			act: "Cek status kewajiban finansial secara mandiri di aplikasi resmi."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Peringatan mendesak terkait penarikan atau penambahan dana investasi fiktif.",
			learn: "Peringatan darurat seputar akun investasi fiktif bertujuan memeras dana tambahan dari korban.",
			act: "Jangan melakukan transfer tambahan dana ke rekening pribadi penipu."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Informasi penting mengenai pembaruan portofolio atau instrumen keuangan.",
			learn: "Pemberitahuan penting dari aplikasi keuangan resmi selalu transparan dan tidak bernada ancaman.",
			act: "Periksa notifikasi langsung di dalam aplikasi resmi penanaman modal."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Peringatan keamanan palsu yang meminta tindakan verifikasi kilat melalui tautan luar.",
			learn: "Pesan darurat yang mengeklaim akun Anda terancam diblokir dan menyuruh klik link luar adalah modus phising.",
			act: "Jangan akses tautan pemulihan dari pesan teks; gunakan aplikasi resmi."
		},
		penting: {
			min: 0,
			max: 100,
			desc: "Informasi mendesak atau pengumuman penting yang bersifat informatif dari pihak berwenang atau institusi resmi.",
			learn: "Informasi penting yang sah disampaikan secara terbuka melalui kanal komunikasi resmi lembaga atau instansi berwenang.",
			act: "Baca dengan cermat isi instruksi dan lakukan verifikasi ulang jika pesan meminta tindakan administratif."
		},
		netral: {
			min: 10,
			max: 100,
			desc: "Pemberitahuan informasi umum atau pengingat jadwal kegiatan sehari-hari.",
			learn: "Pesan pengingat atau informasi jadwal kegiatan sehari-hari bersifat membantu koordinasi rutin Anda.",
			act: "Simpan informasi jika diperlukan dan abaikan jika tidak relevan."
		}
	},
	netral: {
		judol: {
			min: 10,
			max: 100,
			desc: "Percakapan biasa yang menyisipkan kata kunci atau promosi terkait judi online.",
			learn: "Terkadang obrolan santai tiba-tiba menyelipkan sisipan kata promosi taruhan terselubung.",
			act: "Tetap waspada terhadap konten sisipan promosi ilegal dalam obrolan."
		},
		tawaran_kerja_palsu: {
			min: 10,
			max: 100,
			desc: "Pesan sapaan umum yang bergeser menjadi penawaran lowongan kerja mencurigakan.",
			learn: "Kenalan baru di dunia maya yang langsung menawarkan pekerjaan mudah patut dicurigai.",
			act: "Batasi pemberian informasi pribadi kepada kenalan baru di ruang digital."
		},
		tawaran_kerja_asli: {
			min: 10,
			max: 100,
			desc: "Komunikasi awal atau obrolan perkenalan terkait peluang karier profesional.",
			learn: "Obrolan awal karier yang profesional selalu mengarah pada proses seleksi yang jelas dan terstruktur.",
			act: "Lanjutkan komunikasi melalui saluran formal yang aman."
		},
		giveaway_palsu: {
			min: 10,
			max: 100,
			desc: "Obrolan santai yang membahas topik undian atau pembagian hadiah daring.",
			learn: "Topik seputar hadiah undian di obrolan umum perlu disikapi dengan santai dan tidak mudah percaya.",
			act: "Jangan mudah percaya pada tautan undian yang dibagikan secara acak."
		},
		pinjol: {
			min: 10,
			max: 100,
			desc: "Diskusi umum seputar kebutuhan dana darurat atau layanan keuangan digital.",
			learn: "Diskusi mengenai keuangan digital sebaiknya dilakukan dengan tetap menjaga batasan privasi data pribadi.",
			act: "Gunakan lembaga keuangan yang memiliki izin resmi pengawasan."
		},
		investasi_bodong: {
			min: 10,
			max: 100,
			desc: "Percakapan umum yang membahas pembahasan keuntungan finansial instan.",
			learn: "Pembicaraan santai tentang cara cepat kaya harus selalu disikapi dengan logika dan kewaspadaan tinggi.",
			act: "Selalu kedepankan logika dan verifikasi legalitas sebelum berinvestasi."
		},
		investasi_asli: {
			min: 10,
			max: 100,
			desc: "Obrolan edukatif seputar perencanaan keuangan dan instrumen pasar modal.",
			learn: "Diskusi literasi keuangan membantu meningkatkan pemahaman dalam mengelola keuangan masa depan.",
			act: "Jadikan sebagai referensi belajar literasi keuangan yang sehat."
		},
		phising: {
			min: 10,
			max: 100,
			desc: "Pesan sapaan umum yang menyertakan tautan asing tidak dikenal.",
			learn: "Pesan sapaan ramah dari nomor tak dikenal yang tiba-tiba membagikan link sering kali berujung pada aksi kejahatan siber.",
			act: "Jangan pernah mengeklik tautan sembarangan dari pengirim yang tidak dikenal."
		},
		penting: {
			min: 10,
			max: 100,
			desc: "Pesan pemberitahuan informasi umum sehari-hari yang bersifat informatif.",
			learn: "Informasi umum sehari-hari membantu kelancaran aktivitas komunikasi dan koordinasi Anda.",
			act: "Tanggapi pesan sesuai dengan tingkat kebutuhan dan relevansinya."
		},
		netral: {
			min: 0,
			max: 100,
			desc: "Percakapan sehari-hari, teks obrolan normal, atau konten umum yang tidak mengandung indikasi penipuan atau ancaman.",
			learn: "Komunikasi normal sehari-hari tidak meminta data pribadi, kata sandi, ataupun tindakan transfer uang.",
			act: "Aman untuk dilanjutkan, namun tetap jaga kewaspadaan standar dalam menjaga kerahasiaan data pribadi."
		}
	}
};
