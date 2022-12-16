import { Box, Flex, FlexProps, Link, Text, useColorModeValue } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { Link as ReactRouter } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { drawerUseDisclosure } from "../../features/drawer/drawer";
import { selectGenres } from "../../features/movies/movieSlide";


interface NavItemProps extends FlexProps {
    children: string;
}
const NavItem = ({ children, ...rest }: NavItemProps) => {
    return (
        <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}
            as={ReactRouter} to={`/?q=${children}`}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                <Text fontSize="1xl">
                    {children}
                </Text>
            </Flex>
        </Link>
    );
};

export const DrawerSidebarComponent = () => {
    const genres = useAppSelector(selectGenres);
    const dispatch = useDispatch();
    const drawer = useAppSelector(drawerUseDisclosure);

    return (
        <Flex overflowY="scroll"
            width="100%">
            <Box width="100%">
                <Box width="100%" onClick={() => dispatch(drawer.onClose())}>
                    <Link style={{ textDecoration: 'none' }}
                        _focus={{ boxShadow: 'none' }}
                        width="100%"
                        as={ReactRouter}
                        to={`/`}>
                        <Flex
                            width="100%"
                            justifyContent="center"
                            align="center"
                            p="4"
                            mx="4"
                            borderRadius="lg"
                            role="group"
                            cursor="pointer"
                            _hover={{
                                bg: 'cyan.400',
                                color: 'white',
                            }}>
                            <Text fontSize="1xl">
                                No filter
                            </Text>
                        </Flex>
                    </Link>
                </Box>
                {genres.map((genre) => (
                    <Box width="100%" onClick={() => dispatch(drawer.onClose())}>
                        <NavItem key={genre}
                            justifyContent="center">
                            {genre}
                        </NavItem>
                    </Box>
                ))}
            </Box>
        </Flex>
    )
}


function SideBar() {
    const genres = useAppSelector(selectGenres);

    return (
        <Flex w={{ base: 0, md: 60 }}>
            <Flex overflowY="scroll"
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}>
                <Box >
                    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}
                        as={ReactRouter} to={`/`}>
                        <Flex
                            align="center"
                            p="4"
                            mx="4"
                            borderRadius="lg"
                            role="group"
                            cursor="pointer"
                            _hover={{
                                bg: 'cyan.400',
                                color: 'white',
                            }}>
                            <Text fontSize="1xl">
                                No filter
                            </Text>
                        </Flex>
                    </Link>
                    {genres.map((genre) => (
                        <NavItem key={genre}>
                            {genre}
                        </NavItem>
                    ))}
                </Box>
            </Flex>            
        </Flex>
    )
}
export default SideBar;