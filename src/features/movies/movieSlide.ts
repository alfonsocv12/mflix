import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/internal"
import { RootState } from "../../app/store"

interface Ratings {
    viewer: Record<string, number>
    critic: Record<string, number>
    rating: number
}

export interface Movie {
    title: string
    genres: string[]
    poster: string
    languages: string[]
    tomatoes: Ratings
    imdb: Ratings
    plot: string
    directors: string[]
    writers: string[]
    cast: string[]
    [key: string]: string | number | Object[] | Ratings
}

export interface MovieState {
    value: Array<Movie>,
    genres: string[],
    moviesByGenrer: Record<string, Movie[]>,
    selected: Movie | null
}

const initialState: MovieState = {
    value: [], 
    genres: [],
    moviesByGenrer: {},
    selected: null
}

function _setMovieSelected(state: WritableDraft<MovieState>, action: PayloadAction<Movie>) {
    state.selected = action.payload
}

function _setMovies(state: WritableDraft<MovieState>, action: PayloadAction<Movie[]>) {
    state.value = action.payload;
}

function _setGenres(state: WritableDraft<MovieState>) {
    const genres: Set<string> = new Set();
    const movies: Movie[] = state.value;

    for (let movie of movies) {
        for (let genre of movie.genres) {
            if (!genres.has(genre)) {
                genres.add(genre);
            }
            
            _addMovieToGenrer(state, { payload: movie, type: genre })
        }
    }

    state.genres = Array.from(genres);
}

function _addMovieToGenrer(state: WritableDraft<MovieState>, action: PayloadAction<Movie>) {
    const moviesByGenrer = JSON.parse(JSON.stringify(state.moviesByGenrer))

    const movie = action.payload;
    const genre = action.type;

    if (genre in moviesByGenrer) {
        moviesByGenrer[genre].push(movie);
    } else {
        moviesByGenrer[genre] = [movie];
    }
    
    state.moviesByGenrer = moviesByGenrer;
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovies: (state, action) => _setMovies(state, action),
        setGenres: (state) => _setGenres(state),
        addMovieToGenrer: (state, action: PayloadAction<Movie>) => _addMovieToGenrer(state, action),
        setMovieSelected: (state, action: PayloadAction<Movie>) => _setMovieSelected(state, action)
    }
})

export const { setMovies, setGenres, setMovieSelected } = movieSlice.actions;

export const selectMovie = (state: RootState) => state.movies.value;

export const selectGenres = (state: RootState) => state.movies.genres;

export const selectMovieGenrer = (state: RootState) => state.movies.moviesByGenrer;

export const selectMovieSelected = (state: RootState) => state.movies.selected;

export default movieSlice.reducer;