interface EpisodeCrew {
    job: string;
    department: string;
    credit_id: string;
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
  }
  
  interface EpisodeGuestStar {
    character: string;
    credit_id: string;
    order: number;
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
  }
  
  interface EpisodeData {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
    crew: EpisodeCrew[];
    guest_stars: EpisodeGuestStar[];
  }
  
  interface SeasonData {
    _id: string;
    air_date: string;
    episodes: EpisodeData[];
    name: string;
    overview: string;
    id: number;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }
  