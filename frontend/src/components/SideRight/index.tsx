import { ReactNode, useEffect, useRef, useState } from "react"
import styles from "./styles.module.scss";

interface SideRightProps {
    body?: ReactNode;
    head?: ReactNode;
    state: boolean;
    setState: (state: boolean) => void;
    buttons: ReactNode;
}

export const SideRight = ({ body, head, state, setState, messageBox }: SideRightProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

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
                <span onClick={() => {
                    close(section_ref)
                    setState(!state);
                }}>{head?.close}</span>
            </div>
            <div className={styles.body}>{body && body()}</div>
        </div>
        
    )
}

