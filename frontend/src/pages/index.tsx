import { Alert, Spinner, Tooltip } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';
import {FaUserAlt} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import {MdEmail } from 'react-icons/md'
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Errors } from '../components/Form/Errors';
import { EmailVerification } from '../components/LoginMethods/EmailVerification';
import { Toast } from '../components/Toast';
import { useToast } from '../contexts/ToastContext';

type SignInFormData = {
  email: string;
  password: string;
}

type SignUpFormData = {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email('Digite um email válido.'),
  password: yup.string().required("Senha obrigatória").min(6, 'A senha precisa ter mais que 6 caracteres.')
})

const signUpFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email('Digite um email válido.'),
  password: yup.string().required("Senha obrigatória").min(6, 'A senha precisa ter mais que 6 caracteres.'),
  username: yup.string().required("Username obrigatório"),
  fullname: yup.string().required("Fullname é obrigatório")
})

export default function SignIn() {
  const {showToast} = useToast();
  const {list} = useToast()
  const { signIn, signUp, showVerifyEmail } = useAuth()
  const { formState, handleSubmit, register } = useForm(
    {
      resolver: yupResolver(signInFormSchema),
    },
  );

  const { formState: formStateUp, handleSubmit: handleSubmitUp , register: registerUp } = useForm(
    {
      resolver: yupResolver(signUpFormSchema),
    },
  );

  let { errors } = formState;
  let { errors: errorsUp } = formStateUp;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {

    try{
      await signIn({
        email: values.email,
        password: values.password
      })
      showToast('success', 'Autenticação realizada :)', 'Estamos te redirecionando');
    }catch(err){
      showToast('danger', 'Falha na autenticação', 'Email e/ou senha incorreta.');
    }
  
  }

  const handleSignUp: SubmitHandler<SignUpFormData> = async({email, fullname, password, username}, event) => {
    try{
      await signUp({
        email,
        password,
        fullname,
        username
      })
    }catch(err){
      showToast('danger', 'Error', err.response?.data.message);
    }
  }




  const signIn_ref = useRef(null);
  const signUp_ref = useRef(null);
  const container_ref = useRef(null);

  const toggleForm = () => {

    signIn_ref.current?.classList.toggle(styles.signIn);
    signUp_ref.current?.classList.toggle(styles.signIn);
    container_ref.current?.classList.toggle(styles.signIn)

    signIn_ref.current?.classList.toggle(styles.signUp);
    signUp_ref.current?.classList.toggle(styles.signUp);
    container_ref.current?.classList.toggle(styles.signUp)
    document.body.querySelectorAll('input').forEach(input => input.value = '');
  }

  useEffect(() => {
    setTimeout(() => {
      signIn_ref.current?.classList.add(styles.signIn);
      signUp_ref.current?.classList.toggle(styles.signIn);
      container_ref.current?.classList.add(styles.signIn)
    }, 500)
  }, [])
  return (

    <main className={styles.container} ref={container_ref}>
      <Head>
        <title>Geogas System | Login</title>
      </Head>
        {/* verification */}
          {showVerifyEmail && <EmailVerification />}
        {/* end verification */}
        {/* Toast */}
          <Toast list={list} position="top-right" />
        {/* End toast */}
        <div className={styles.row}>
          <form className={styles.interface_signUp} ref={signUp_ref} onSubmit={handleSubmitUp(handleSignUp)} >
            <div className={styles.content_signUp}>
   
                <label>
                  <FaUserAlt />
                  <input type="text" placeholder='Username' {...registerUp('username')} />
                </label>
                <Errors text={errorsUp.username?.message}/>
                <label>
                  <FaUserAlt />
                  <input type="text" placeholder='Full name' {...registerUp('fullname')} />
                </label>
                <Errors text={errorsUp.fullname?.message}/>
                <label>
                  <MdEmail />
                  <input type="email" placeholder='Email' {...registerUp('email')} />
                </label>
                <Errors text={errorsUp.email?.message}/>
                <label>
                  <RiLockPasswordFill />
                  <input type="password" placeholder='Password' {...registerUp('password')} />
                </label>
                <Errors text={errorsUp.password?.message}/>
                <button type="submit">
                  {!formStateUp.isSubmitting && 'Sign up'}
                  {formStateUp.isSubmitting && (<Spinner />)}
                </button>

                <div className={styles.container_infos_adicionais}>
                    <p className={styles.text_secondary}>
                        Already have an account? <span onClick={toggleForm} >Sign in here</span>
                    </p>
                </div>
                
              </div>
          </form>
          <form className={`${styles.interface_signIn}`} ref={signIn_ref} onSubmit={handleSubmit(handleSignIn)}>
              <div className={styles.content_signIn}>
                <label>
                  <FaUserAlt />
                  <input type="email" placeholder='Email'
                  {...register('email')}
                  />
                </label>
                <Errors text={errors.email?.message}/>
                <label>
                  <RiLockPasswordFill />
                  <input type="password" placeholder='Password'  {...register('password')} />
                </label>
                <Errors text={errors.password?.message}/>
                <button type='submit'>
                  {!formState.isSubmitting && 'Sign in'}
                  {formState.isSubmitting && (<Spinner />)}
                </button>

                <div className={styles.container_infos_adicionais}>
                    <p className={styles.text_primary}>Forgot password?</p>

                    <p className={styles.text_secondary}>
                        Don't have an account? <span onClick={toggleForm}>Sign up here</span>
                    </p>
                </div>
                
              </div>
          </form>
        </div>

        <div className={styles.content_forms}>
          <div className={styles.content_signIn}>
            <div className={styles.text}>
              <h1>Welcome back!</h1>
              <p>General analysis and reporting of the Geogas training system.</p>
            </div>
            <div className={styles.img}>
              <img src="/login/trabalhadores.png" alt="capa_login" />
            </div>
          </div>

          <div className={styles.content_signUp}>
            <div className={styles.img}>
              <img src="/logolg.png" alt="capa_login" />
            </div>
            <div className={styles.text}>
              <h1>Create an account</h1>
              <p>Here we manage all training.</p>
            </div>
           
          </div>
        </div>

   
    </main>
  )
}

export const getServerSideProps = withSSRGuest( async(ctx) => {
  return {
    props: {}
  }
})
