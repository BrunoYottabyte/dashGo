import { Icon, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { Search } from './Search';

// css
import styles from './styles.module.scss';


export function Header() {
     const [isWideVersion, setIsWideVersion] = useState(false);
     const {breakpoints} = useTheme()

     const { onOpen } = useSidebarDrawer();


     useEffect(() => {
         const breakPoint = !breakpoints?.sm && !breakpoints?.md;
         setIsWideVersion(breakPoint);
     })

     return (
          <header className={styles.container}>
               {!isWideVersion && (
                   <div
                     className={styles.icon_button}
                     onClick={onOpen}
                   >
                         <RiMenuLine
                         fontSize={24}
                         color="var(--color-50)"
                         />
                   </div>
               )}
               <Logo />
               {isWideVersion && <Search />}
               
               <div className={styles.group_notifications_profile}>
                    <NotificationsNav />
                    <Profile showProfileData={isWideVersion} />
               </div>
          </header>
     )
}