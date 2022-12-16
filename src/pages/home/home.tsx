import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MovieComponent from '../../components/movie/movie';
import { Movie, selectMovie, selectMovieGenrer, setGenres, setMovies } from '../../features/movies/movieSlide';

function getMovies(
    filter: string | null, _movies: Movie[], _moviesByGenrer: Record<string, Movie[]>) {
    const movies = (filter && filter in _moviesByGenrer)
        ? _moviesByGenrer[filter]
        : _movies
    return (
        <Flex alignItems="center">
            {
            movies.map(movie => {
                return (
                    <MovieComponent movie={movie} key={movie['title']}/>
                )
            })}
        </Flex>
    )
}

function Home() {
    const _movies = useAppSelector(selectMovie);
    const _moviesByGenrer = useAppSelector(selectMovieGenrer);

    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (_movies.length === 0) {
            fetch('movies.json').then(async resp => {
                dispatch(setMovies(await resp.json()));
                dispatch(setGenres());
            })
        }
    }, [dispatch, _movies]);

    return (
        <Flex overflow="scroll">
            <Flex height="100%" mx="1rem">
                {_movies
                    ? getMovies(searchParams.get('q'), _movies, _moviesByGenrer)
                    : "No Movies"}
            </Flex>
        </Flex>
    )
}

export default Home