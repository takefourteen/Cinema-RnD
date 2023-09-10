@echo off
mkdir webp
for %%F in (*.png) do (
  ffmpeg -i "%%F" "webp\%%~nF.webp"
)
