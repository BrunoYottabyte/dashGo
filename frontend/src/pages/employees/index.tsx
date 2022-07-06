import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import Head from "next/head";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import styles from './styles.module.scss';
import { useUsers } from "../../services/hooks/useEmployees";




export default function EmployeeList() {
     const [page, setPage] = useState(1);
     const { data, isLoading, error, isFetching } = useUsers(page);
   
     return (


          < >
               <Head>
                    <title>Employees | Geogas</title>
               </Head>
               <Header />

               <div className={styles.box_employees}>
                    <Sidebar />

                    <div className={`${styles.box_table} box`}>
                         <div className={styles.header}>
                              <h1>Employees {
                                   !isLoading && isFetching && (
                                        <Spinner ml="2" size="sm" />
                                   )
                              }</h1>

                              <NextLink href="/employees/create" passHref>
                                   <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="facebook"
                                        leftIcon={<Icon fontSize="15" as={RiAddLine} />}
                                   >
                                        Criar novo
                                   </Button>
                              </NextLink>
                         </div>
                        

                         {isLoading ? (
                              <div className="flex-h-center">
                                   <Spinner />
                              </div>
                         ) : error ? (
                              <div className="flex-h-center">
                                   <p>Falha ao obter dados do usuário</p>
                              </div>
                         ) : (
                              <>
                                   <table>
                                        <thead>
                                             <tr>
                                                  <th>
                                                       <input type={'checkbox'} />
                                                  </th>
                                                  <th>Usuário</th>
                                                  <th>Data de Cadastro</th>
                                                  <th></th>
                                             </tr>
                                        </thead>

                                        <tbody className={styles.tbody}>
                                             {data.employees?.map(employee => {
                                                
                                                  return (
                                                  
                                                       <tr key={employee._id}>
                                                            <td>
                                                                 <input type={"checkbox"} />
                                                            </td>

                                                            <td>
                                                                 <div className={styles.info_pessoal}>
                                                                      <a>
                                                                           {employee.nome}
                                                                      </a>
                                                                      <small>{employee.funcaoId?.nome}</small>
                                                                 </div>
                                                            </td>
                                                            <td>{employee.createdAt}</td>
                                                            <td>
                                                                 <Button
                                                                      as="a"
                                                                      size="sm"
                                                                      fontSize="sm"
                                                                      colorScheme="facebook"
                                                                      leftIcon={<Icon as={RiPencilLine} />}

                                                                 >
                                                                      Editar
                                                                 </Button>
                                                            </td>
                                                      
                                                       </tr>
                                                
                                                  )
                                             })}
                                        </tbody>
                                   </table>

                                   <Pagination
                                        totalCountOfRegisters={data.totalCount}
                                        currentPage={page}
                                        onPageChange={setPage}
                                   />
                              </>
                         )
                         }

                    </div>
               </div>
          </>
     )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

     return {
          props: {

          }
     }
})