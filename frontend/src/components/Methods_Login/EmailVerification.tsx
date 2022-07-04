import styles from './styles.module.scss';
import { TiWarning } from 'react-icons/ti';
import { AiFillCheckCircle } from 'react-icons/ai'
import { Errors } from '../Form/Errors';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';


export function EmailVerification() {
    const code_ref = useRef(null);
    const { verifiedEmail, verifyEmail } = useAuth()
    const [fullCode, setFullCode] = useState(false);
    const [code, setCode] = useState("");
 
    const countCode = () => {
        const numbers = Number(code_ref.current.value);
        const allow = code_ref.current.value.length === 9 && !!numbers;
        setFullCode(allow)
    }
    

    return (
        <section className={styles.container_verification}>
            <div className={styles.box_verification}>
                <h1>Email Verification</h1>

                <div className={styles.message_important}>
                    <TiWarning fontSize={30} color="#e07823" />
                    <p>You need to verify your email address to activate your account</p>
                </div>

                <div className={styles.message_footer_verification}>
                    <p>In order to verify your identify, we'll send you a code to your emai.</p>
                    <input type="text" value={code} maxLength={9} onChange={(e) => {
                        countCode();
                        setCode(e.target.value)
                    }} pattern="[0-9]+$" ref={code_ref}></input>
                    {/* <Errors text='Code invalid, try again.' /> */}
                    {!verifiedEmail 
                        ? 
                        (<button onClick={() => {verifyEmail({code})}} disabled={!fullCode}>
                            To check :)
                        </button>)
                         : 
                        (<AiFillCheckCircle fontSize={30} color="green" />)
                    }
                </div>
            </div>
        </section>
    )
}