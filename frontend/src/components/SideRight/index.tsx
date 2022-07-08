import { ReactNode, useEffect, useRef } from "react"
import styles from "./styles.module.scss";

interface SideRightProps {
    body?: ReactNode;
    head?: ReactNode;
}

export const SideRight = ({ body, head }: SideRightProps) => {

    const section_ref = useRef(null);

    const close = (section_ref) => {
        section_ref.current.classList.remove(styles.active);
    }
    useEffect(() => {
        section_ref.current.classList.add(styles.active);
    });
    
    return (
        <div className={styles.sideRight} ref={section_ref}>
            <div className={styles.head}>
                <h1>{head?.title}</h1>
                <span onClick={() => close(section_ref)}>{head?.close}</span>
            </div>
            <div className={styles.body}>{body && body()}</div>
        </div>
    )
}
