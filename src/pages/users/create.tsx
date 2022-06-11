import { Box, Flex, Heading, Button, Divider, VStack, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function CreateUser() {
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

                    <Box flex="1" borderRadius="8" bg="gray.800" p="8">
                        <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                        <Divider my="5" borderColor="gray.700"/>

                        <VStack spacing={8}>
                            <SimpleGrid minChildWidth="240px" spacing={8} w="100%">
                                <Input name="name" type="text" label="Nome completo" />
                                <Input name="email" type='email' label="E-mail" />
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing={8} w="100%">
                                <Input name="password" type="password" label="Senha" />
                                <Input name="password_confirmation" type='password' label="Confirmação da senha" />
                            </SimpleGrid>
                        </VStack>

                        <Flex mt="8" justify="flex-end" gap="4">
                            <Button colorScheme="whiteAlpha">Cancelar</Button>
                            <Button colorScheme="pink">Salvar</Button>
                        </Flex>
                    </Box>
               </Flex>
          </Box>
     )
}