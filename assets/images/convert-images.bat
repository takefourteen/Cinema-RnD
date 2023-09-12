@echo off
mkdir webp
for %%F in (*.jpg) do (
  ffmpeg -i "%%F" "webp\%%~nF.webp"
)
