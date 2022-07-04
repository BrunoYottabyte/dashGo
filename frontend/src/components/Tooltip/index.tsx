import { MutableRefObject, ReactNode } from 'react';
import styles from './styles.module.scss';

interface TooltipProps {
    children: ReactNode;
    ref: MutableRefObject<any>
}

export function Tooltip({children, ref}: TooltipProps){
    return(
        <main className={styles.tooltip} ref={ref} >
            <>
                 {children}
            </>
        </main>
    )
}

export function Element(){
    return (
        <div className={styles.tooltip_element}>

        </div>
    )
}