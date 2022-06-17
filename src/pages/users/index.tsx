import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import Head from "next/head";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";

import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/mirage/queryClient";
import { api } from "../../services/api";

export default function UserList() {
     const [page, setPage] = useState(1);

     const { data, isLoading, error, isFetching } = useUsers(page);

     async function handlePrefetchUser(userId: number) {
          await queryClient.prefetchQuery(['user', userId], async () => {
               const response = await api.get(`users/${userId}`);

               return response.data;
          }, {
               staleTime: 1000 * 60 * 10 // 10 minutes
          })
     }

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
                                   Usuários {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                              </Heading>

                              <NextLink href="/users/create" passHref>
                                   <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="pink"
                                        leftIcon={<Icon fontSize="20" as={RiAddLine} />}
                                   >
                                        Criar novo
                                   </Button>
                              </NextLink>
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
                                             {data.users.map(user => {
                                                  return (
                                                       <Tr key={user.id}>
                                                            <Td px={["4", "4", "6"]}>
                                                                 <Checkbox colorScheme="pink" />
                                                            </Td>

                                                            <Td>
                                                                 <Box>
                                                                      <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                                           <Text fontWeight="bold" >{user.name}</Text>
                                                                      </Link>
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
                                   <Pagination
                                        totalCountOfRegisters={data.totalCount}
                                        currentPage={page}
                                        onPageChange={setPage}
                                   />
                              </>
                         )}
                    </Box>
               </Flex>
          </Box>
     )
}