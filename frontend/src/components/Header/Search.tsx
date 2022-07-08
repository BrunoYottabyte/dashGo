import styles from './styles.module.scss';
import { RiSearchLine } from "react-icons/ri";

export function Search (){
    

    return(
            <label className={styles.label}>
                <input placeholder="Not working, must be implemented..." />
                <RiSearchLine fontSize={20} />
            </label>
    )
}