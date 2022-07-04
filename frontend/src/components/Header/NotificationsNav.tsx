import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";
import { useTheme } from "../../contexts/ThemeContext";
// css
import styles from './styles.module.scss';

export function NotificationsNav(){
   
    return(
        <div className={styles.notificationsNav}>
            <RiNotificationLine  fontSize={20}/>
            <RiUserAddLine fontSize={20}/>
        </div>
    )
}