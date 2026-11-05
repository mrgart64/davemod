#/bin/sh
python3 -m tf2onnx.convert --tflite text_moderator.tflite --output text_moderator.onnx --opset 15
cp -f text_moderator.onnx ../public/model
cp -f moderation_meta.json ../public/model