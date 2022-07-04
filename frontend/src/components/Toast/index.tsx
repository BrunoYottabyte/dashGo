

import { useCallback,useEffect,useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import styles from './styles.module.scss';


type ListSchema = {
    id: number;
    title: string;
    description: string;
    backgroundColor: string;
}

interface ToastProps {
    list: ListSchema[];
    position: string
}

export function Toast({list, position}: ToastProps){
    const {deleteToast} = useToast()

    return(
        <>
            {/* <button onClick={() => showToast('success')}>Success</button>
            <button onClick={() => showToast('info')}>iNFO</button> */}
            <div className={`${styles.container} ${styles[position]}`} >
                {list?.map((toast, i) => {
                    
                    return(
                        
                            <div key={i} id={String(toast.id)}  style={{backgroundColor: toast?.backgroundColor}} 
                               
                                className={`${styles.notification} ${styles.toast} ${styles[position]}`}
                            >
                                <button onClick={() => {
                                    deleteToast(toast.id)
                                }}>X</button>
                                <div>
                                    <p className={styles.title}>{toast?.title}</p>
                                    <p className={styles.description}>{toast?.description}</p>
                                </div>
                            </div>
                        
                    )
                })}
            </div>
        </>
    )
}