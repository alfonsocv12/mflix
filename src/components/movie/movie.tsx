import { Card, CardBody, Flex, Box, Image, Text, Center, useColorModeValue } from '@chakra-ui/react';
import { Movie, selectMovieSelected, setMovieSelected } from '../../features/movies/movieSlide';
import { StarIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RottenComponent = (raterType: 'viewer' | 'critic', rating: number) => {
    
    const image = raterType == 'viewer'
        ? rating >= 3.5 ? 'good.svg' : 'bad.svg'
        : rating >= 6.0 ? 'good.svg' : 'bad.svg'
    return (
        <Box mx="0.2rem">
            <Box width="25px" height="25px">
                <Image src={`rottenTomatoes/${raterType}/${image}`} />
            </Box>
            <Text>{rating}</Text>
        </Box>
    )
}


export const RatingComponent = (movie: Movie) => {
    const tomatoViewerRatign: number | null = (movie.tomatoes && movie.tomatoes.viewer)
        ? movie.tomatoes.viewer.rating : null
    const tomatoCriticRating: number | null  = (movie.tomatoes && movie.tomatoes.critic)
        ? movie.tomatoes.critic.rating : null
    const imdbRating: number | null = (movie.imdb)
        ? movie.imdb.rating : null

    return (
        <Flex>
            {tomatoViewerRatign
                ? RottenComponent('viewer', tomatoViewerRatign) : null}
            {tomatoCriticRating
                ? RottenComponent('critic', tomatoCriticRating) : null} 
            {imdbRating ? (
                <Box mx="0.2rem">
                    <Box width="25px" height="25px">
                        <StarIcon boxSize={25} color="gold"/>
                    </Box> 
                    <Text>{imdbRating}</Text>
                </Box>
            ) : null}
        </Flex>
    )
}

function MovieComponent({ movie }: {movie: Movie}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Card height="500px" width="300px" mx="0.2rem"
            overflow="hidden"
            onClick={() => {
                dispatch(setMovieSelected(movie));
                navigate('/detail');
            }}>
            <Flex height="600px" width="390px">
                <Image src={movie.poster} alt={movie['title']}
                    fallbackSrc="poster-placeholder.png"/>
            </Flex>
            <Flex position="absolute" width="100%" height="100%"
                alignItems="end">
                <Flex
                    justifyContent="end"
                    bg="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))"
                    width="100%"
                    height="50%"
                    padding="1rem"
                    flexDirection="column">
                    <Text fontWeight="bold">{movie['title']}</Text>
                    <Text>{movie['languages'].join(', ')}</Text>
                    {RatingComponent(movie)}
                    {/* {JSON.stringify(movie)} */}
                </Flex>
            </Flex>
        </Card>
    )
}

export default MovieComponent