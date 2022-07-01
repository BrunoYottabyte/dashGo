import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import Head from "next/head";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { api, setupClientApi } from "../services/api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../utils/withSSRAuth";
import { Can } from "../components/Can";




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
               31, 120, 10, 28, 61, 18, 109
          ]
     }
]

export default function Dashboard() {
     const {user} = useAuth()
     return (
      <Flex
            direction="column"
            className="bg_global"
            height="100vh"
          >
               <Head>
                    <title>Dashboard</title>
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

                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
                         <Box p={["6","8"]} className="box" bg="gray.800" borderRadius="8" paddingBottom={2}>
                              <Text>Inscritos da semana</Text>
                              <Chart options={options} series={series} type="area" height={160} />
                         </Box>

                         <Can permissions={['metrics.list', ]} roles={['administrator']}>
                              <Box p={["6","8"]} className="box" bg="gray.800" borderRadius="8" paddingBottom={2}>
                                   <Text>Taxa de abertura</Text>
                                   <Chart options={options} series={series} type="area" height={160} />
                              </Box>
                         </Can>

                    </SimpleGrid>
               </Flex>
          </Flex >
     )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
     const apiSSR = setupClientApi(ctx);
     const response = await apiSSR.get('/user/me')

          return {
               props: {
               }
          }
})

