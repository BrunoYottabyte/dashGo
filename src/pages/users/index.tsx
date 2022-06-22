import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import Head from "next/head";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";

import { api } from "../../services/api";
import { Pagination } from "../../components/Pagination";

export default function UserList() {

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

                                   Usuários
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


                                   <Tr >
                                        <Td px={["4", "4", "6"]}>
                                             <Checkbox colorScheme="pink" />
                                        </Td>

                                        <Td>
                                             <Box>
                                                  <Link color="purple.400">
                                                       <Text fontWeight="bold" >Bruno Siqueira</Text>
                                                  </Link>
                                                  <Text color="gray.300" fontSize="small" >PROJETOINTEGRADOR792@GMAIL.COM</Text>

                                             </Box>
                                        </Td>
                                        <Td>22 de junho, 2022</Td>
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
                              </Tbody>
                         </Table>
                         <Pagination />

                    </Box>
               </Flex>
          </Box>
     )
}