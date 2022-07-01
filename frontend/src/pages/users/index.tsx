import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import Head from "next/head";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";
import { Pagination } from "../../components/Pagination";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api, setupClientApi } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";



export default function UserList() {
     const [page, setPage] = useState(1);
     const { data, isLoading, error, isFetching } = useUsers(page);

     const handlePrefetchUser = async(userId: string) => {
          await queryClient.prefetchQuery(['user', userId], async () => {
               const response = await api.get(`users/${userId}`)

               return response.data
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
                                   <Flex justify="center" align="center">
                                        Usuários {!isLoading && isFetching && (
                                             <Spinner ml="2" size="sm" />
                                        )}
                                   </Flex>
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


                         {
                              isLoading ? (
                                   <Flex justify="center">
                                        <Spinner />
                                   </Flex>
                              ) : error ? (
                                   <Flex justify="center">
                                        <Text>Falha ao obter dados do usuário</Text>
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
                                                  {data.users.map(user => (
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
                                                            <Td>{user.createdAt}</Td>
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
                                                  ))}
                                             </Tbody>
                                        </Table>
                                        <Pagination 
                                             totalCountOfRegisters={data.totalCount}
                                             currentPage={page}
                                             onPageChange={setPage}
                                        />
                                   </>
                              )
                         }

                    </Box>
               </Flex>
          </Box>
     )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
     const apiSSR = setupClientApi(ctx);
     const response = await apiSSR.get('/user/me');

          return {
               props: {
               }
          }
})