import {Text} from '@chakra-ui/react'


import styles from './styles.module.scss';

export function Logo(){

    return(
          <div className={styles.logo} id="logo"
               
          >
               <img src="/logo.png" alt="Logo Geogas" />
          </div>
    )
}