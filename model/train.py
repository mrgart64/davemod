import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import tflite2onnx

# 1. Load Dataset dari JSON
print("Loading dataset...")
with open("dataset.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

categories = list(raw_data.keys())
label_map = {cat: idx for idx, cat in enumerate(categories)}

sentences = []
labels = []

for cat, texts in raw_data.items():
    for text in texts:
        sentences.append(text)
        labels.append(label_map[cat])

# ==========================================
# TAMBAHKAN KODE INI UNTUK MENGACAK DATASET
# ==========================================
sentences = np.array(sentences)
labels = np.array(labels)

indices = np.arange(len(sentences))
np.random.shuffle(indices)

sentences = sentences[indices].tolist()
labels = labels[indices]
# ==========================================

# 2. Tokenisasi & Text Preprocessing
# VOCAB_SIZE = 2500
VOCAB_SIZE = 3500
MAX_LEN = 40
OOV_TOK = "<OOV>"

print(f"Total dataset: {len(sentences)} baris dari {len(categories)} kategori.")
tokenizer = Tokenizer(num_words=VOCAB_SIZE, oov_token=OOV_TOK, lower=True)
tokenizer.fit_on_texts(sentences)

# Simpan Metadata (Word Index & Kategori) agar bisa dipakai di predict.py
meta_data = {
    "word_index": tokenizer.word_index,
    "categories": categories,
    "max_len": MAX_LEN,
    "vocab_size": VOCAB_SIZE,
    "oov_token": OOV_TOK
}
with open("moderation_meta.json", "w", encoding="utf-8") as f:
    json.dump(meta_data, f, indent=2)

sequences = tokenizer.texts_to_sequences(sentences)
padded = pad_sequences(sequences, maxlen=MAX_LEN, padding='post', truncating='post')

# 3. Model Architecture
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(VOCAB_SIZE, 64, input_length=MAX_LEN),
    tf.keras.layers.GlobalAveragePooling1D(), 
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(len(categories), activation='softmax')
])

model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)

# 4. Training Model
print("Training model...")
model.fit(padded, labels, epochs=100, batch_size=None, verbose=1, shuffle=True)

# 5. Export ke TFLite dengan Optimasi
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()

with open("text_moderator.tflite", "wb") as f:
    f.write(tflite_model)

# tflite2onnx.convert("text_moderator.tflite", "text_moderator.onnx")

print("\n--- TRAINING SELESAI ---")
print("File tersimpan: 'dataset.json', 'moderation_meta.json', 'text_moderator.tflite'")
