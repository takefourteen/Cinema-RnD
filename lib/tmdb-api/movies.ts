import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/* eg of movie query params: 

certification
string
use in conjunction with region

certification.gte
string
use in conjunction with region

certification.lte
string
use in conjunction with region

certification_country
string
use in conjunction with the certification, certification.gte and certification.lte filters

include_adult
boolean

false
include_video
boolean

false
language
string
en-US
page
int32
1
primary_release_year
int32
primary_release_date.gte
date
primary_release_date.lte
date
region
string
release_date.gte
date
release_date.lte
date
sort_by
string
Default: popularity.desc


popularity.desc
vote_average.gte
float
vote_average.lte
float
vote_count.gte
float
vote_count.lte
float
watch_region
string
with_cast
string
can be a comma (AND) or pipe (OR) separated query

with_companies
string
can be a comma (AND) or pipe (OR) separated query

with_crew
string
can be a comma (AND) or pipe (OR) separated query

with_genres
string
can be a comma (AND) or pipe (OR) separated query

with_keywords
string
can be a comma (AND) or pipe (OR) separated query

with_origin_country
string
with_original_language
string
with_people
string
can be a comma (AND) or pipe (OR) separated query

with_release_type
int32
can be a comma (AND) or pipe (OR) separated query, can be used in conjunction with region

with_runtime.gte
int32
with_runtime.lte
int32
with_watch_monetization_types
string
use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query

with_watch_providers
string
use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query

without_companies
string
without_genres
string
without_keywords
string
without_watch_providers
string
year
int32


*/

interface MovieQueryParams {
  region?: string;
  sort_by?: "popularity.desc" | "vote_average.desc" | "vote_count.desc";
  with_original_language?: string;
  with_watch_providers?: string;
  year?: number;
}

export async function getMovies(page: number, queryParams?: MovieQueryParams) {
  const defaultParameters = {
    language: "en-US",
    page: 1,
    include_adult: false,
    include_video: false,
  };

  const parameters = { ...defaultParameters, ...queryParams };

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        page,
        parameters,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
