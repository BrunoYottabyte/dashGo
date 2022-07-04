import {Text} from '@chakra-ui/react'
import { useTheme } from '../../contexts/ThemeContext';

import styles from './styles.module.scss';

export function Logo(){
     const {toggleTheme} = useTheme()
    return(
          <div className={styles.logo} id="logo"
               onClick={() => {
               
                    toggleTheme();
                }
               }
          >
               <img src="/logo.png" alt="Logo Geogas" />
          </div>
    )
}