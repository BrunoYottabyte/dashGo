import { Button, Icon, Spinner, Link } from "@chakra-ui/react";
import Head from "next/head";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import styles from './styles.module.scss';
import { getEmployeesId, getRecordsEmployee, useUsers } from "../../services/hooks/useEmployees";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { useFetch } from "../../contexts/FetchContext";


export default function EmployeeList() {
     const [page, setPage] = useState(1);
     const { data, isLoading, error, isFetching } = useUsers(page);
     const {setFetch} = useFetch();

     async function handlePrefetchEmployee (userId: string){
          await queryClient.prefetchQuery(['employeeId', userId], () => getEmployeesId(userId), {
               staleTime: 1000 * 60 * 10 
          });
     }

     async function handlePrefetchRecords (userId: string){
          await queryClient.prefetchQuery(['RecordsEmployeeId', userId], () => getRecordsEmployee(userId), {
               staleTime: 1000 * 60 * 10
          })
     }
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
                                                  <th>Informações</th>
                                                  <th>Funcionário</th>
                                                  <th>Treinamentos pendentes</th>
                                                  <th>Status</th>
                                                  <th>Interno</th>
                                                  <th>Horas concluídas</th>
                                             </tr>
                                        </thead>

                                        <tbody className={styles.tbody}>
                                             {data.employees?.map(employee => {
                                             
                                                  return (
                                                       <tr key={employee.id}>   

                                                            <td onMouseEnter={() => {
                                                              
                                                              handlePrefetchEmployee(employee?.id)
                                                              handlePrefetchRecords(employee?.id)
                                                              setFetch(employee?.id);
                                                     
                                                        }}>
                                                                <NextLink href="/employees/info" >
                                                                 
                                                                           Visualizar
                                                                    
                                                                </NextLink>
                                                            </td>
                                                            <td>
                                                                 <div className={styles.info_pessoal}>
                                                                      <a>
                                                                           {employee.nome}
                                                                      </a>
                                                                      <small>{employee.cargo}</small>
                                                                 </div>

                                                            </td>
                                                            <td>
                                                                 <div className={styles.preencher}>
                                                                      {employee.pendentes?.length}
                                                                 </div>
                                                            </td>
                                                            <td>
                                                                 <div className={styles.preencher}>
                                                                      {employee.pendentes?.length === 0 ? 'Apto' : 'Inapto'}
                                                                 </div>
                                                            </td>
                                                            <td>{employee.interno}</td>
                                                            <td>
                                                                 {employee.horasConcluidas}
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
          props: {}
     }
})