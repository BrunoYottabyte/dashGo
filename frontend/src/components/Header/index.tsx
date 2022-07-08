
import { useEffect, useRef, useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { signOut } from '../../contexts/AuthContext';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { Search } from './Search';

// css
import styles from './styles.module.scss';


export function Header() {
     const box_options = useRef(null);
     const toggle_ref = useRef(null);
     const [boxLogout, setBoxLogout] = useState(false);
     const [isWideVersion, setIsWideVersion] = useState(false);
     const { breakpoints } = useTheme()
     const { onOpen } = useSidebarDrawer();

     useEffect(() => {
          const breakPoint = !breakpoints?.sm && !breakpoints?.md;
          setIsWideVersion(breakPoint);
     })

     const handleClickOptions = (toggle_ref, box_options) => {

          document.addEventListener("click", (e) => {
               //user click toggle
               if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
                    box_options.current.classList.add(styles.active);
               } else {
                    //user click outside toggle and content
                    if (box_options.current && !box_options.current.contains(e.target)) {
                         box_options.current.classList.remove(styles.active);
                    }
               }
          });
     }

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

               <div className={styles.group_notifications_profile} >
                    <NotificationsNav />
                    <div onClick={() => handleClickOptions(toggle_ref, box_options)} ref={toggle_ref}>
                         <Profile showProfileData={isWideVersion} />

                         <div className={styles.box_floating} ref={box_options} >
                              <div>
                                   My Profile
                              </div>
                              <div>
                                   Administrator
                              </div>
                              <div onClick={() => setBoxLogout(!boxLogout)}>
                                   Logout
                              </div>
                         </div>
                    </div>
               </div>

               {boxLogout && <ContainerLogout fn={setBoxLogout} state={boxLogout} />}
          </header>
     )
}

type ContainerLogoutProps = {
     fn: (state: boolean) => void;
     state: boolean
}

const ContainerLogout = ({ fn, state }: ContainerLogoutProps) => {
     return (
          <div className={styles.overlay}>
               <div className={styles.container}>
                    <h1>
                         Do you really want to leave?</h1>

                    <div className={styles.container_buttons}>
                         <button onClick={() => {
                              signOut();
                              fn(!state)
                         }}>Continuar</button>
                         <button onClick={() => fn(!state)}>Voltar</button>
                    </div>
               </div>
          </div>
     )
}
