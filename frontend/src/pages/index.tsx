import { Flex, FormLabel, FormControl, Button, Stack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../contexts/AuthContext';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { withSSRGuest } from '../utils/withSSRGuest';


type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email(),
  password: yup.string().required("Senha obrigatória")
})

export default function SignIn() {
  const {signIn} = useAuth()
  const { formState, handleSubmit, register } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState;
  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    
      await signIn({
        email: values.email,
        password: values.password
      })
     
 
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >

      <Flex
        as="form"
        width="100%"
        maxWidth="360px"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            id='email'
            name='email'
            label='E-mail'
            {...register('email')}
            error={errors.email}
          />
          <Input
            id='password'
            type="password"
            name='password'
            error={errors.password}
            label='Senha'
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest( async(ctx) => {
  return {
    props: {}
  }
})
