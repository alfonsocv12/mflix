import { Box } from "@chakra-ui/react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks"
import { selectMovieSelected } from "../../features/movies/movieSlide"

function MovieDetail() {
    const movieSelected = useAppSelector(selectMovieSelected);
    const navigate = useNavigate();

    useEffect(() => {
        if (!movieSelected) {
            navigate('/');

        }
    });

    return (
        <Box>
            'Detail'
        </Box>
    )
}
export default MovieDetail