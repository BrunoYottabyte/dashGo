import { Flex, FormLabel, FormControl, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input';
import { useRouter } from 'next/router';


type signInFormData = {
  email: string;
  passoword: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(4,'A senha precisa ter no min 4 caracteres'),
})

export default function SignIn() {
  const router = useRouter();
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInFormSchema)
  });
    const {errors} = formState;
    const handleSignIn: SubmitHandler<signInFormData> = async (values, event) => {
      
      await new Promise(resolve => setTimeout(() => {
       router.push('/dashboard');
      }, 1500))
      
      console.log(values);

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
            label='Senha'
            {...register('password')}
            error={errors.password}
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
