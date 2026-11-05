import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import customtkinter as ctk

# Setup Tema CustomTkinter
ctk.set_appearance_mode("System")
ctk.set_default_color_theme("blue")

# ==========================================
# 1. LOAD MODEL & METADATA
# ==========================================
print("Loading model and metadata...")
with open("moderation_meta.json", "r", encoding="utf-8") as f:
    meta = json.load(f)

categories = meta["categories"]
inv_label_map = {idx: cat for idx, cat in enumerate(categories)}
max_len = meta["max_len"]
vocab_size = meta["vocab_size"]
oov_token = meta["oov_token"]

# Rekonstruksi Tokenizer
tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_token, lower=True)
tokenizer.word_index = meta["word_index"]

# Load TFLite Interpreter
interpreter = tf.lite.Interpreter(model_path="text_moderator.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def moderate_text(text):
    if not text.strip():
        return None, 0.0
    
    # Preprocessing teks input
    seq = tokenizer.texts_to_sequences([text])
    padded_seq = pad_sequences(seq, maxlen=max_len, padding='post', truncating='post')
    
    input_data = np.array(padded_seq, dtype=np.float32)
    # PERBAIKAN: Duplikasi baris dari shape (1, max_len) menjadi (8, max_len)
    if input_data.shape[0] != 8 and False:
        input_data = np.repeat(input_data, 8, axis=0)
    
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    
    probabilities = interpreter.get_tensor(output_details[0]['index'])[0]
    predicted_class_id = np.argmax(probabilities)
    confidence = probabilities[predicted_class_id] * 100
    predicted_label = inv_label_map[predicted_class_id]
    
    return predicted_label, confidence


# ==========================================
# 2. MEMBUAT KELAS APLIKASI (UI)
# ==========================================
class ModerationApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("DaveMod - AI Text Moderator")
        self.geometry("600x480")
        self.minsize(500, 400)

        # Layout Utama (Grid)
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(2, weight=1)

        # Judul Aplikasi
        self.title_label = ctk.CTkLabel(
            self, text="AI Text Moderation System", 
            font=ctk.CTkFont(size=20, weight="bold")
        )
        self.title_label.grid(row=0, column=0, padx=20, pady=(20, 10), sticky="w")

        # Kotak Input Teks
        self.input_textbox = ctk.CTkTextbox(self, height=120, font=ctk.CTkFont(size=14))
        self.input_textbox.grid(row=1, column=0, padx=20, pady=10, sticky="nsew")
        self.input_textbox.insert("0.0", "Ketik atau tempel teks di sini untuk dianalisis...")
        
        # Event binding untuk analisis real-time
        self.input_textbox.bind("<KeyRelease>", self.on_text_change)
        
        # PERBAIKAN: Menambahkan shortcut Ctrl + A untuk Select All
        self.input_textbox.bind("<Control-a>", self.select_all)
        self.input_textbox.bind("<Control-A>", self.select_all)

        # Frame Hasil Analisis
        self.result_frame = ctk.CTkFrame(self)
        self.result_frame.grid(row=2, column=0, padx=20, pady=(10, 20), sticky="nsew")
        self.result_frame.grid_columnconfigure(0, weight=1)
        self.result_frame.grid_rowconfigure(1, weight=1)

        self.result_title = ctk.CTkLabel(
            self.result_frame, text="Hasil Analisis *Real-time*", 
            font=ctk.CTkFont(size=13, weight="bold")
        )
        self.result_title.grid(row=0, column=0, padx=15, pady=(15, 5), sticky="w")

        # Label Status / Kategori Prediksi
        self.prediction_label = ctk.CTkLabel(
            self.result_frame, text="[ MENUNGGU INPUT ]", 
            font=ctk.CTkFont(size=18, weight="bold")
        )
        self.prediction_label.grid(row=1, column=0, padx=15, pady=5, sticky="w")

        # Label Detail Confidence / Probabilitas
        self.confidence_label = ctk.CTkLabel(
            self.result_frame, text="Confidence: 0.00%", 
            font=ctk.CTkFont(size=14)
        )
        self.confidence_label.grid(row=2, column=0, padx=15, pady=(0, 15), sticky="w")

    def select_all(self, event):
        # Fungsi untuk menyorot seluruh teks di dalam textbox saat Ctrl + A ditekan
        self.input_textbox.tag_add("sel", "1.0", "end-1c")
        return "break"

    def on_text_change(self, event=None):
        text = self.input_textbox.get("0.0", "end").strip()
        
        if not text:
            self.prediction_label.configure(text="[ MENUNGGU INPUT ]", text_color=("gray10", "gray90"))
            self.confidence_label.configure(text="Confidence: 0.00%")
            return

        label, confidence = moderate_text(text)
        
        label_upper = label.upper()
        self.prediction_label.configure(text=f"[{label_upper}]")
        self.confidence_label.configure(text=f"Confidence: {confidence:.2f}%")

        if any(bad_word in label.lower() for bad_word in ["spam", "scam", "judol", "gimbal"]):
            self.prediction_label.configure(text_color="#E74C3C") 
        else:
            self.prediction_label.configure(text_color="#2ECC71") 


if __name__ == "__main__":
    app = ModerationApp()
    app.mainloop()
