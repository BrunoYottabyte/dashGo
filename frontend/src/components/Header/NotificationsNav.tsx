import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";
import { WiMoonAltNew } from "react-icons/wi";
import { useTheme } from "../../contexts/ThemeContext";
// css
import styles from './styles.module.scss';

export function NotificationsNav(){
    const {toggleTheme} = useTheme()
    return(
        <div className={styles.notificationsNav} onClick={() => {
               
            toggleTheme();
        }
       }>
            <div className={`${styles.container_icon} toogle_theme`}>
                <WiMoonAltNew color="#D69E2E"  fontSize={20} className={`${styles.icon} icon_toggle`}/>
            </div>
        </div>
    )
}