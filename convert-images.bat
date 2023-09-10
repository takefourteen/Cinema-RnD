@echo off
mkdir public\images\webp  # Create a directory for WebP images

for %%F in (./assets/images/streaming-services/*.png) do (
  set "filename=%%~nF"
  ffmpeg -i "%%F" "assets\images\webp\!filename!.webp"
)

echo Conversion completed.
