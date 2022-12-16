import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Drawer, DrawerContent, Flex, IconButton, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { drawerUseDisclosure } from "../../features/drawer/drawer";
import SideBar, { DrawerSidebarComponent } from "../sidebar/sidebar";

function Menu(isOpen: boolean, onOpen: Function, onClose: Function) {

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderBottom="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            width="100%"
            position="fixed"
            zIndex="1">
            <Flex
                alignItems="center"
                width="50%"
                justifyContent={{ base: "space-between", md: "start" }}
                mx="1rem"
                my="0.5rem">
                <IconButton
                    variant="outline"
                    onClick={() => isOpen ? onClose() : onOpen()}
                    aria-label="open menu"
                    icon={<HamburgerIcon />}
                />
                <Text fontSize="3xl" fontFamily="BebasNeue" fontWeight="bold" mx="0.5rem">
                    MFLIX
                </Text>
            </Flex>
        </Box>
    )
}

function Navbar({ children }: { children: ReactNode}) {
    const sidebar = useDisclosure();
    const dispatch = useDispatch();
    const drawer = useAppSelector(drawerUseDisclosure);    

    return (
        <Flex minH="100vh">
            <Box display={{base: 'none', md: 'block'}}>
                {Menu(sidebar.isOpen, sidebar.onOpen, sidebar.onClose)}
            </Box>
            <Box display={{ base: 'block', md: 'none' }}>
                {Menu(
                    drawer.isOpen, 
                    () => dispatch(drawer.onOpen()), 
                    () => dispatch(drawer.onClose())
                )}
            </Box>

            <Drawer
                autoFocus={false}
                isOpen={drawer.isOpen}
                placement="left"
                onClose={() => dispatch(drawer.onClose())}
                returnFocusOnClose={false}
                onOverlayClick={() => dispatch(drawer.onClose())}
                size="full">
                <DrawerContent>
                    {Menu(
                        drawer.isOpen,
                        () => dispatch(drawer.onOpen()),
                        () => dispatch(drawer.onClose())
                    )}
                    <Flex pt="3.4rem"
                        height="100%"
                        width="100%"
                        overflow="hidden"
                        position="absolute">
                        <DrawerSidebarComponent/>
                    </Flex>
                </DrawerContent>
            </Drawer>
            <Flex 
                pt="3.4rem"
                height="100%"
                width="100%"
                overflow="hidden"
                position="absolute">
                { sidebar.isOpen  ? <SideBar />: null }
                {children}
            </Flex>
        </Flex>
    )
}
export default Navbar