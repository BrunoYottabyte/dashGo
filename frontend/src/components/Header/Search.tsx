import styles from './styles.module.scss';
import { RiSearchLine } from "react-icons/ri";

export function Search (){
    

    return(
            <label className={styles.label}>
                <input placeholder="Buscar na plataforma" />
                <RiSearchLine fontSize={20} />
            </label>
    )
}