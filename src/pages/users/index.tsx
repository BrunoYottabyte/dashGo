import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import Link from "next/link";

import { useQuery } from 'react-query';
import { api } from "../../services/api";

export default function UserList() {

     const { data, isLoading, error, isFetching } = useQuery('users', async () => {
          const {data} = await api.get('users')
      

          const users = data.users.map(user => ({
               id: user.id,
               name: user.name,
               email: user.email,
               created_at: new Date(user.createdAt).toLocaleDateString('pt-BR',{
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
               })
          }))

          return users
     }, {
          staleTime: 1000 * 5 // 5 seconds
     })

     return (
          <Box>
               <Head>
                    <title>Users</title>
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

                    <Box flex="1" borderRadius="8" bg="gray.800" p={["6", "8"]} overflowX={["scroll", "scroll", "auto"]}>
                         <Flex mb="8" justify="space-between" align="center" >
                              <Heading size="lg" fontWeight="normal">
                                   Usuários {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
                              </Heading>

                              <Link href="/users/create" passHref>
                                   <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="pink"
                                        leftIcon={<Icon fontSize="20" as={RiAddLine} />}
                                   >
                                        Criar novo
                                   </Button>
                              </Link>
                         </Flex>

                         {isLoading ? (
                              <Flex align="center" justify="center">
                                   <Spinner />
                              </Flex>
                         ) : error ? (
                              <Flex justify="center">
                                   <Text>Falha ao obter dados dos usuários.</Text>
                              </Flex>
                         ) : (
                              <>
                                   <Table colorScheme="whiteAlpha">
                                        <Thead>
                                             <Tr>
                                                  <Th px={["4", "4", "6"]} color="gray.300" width="8" >
                                                       <Checkbox colorScheme="pink" />
                                                  </Th>
                                                  <Th>Usuário</Th>
                                                  <Th>Data de Cadastro</Th>
                                                  <Th w="8" />
                                             </Tr>
                                        </Thead>
                                        <Tbody>
                                             {data.map(user => {
                                                  return (
                                                       <Tr key={user.id}>
                                                            <Td px={["4", "4", "6"]}>
                                                                 <Checkbox colorScheme="pink" />
                                                            </Td>

                                                            <Td>
                                                                 <Box>
                                                                      <Text fontWeight="bold" >{user.name}</Text>
                                                                      <Text color="gray.300" fontSize="small" >{user.email}</Text>

                                                                 </Box>
                                                            </Td>
                                                            <Td>{user.created_at}</Td>
                                                            <Td>
                                                                 <Button
                                                                      as="a"
                                                                      size="sm"
                                                                      fontSize="sm"
                                                                      colorScheme="purple"
                                                                      leftIcon={<Icon as={RiPencilLine} />}
                                                                 >
                                                                      Editar
                                                                 </Button>
                                                            </Td>
                                                       </Tr>
                                                  )
                                             })}
                                        </Tbody>
                                   </Table>
                                   <Pagination />
                              </>
                         )}
                    </Box>
               </Flex>
          </Box>
     )
}