@echo off
setlocal enabledelayedexpansion

:: Directory containing the MP4 videos
set "input_dir=videos"

:: Output directory for compressed videos
set "output_dir=compressed_videos"

:: Create the output directory if it doesn't exist
if not exist "%output_dir%" mkdir "%output_dir%"

:: Loop through all MP4 files in the input directory
for %%F in ("*.mp4") do (
  set "input_file=%%F"

  :: Get the base filename without extension
  for %%A in (!input_file!) do set "base_name=%%~NA"

  :: Compressed output file path
  set "output_file=%output_dir%\!base_name!.mp4"

  :: Compress the video using FFmpeg
  @REM ffmpeg -i "!input_file!" -vf "scale=1280:-1" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "!output_file!"
  ffmpeg -i "!input_file!" -vcodec libx265 -crf 28 "!output_file!"

  echo Compressed !input_file! to !output_file!
)

endlocal
