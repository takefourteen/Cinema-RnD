export async function getVideoPlayerUrl(
  videoId: string,
  isTmdb: number | boolean = 1, // 1 for tmdb, 0 for imdb, default is tmdb
  season: number,
  episode: number,
): Promise<string | null> {
  const playerSettings = {
    playerFont: "Poppins",
    playerBgColor: "#FFFFFF",
    playerFontColor: "#000000",
    playerPrimaryColor: "#e50914ff",
    playerSecondaryColor: "#002be7ff",
    playerLoader: 1,
    preferredServer: 1,
    playerSourcesToggleType: 1,
  };

  //   const requestUrl = `https://getsuperembed.link/?video_id=${videoId}&tmdb=${isTmdb}&season=${season}&episode=${episode}&player_font=${playerFont}&player_bg_color=${playerBgColor}&player_font_color=${playerFontColor}&player_primary_color=${playerPrimaryColor}&player_secondary_color=${playerSecondaryColor}&player_loader=${playerLoader}&preferred_server=${preferredServer}&player_sources_toggle_type=${playerSourcesToggleType}`;

  const requestUrl = `https://getsuperembed.link/?video_id=${videoId}&tmdb=${isTmdb}&season=${season}&episode=${episode}&player_font=${playerSettings.playerFont}&player_bg_color=${playerSettings.playerBgColor}&player_font_color=${playerSettings.playerFontColor}&player_primary_color=${playerSettings.playerPrimaryColor}&player_secondary_color=${playerSettings.playerSecondaryColor}&player_loader=${playerSettings.playerLoader}&preferred_server=${playerSettings.preferredServer}&player_sources_toggle_type=${playerSettings.playerSourcesToggleType}`;

  try {
    const response = await fetch(requestUrl);
    const playerUrl = await response.text();
    if (playerUrl.startsWith("https://")) {
      // console.log(`videoId: ${videoId}, playerUrl: ${playerUrl}`);

      return playerUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
