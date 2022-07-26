import { Button, Icon, Spinner, Link } from "@chakra-ui/react";
import Head from "next/head";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import NextLink from "next/link";
import { Pagination } from "../../../components/Pagination";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { useFetch } from "../../../contexts/FetchContext";
import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { queryClient } from "../../../services/queryClient";
import Router from "next/router";
import {  SideRight } from "../../../components/SideRight";
import { api } from "../../../services/api";
import { getEmployeesId, getRecordsEmployee } from "../../../services/hooks/useEmployees";
import { useQuery } from "react-query";
import Layout from "../../../components/Layout";




const head = {
     title: "Update employee information",
     close: "X",
};


export default function InfoEmployee() {
     const { stateFetch } = useFetch();
     const [employee, setEmployee] = useState({});
     const [records, setRecords] = useState();
     const [page, setPage] = useState(1);
     const [sideRight, setSideRight] = useState(false);

     // inputs update]
     const [date, setDate] = useState("");
     const [gender, setGender] = useState("");
     const [internal, setInternal] = useState("");
     const [name, setName] = useState(employee?.nome);
     const [occupation, setOccupation] = useState("");
     const [totalWorkload, setTotalWorkload] = useState("");

     const handleUpdate = async() => {
          const data = {
               gender,
               internal,
               name,
          }
        
          const response = await api.put(`/funcionario/${employee?.id}`, data);
          console.log(response);
     }

     const handleDelete = () => {

     }


     const body = (employee) => {

          return (
               <>
                    <div className="containerUpdateDivs">
                         <div className="labels">
                              <label>Name</label>
                              <input
                                   className="input_update"
                                   placeholder="Treinamento"
                                   value={name || ''}
                                   onChange={(e) => setName(e.target.value)}
                              />
                         </div>
                         <div className="labels">
                              <label>Gender</label>
                              <select
                                   className="input_update"
                                   value={gender || ''}
                                   onChange={(e) => setGender(e.target.value)}
                              >
                                   <option value="">Choose</option>
                                   <option value="M">Masculino</option>
                                   <option value="F">Feminino</option>
                              </select>
                         </div>

                         <div className="labels">
                              <label>Occupation</label>
                              <input
                                   disabled
                                   readOnly
                                   className="input_update disable"
                                   placeholder="Treinamento"
                                   value={occupation || ''}
                                   onChange={(e) => setOccupation(e.target.value)}
                              />
                         </div >
                         <div className="labels">
                              <label>Internal</label>
                              <select
                                   className="input_update"
                                   value={internal || ''}
                                   onChange={(e) => setInternal(e.target.value)}
                              >
                                   <option value="Sim">Sim</option>
                                   <option value="Não">Não</option>
                              </select>
                         </div>

                         <div className="labels">
                              <label>Total workload</label>

                              <input
                                   disabled
                                   readOnly
                                   className="input_update disable"
                                   placeholder="Workload"
                                   value={totalWorkload || ''}
                                   onChange={(e) => setTotalWorkload(e.target.value)}
                              />
                         </div>
                         <div className="labels">
                              <label>Registration date</label>
                              <input
                                   disabled
                                   readOnly
                                   className="input_update disable"
                                   placeholder="Treinamento"
                                   value={date || ''}
                                   onChange={(e) => setDate(e.target.value)}
                              />
                         </div>
                    </div>
                    <div>
                         <button
                           
                              onClick={
                                   () => {
                                        handleUpdate();
                                        setSideRight(false);
                                   }
                              }>
                              Update
                         </button>
                         <button
                           
                              onClick={
                                   handleDelete
                              }>
                         
                              Delete
                         </button>
                    </div>
               </>
          );
     };

     useEffect(() => {
               let [employee] =   queryClient.getQueriesData(['employeeId', stateFetch]);
               let records =  queryClient.getQueriesData(['RecordsEmployeeId', stateFetch]);

               if (employee) {
                    setEmployee(employee[1]);
                    setRecords(records[0][1]);


                    setName(employee[1]?.nome);
                    setDate(employee[1]?.createdAt)
                    setGender(employee[1]?.sexo);
                    setInternal(employee[1]?.interno);
                    setOccupation(employee[1]?.cargo);
                    setTotalWorkload(employee[1]?.horasConcluidas)
                    return;   
               }
                              Router.back();

     }, [])

    

     return (
          <Layout>
                 <Head>
                    <title>Employees | Geogas</title>
               </Head>
               <div className={styles.box_employees}>

                    <section className={`${styles.box_content} box`}>

                         <section className={styles.employee_data_box}>
                              <div className={styles.header_data_box}>
                                   <h1>Registration Data</h1>
                                   <div className={styles.data_preview}>

                                        <label>
                                             Name:
                                             <input disabled type="text" placeholder="N a m e" value={employee?.nome || ''} />
                                        </label>

                                        <label>
                                             Occupation:
                                             <input disabled type="text" placeholder="O c c u p a t i o n " value={employee?.cargo || ''}></input>
                                        </label>
                                        <label>
                                             Internal:
                                             <input disabled type="text" placeholder="I n t e r n a l" value={employee?.interno || ''}></input>
                                        </label>


                                        <button type="button" onClick={() => setSideRight(true)}>
                                             Modify
                                        </button>
                                   </div>
                              </div>

                              <section className={styles.employee_records}>
                                   <div className={styles.header}>
                                        <h1>Employee Records</h1>
                                        <button>Add Records</button>
                                   </div>
                                   <div className={styles.body_employee_records}>
                                        {
                                             records?.length > 0 ? (
                                                  <>
                                                       <table>
                                                            <thead>
                                                                 <tr>
                                                                      <th>Modify</th>
                                                                      <th>Status</th>
                                                                      <th>Training</th>
                                                                      <th>Minimum</th>
                                                                      <th>Hours Completed</th>
                                                                      <th>Validate</th>
                                                                      <th>Conclusion</th>
                                                                      <th>Due date</th>
                                                                 </tr>
                                                            </thead>

                                                            <tbody>
                                                                 {records && records.map(record => {

                                                                      return (
                                                                           <tr key={record.id}>
                                                                                <td>
                                                                                     View
                                                                                </td>
                                                                                <td>
                                                                                     Concluído
                                                                                </td>
                                                                                <td>
                                                                                     {record?.nome}
                                                                                </td>
                                                                                <td>
                                                                                     {record?.cargaMinima}
                                                                                </td>
                                                                                <td>
                                                                                     {record?.cargaHoraria}
                                                                                </td>
                                                                                <td>
                                                                                     {record?.validade}
                                                                                </td>
                                                                                <td>
                                                                                     {record?.dataConclusao}
                                                                                </td>
                                                                                <td>
                                                                                     {record?.dataVencimento}
                                                                                </td>
                                                                           </tr>
                                                                      )
                                                                 })}

                                                            </tbody>
                                                       </table>
                                                       <Pagination onPageChange={setPage} totalCountOfRegisters={records?.length} currentPage={page} />
                                                  </>
                                             ) : <div className="flex-h-center">
                                                  <h1>We have nothing to show :(</h1>
                                             </div>
                                        }
                                   </div>
                              </section>
                         </section>



                    </section>
               </div>
             <SideRight body={() => body(employee)} head={head} state={sideRight} setState={setSideRight} />
          </Layout>
     )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

     return {
          props: {}
     }
})