import { Box, Flex, Heading, Button, Divider, VStack, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
     email: string;
     name: string;
     password: string;
     password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
     name: yup.string().required("Nome obrigatório"),
     email: yup.string().required("E-mail obrigatório").email(),
     password: yup.string().required("Senha obrigatória").min(6, 'No mínimo 6 caracteres'),
     password_confirmation: yup.string().oneOf([null, yup.ref('password')], "As senhas precisam ser iguais")
})

export default function CreateUser() {

     const router = useRouter();

     const createUser = useMutation( async(user: CreateUserFormData) => {
          const response = await api.post('users', {
               user: {
                    ...user,
                    created_at: new Date()
               }
          });

          return response.data.user
     }, {
          onSuccess: () => {
               queryClient.invalidateQueries('users');
          }
     })

     const { register, handleSubmit, formState } = useForm({
          resolver: yupResolver(createUserFormSchema)
     })
     const { errors } = formState;

     const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
          createUser.mutateAsync(values)
          router.push('/users')
     }

     return (
          <Box>
               <Head>
                    <title>dashgo | Create user</title>
               </Head>
               <Header />
               <Flex
                    w="100%"
                    my="6"
                    maxWidth={1480}
                    mx="auto"
                    px="6"
               >
                    <Sidebar />

                    <Box
                         as="form"
                         flex="1"
                         borderRadius="8"
                         bg="gray.800"
                         p={["4", "8"]}
                         onSubmit={handleSubmit(handleCreateUser)}
                    >
                         <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                         <Divider my="5" borderColor="gray.700" />

                         <VStack spacing={8}>
                              <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%">
                                   <Input name="name" type="text" label="Nome completo" {...register('name')} error={errors.name} />
                                   <Input name="email" type='email' label="E-mail" {...register('email')} error={errors.email} />
                              </SimpleGrid>

                              <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%">
                                   <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password} />
                                   <Input name="password_confirmation" type='password' label="Confirmação da senha" {...register('password_confirmation')} error={errors.password_confirmation} />
                              </SimpleGrid>
                         </VStack>

                         <Flex mt="8" justify="flex-end" gap="4">
                              <Link href='/users' passHref>
                                   <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                              </Link>
                              <Button colorScheme="pink" type="submit" isLoading={formState.isSubmitting}>Salvar</Button>
                         </Flex>
                    </Box>
               </Flex>
          </Box>
     )
}