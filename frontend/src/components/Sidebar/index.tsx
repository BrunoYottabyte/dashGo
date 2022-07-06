import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { useTheme } from "../../contexts/ThemeContext";

import { SidebarNav } from "./SidebarNav";
import styles from './styles.module.scss';


export function Sidebar() {
    const [isDrawerSidebar, setIsDrawerSidebar] = useState(false);
    const {isOpen, onClose} = useSidebarDrawer()
    const {breakpoints} = useTheme()
        
      
        useEffect(() => {
            let viewport = breakpoints?.sm || breakpoints?.md
            setIsDrawerSidebar(viewport);
        }, [breakpoints])
 
        if(isDrawerSidebar){
            return(
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                    <DrawerOverlay >
                        <DrawerContent bg="var(--bg-main)" p="4">
                            <DrawerCloseButton mt="6" color="var(--color-50)"/>
                            <DrawerHeader color="var(--color-50)">Navegação</DrawerHeader>
                            <DrawerBody>
                                <SidebarNav />
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
            )
        }
    
            return (
                <div className={styles.box}>
                    <SidebarNav />
                </div>
            )    
        

}
