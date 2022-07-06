import { Box, Text } from "@chakra-ui/react";
import { FcDocument, FcBusinessman, FcClock } from "react-icons/fc";
import Head from "next/head";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { api, setupClientApi } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { Can } from "../../components/Can";

import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { PopCharts } from "../../components/Charts/PopCharts";
import { AreaChart } from "../../components/Charts/AreaCharts";
import moment from 'moment';


type weekOfDayProperties = {
     seg: number[],
     ter: number[],
     qua: number[],
     qui: number[],
     sex: number[],
     sab: number[],
     dom: number[],
}

type monthOfYear = {
     jan: number[],
     fev: number[],
     mar: number[],
     abr: number[],
     mai: number[],
     jun: number[],
     jul: number[],
     ago: number[],
     set: number[],
     out: number[],
     nov: number[],
     dez: number[],
}

export default function Dashboard() {
     const { showToast } = useToast();
     const [registros, setRegistros] = useState([]);
     const [weekOfDay, setWeekOfDay] = useState<weekOfDayProperties>({} as weekOfDayProperties);
     const [monthOfYear, setMonthOfYear] = useState({} as monthOfYear);

     useEffect(() => {
          api.get('/registro').then(({ data }) => {
               setRegistros(data);
          }).catch(err => showToast('danger', err.response?.data.code, err.response?.data.message));
     }, [])

     useEffect(() => {
          const weekUpdated = {
               seg: [],
               ter: [],
               qua: [],
               qui: [],
               sex: [],
               sab: [],
               dom: []
          }

        
          registros?.week?.forEach(registro => {
               const day = moment(registro.dataCadastro).day()
               switch (day) {
                    case 1:
                         weekUpdated.seg.push(registro);
                         break;
                    case 2:

                         weekUpdated.ter.push(registro)
                         break;

                    case 3:

                         weekUpdated.qua.push(registro)

                         break;
                    case 4:

                         weekUpdated.qui.push(registro)
                         break;
                    case 5:

                         weekUpdated.sex.push(registro)
                         break;
                    case 6:
                         weekUpdated.sab.push(registro)
                         break;
                    case 0:
                         weekUpdated.dom.push(registro)
                         break;
               }
          })

          const monthUpdated = {
               jan: [],
               fev: [],
               mar: [],
               abr: [],
               mai: [],
               jun: [],
               jul: [],
               ago: [],
               set: [],
               out: [],
               nov: [],
               dez: [],
          }
          registros?.registros?.forEach(registro => {
               const month = moment(registro.dataCadastro).month();
               switch (month) {
                    case 0:

                         monthUpdated.jan.push(registro);
                         break;

                    case 1:

                         monthUpdated.fev.push(registro)
                         break;

                    case 2:

                         monthUpdated.mar.push(registro)

                         break;
                    case 3:

                         monthUpdated.abr.push(registro)
                         break;
                    case 4:

                         monthUpdated.mai.push(registro)
                         break;
                    case 5:
                         monthUpdated.jun.push(registro)
                         break;
                    case 6:
                         monthUpdated.jul.push(registro)
                         break;
                    case 7:
                         monthUpdated.ago.push(registro)
                         break;
                    case 8:
                         monthUpdated.set.push(registro)
                         break;
                    case 9:
                         monthUpdated.out.push(registro)
                         break;
                    case 10:
                         monthUpdated.nov.push(registro)
                         break;
                    case 11:
                         monthUpdated.dez.push(registro)
                         break;
               }
          })

          setWeekOfDay(weekUpdated);
          setMonthOfYear(monthUpdated)
     }, [registros])

     let arr = [
          weekOfDay.seg?.length || 0,
          weekOfDay.ter?.length || 0,
          weekOfDay.qua?.length || 0,
          weekOfDay.qui?.length || 0,
          weekOfDay.sex?.length || 0,
          weekOfDay.sab?.length || 0,
          weekOfDay.dom?.length || 0,
     ]

     let arrMonth = [
          monthOfYear.jan?.length || 0,
          monthOfYear.fev?.length || 0,
          monthOfYear.mar?.length || 0,
          monthOfYear.abr?.length || 0,
          monthOfYear.mai?.length || 0,
          monthOfYear.jun?.length || 0,
          monthOfYear.jul?.length || 0,
          monthOfYear.ago?.length || 0,
          monthOfYear.set?.length || 0,
          monthOfYear.out?.length || 0,
          monthOfYear.nov?.length || 0,
          monthOfYear.dez?.length || 0,
     ]


     return (
          <main className={styles.container}>
               <Head>
                    <title>Dashboard | Geogas</title>
               </Head>
               <Header />

               <div className={styles.box_layout}>
                    <Sidebar />
                    <div className={styles.content}>

                         <section className={styles.count_informations}>
                              <div className={`${styles.box} ${styles.box_small} box`} >
                                   <FcDocument fontSize="3.75rem" />
                                   <Box ml={5}>
                                        <Text fontWeight="bold" fontSize="3xl">0</Text>
                                        <Text>Number of employees trained</Text>
                                   </Box>
                              </div>
                              <div className={`${styles.box} ${styles.box_small} box`} >
                                   <FcBusinessman fontSize="3.75rem" />
                                   <Box ml={5}>
                                        <Text fontWeight="bold" fontSize="3xl">0</Text>
                                        <Text>Number of employees trained</Text>
                                   </Box>
                              </div>
                              <div className={`${styles.box} ${styles.box_small} box`} >
                                   <FcClock fontSize="3.75rem" />
                                   <Box ml={5}>
                                        <Text fontWeight="bold" fontSize="3xl">0</Text>
                                        <Text>Number of employees trained</Text>
                                   </Box>
                              </div>
                         </section>

                         <section className={styles.charts}>
                              <div className={`${styles.box} box`}>
                                   {<AreaChart arr={arr} title="Registered this week" type="area" height={300} />}
                              </div>

                              <Can permissions={['metrics.list',]} roles={['administrator']}>
                                   <div className={`${styles.box} box`}>
                                        <AreaChart arr={arr} type="area" height={160} />
                                   </div>
                              </Can>


                         </section>

                         <section className={styles.charts}>
                              <div className={`${styles.box} box`}>
                                   <PopCharts arr={arrMonth} />
                              </div>
                         </section>
                    </div>
               </div>
          </main>
     )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
     const apiSSR = setupClientApi(ctx);
     const response = await apiSSR.get('/user/me')

     // try{
     //      const registros = await apiSSR.get('/registro/');
     // }catch(err){
     //      showToast('danger', 'Error', err.response?.data.message);
     // }

     return {
          props: {
          }
     }
})

