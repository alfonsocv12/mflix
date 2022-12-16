import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks"
import { RatingComponent } from "../../components/movie/movie";
import { Movie, selectMovieSelected } from "../../features/movies/movieSlide"

function MovieDetail() {
    const movieSelected: Movie | null = useAppSelector(selectMovieSelected);
    const navigate = useNavigate();

    useEffect(() => {
        if (!movieSelected) {
            navigate('/');
        }
    });

    return (
        <Box mt="1rem" mx="1rem" width="100%">
            <Text fontSize="2xl" >{movieSelected!['title']}</Text>
            <Card minWidth="100%">
                <CardBody>
                    <Flex justifyContent="space-between">
                        <Box width='200px' height='400px' overflow="hidden">
                            <Flex height="450px" width="210px">
                                <Image src={movieSelected!.poster} alt={movieSelected!.title}
                                    fallbackSrc="poster-placeholder.png" />
                            </Flex>
                        </Box>
                        <Flex mx="1rem" direction="column">
                            {RatingComponent(movieSelected!)}
                            <Flex mt="1rem">
                                {movieSelected!.languages.map((langueage) => {
                                    return (
                                        <Box bg="black" padding="0.5rem"
                                            borderRadius="3xl">
                                            <Text>
                                                {langueage}
                                            </Text>
                                        </Box>
                                    )
                                })}
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Text>
                            {movieSelected!.plot}
                        </Text>
                    </Flex>
                </CardBody>
            </Card>
        </Box>
    )
}
export default MovieDetail