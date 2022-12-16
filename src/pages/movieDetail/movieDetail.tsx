import { Box, Card, CardBody, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react"
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

    const languageColor = useColorModeValue('white', 'red.900');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

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
                                        <Box bg={languageColor} padding="0.5rem"
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
                    <Flex mt="1rem" direction="column">
                        <Flex mb="0.5rem">
                            {movieSelected?.genres.map((genre) => {
                                return (
                                    <Box mx="0.2rem" border='1px' 
                                        borderColor={borderColor}
                                        padding="0.5rem"
                                        borderRadius="3xl">
                                        <Text>
                                            {genre}
                                        </Text>
                                    </Box>
                                )
                            })}
                        </Flex>
                        <Text>
                            {movieSelected?.plot}
                        </Text>
                        <Flex mt="1rem" direction="column">
                            {['Directors', 'Writers', 'Cast'].map((job: string) => {
                                return (
                                    <Flex borderBottom="1px" mt="0.2rem"
                                        borderBottomColor={borderColor}>
                                        <Text mr="1rem"mb="0.5rem" fontWeight="bold">{job}</Text>
                                        <Text>
                                            {(movieSelected![job.toLowerCase()] as string[]).map((person: string) => `${person}, `)}
                                        </Text>
                                    </Flex>
                                )
                            })}
                        </Flex>
                    </Flex>
                </CardBody>
            </Card>
        </Box>
    )
}
export default MovieDetail