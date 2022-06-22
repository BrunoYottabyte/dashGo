import { Flex, Icon, IconButton, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { Search } from './Search';
import { StyleConfig } from "@chakra-ui/theme-tools";


export function Header() {
     const { toggleColorMode, colorMode } = useColorMode()
     console.log(colorMode);
     const { onOpen } = useSidebarDrawer();

     const isWideVersion = useBreakpointValue({
          base: false,
          lg: true
     });

     return (
          <Flex
               as="header"
               w="100%"
               maxWidth={1480}
               h="20"
               mx="auto"
               mt="4"
               align="center"
               px="6"
          >
               {!isWideVersion && (
                    <IconButton
                         aria-label="Open navigation"
                         icon={<Icon as={RiMenuLine} />}
                         fontSize="24"
                         variant="unstyled"
                         onClick={onOpen}
                         mr="2"
                    />
               )}
               <Logo />
               {isWideVersion && <Search />}
               <Flex
                    align="center"
                    ml="auto"
                    onClick={toggleColorMode}
               >
                    <NotificationsNav />

                    <Profile showProfileData={isWideVersion} />
               </Flex>
          </Flex >
     )
}