import { Flex, SimpleGrid, Box, Text, theme, HStack, VStack, Icon } from "@chakra-ui/react";
import { FcDocument, FcBusinessman, FcClock } from "react-icons/fc";
import Head from "next/head";
import dynamic from 'next/dynamic';
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { api, setupClientApi } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { Can } from "../../components/Can";

import styles from './styles.module.scss';
import { useEffect } from "react";
import { useToast } from "../../contexts/ToastContext";


const Chart = dynamic(() => import('react-apexcharts'), {
     ssr: false,
});

const options = {
     chart: {
          toolbar: {
               show: false
          },
          zoom: {
               enabled: false
          },
          foreColor: theme.colors.gray[500]
     },
     grid: {
          show: false,
     },
     dataLabels: {
          enabled: false
     },
     tooltip: {
          enabled: false
     },

     xaxis: {
          type: 'datetime',
          axisBorder: {
               color: theme.colors.gray[600]
          },
          axisTicks: {
               color: theme.colors.gray[600]
          },
          categories: [
               '2022-06-04T00:00:00.000Z',
               '2022-06-05T00:00:00.000Z',
               '2022-06-06T00:00:00.000Z',
               '2022-06-07T00:00:00.000Z',
               '2022-06-08T00:00:00.000Z',
               '2022-06-09T00:00:00.000Z',
               '2022-06-10T00:00:00.000Z',
               '2022-06-11T00:00:00.000Z',
               '2022-06-12T00:00:00.000Z',
               '2022-06-13T00:00:00.000Z',
          ]
     },
     fill: {
          gradient: {
               shade: 'dark',
               opacityFrom: 1,
               opacityTo: 0.2
          }
     }
};

const series = [
     {
          data: [
               31, 120, 10, 28, 61, 18, 109, 50, 25, 60
          ]
     }
]

export default function Dashboard() {
     const {showToast} = useToast();
     useEffect(() => {
          api.get('/user/me').then(response => {
               console.log(response)
          }).catch(err => showToast('danger', err.response?.data.code, err.response?.data.message));
     }, [])
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
                                   <Text>Inscritos da semana</Text>
                                   <Chart options={options} series={series} type="area" height={160} />
                              </div>

                              <Can permissions={['metrics.list',]} roles={['administrator']}>
                                   <div className={`${styles.box} box`}>
                                        <Text>Taxa de abertura</Text>
                                        <Chart options={options} series={series} type="area" height={160} />
                                   </div>
                              </Can>
                         </section>
                    </div>
               </div>
          </main>
     )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
     const apiSSR = setupClientApi(ctx);
     const response = await apiSSR.get('/user/me')

     return {
          props: {
          }
     }
})

