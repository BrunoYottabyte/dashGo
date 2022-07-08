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
import { SideRight } from "../../../components/SideRight";

const body = () => {
     return (
       <>
         <div className="containerUpdateDivs">
           <div className="labels">
             <label>Name</label>
             <input
               className="input_update"
               placeholder="Treinamento"
            
             />
           </div>
           <div className="labels">
             <label>Gender</label>
             <select
               className="input_update"
             
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
             />
           </div >
           <div className="labels">
             <label>Internal</label>
             <select
               className="input_update"
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
               placeholder="Treinamento"
             />
           </div>
           <div className="labels">
             <label>Registration date</label>
             <input
               disabled
               readOnly
               className="input_update disable"
               placeholder="Treinamento"
               // value={moment(employee.dataCadastro).format("MM/DD/YYYY h:mm a")}
             />
           </div>
         </div>
         <div className="buttons_sideRight">
           <button
             className="btn"
          //    onClick={() => {
          //      openPopup("Deseja realmente atualizar? :D", "update");
          //    }}
           >
             Update
           </button>
           <button
             className="btn"
          //    onClick={() =>
          //      openPopup("Do you want to delete the employee? :(", "delete")
          //    }
           >
             Delete
           </button>
         </div>
       </>
     );
   };

   const head = {
     title: "Update employee information",
     close: "X",
   };  

export default function InfoEmployee() {
     const { stateFetch } = useFetch();
     const [employee, setEmployee] = useState({});
     const [records, setRecords] = useState();
     const [page, setPage] = useState(1);
     
     useEffect(() => {

          const [employee] = queryClient.getQueriesData(['employeeId', stateFetch]);
          const records = queryClient.getQueriesData(['RecordsEmployeeId', stateFetch]);

          if (employee) {
               setEmployee(employee[1]);
               setRecords(records[0][1]);
               return;
          }
          Router.back();
     }, [])
     return (


          < >
               <Head>
                    <title>Employees | Geogas</title>
               </Head>
               <Header />

               <div className={styles.box_employees}>
                    <Sidebar />

                    <section className={`${styles.box_content} box`}>

                         <section className={styles.employee_data_box}>
                              <div className={styles.header_data_box}>
                                   <h1>Registration Data</h1>
                                   <div className={styles.data_preview}>

                                        <label>
                                             Name:
                                             <input disabled type="text" placeholder="N a m e" value={employee?.nome} />
                                        </label>

                                        <label>
                                             Occupation:
                                             <input disabled type="text" placeholder="O c c u p a t i o n " value={employee?.cargo}></input>
                                        </label>
                                        <label>
                                             Internal:
                                             <input disabled type="text" placeholder="I n t e r n a l" value={employee?.interno}></input>
                                        </label>


                                        <button type="button">
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
                                                                           <tr>
                                                                                <td>
                                                                                     View
                                                                                </td>
                                                                                <td>
                                                                                     Concluído
                                                                                </td>
                                                                                <td>
                                                                                     NR 20 - SEGURANÇA E SAÚDE NO TRABALHO COM INFLAMÁVEIS E COMBUSTÍVEIS
                                                                                </td>
                                                                                <td>
                                                                                     View
                                                                                </td>
                                                                                <td>
                                                                                     View
                                                                                </td>
                                                                                <td>
                                                                                     View
                                                                                </td>
                                                                                <td>
                                                                                     View
                                                                                </td>
                                                                                <td>
                                                                                     View
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
               <SideRight body={body} head={head}/>
          </>
     )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

     return {
          props: {}
     }
})