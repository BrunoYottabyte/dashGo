import { Button, Icon, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { RiAddLine } from "react-icons/ri";
import Table from "../../components/Table";
import  Badge  from "../../components/Badge";
import NextLink from "next/link";
import { Pagination } from "../../components/Pagination";
import { useEffect, useState } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import styles from "./styles.module.scss";
import {
  getEmployeesId,
  getRecordsEmployee,
  useUsers,
} from "../../services/hooks/useEmployees";
import { queryClient } from "../../services/queryClient";
import { useFetch } from "../../contexts/FetchContext";
import Layout from "../../components/Layout";
import Link from "next/link";
import { api } from "../../services/api";
import GlobalFilter from "../../components/Table/GlobalFilter";

export default function EmployeeList() {
  const [page, setPage] = useState(1);
  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState("");
  const { data, isLoading, error, isFetching } = useUsers(page);
  const { setFetch } = useFetch();

  async function handlePrefetchEmployee(userId: string) {
    await queryClient.prefetchQuery(
      ["employeeId", userId],
      () => getEmployeesId(userId),
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  async function handlePrefetchRecords(userId: string) {
    await queryClient.prefetchQuery(
      ["RecordsEmployeeId", userId],
      () => getRecordsEmployee(userId),
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  const COLUMNS = [
    {
      filter: false,
      Header: (v) => <span>Information</span>,
      accessor: "id",
      Cell: (v) => (
        <Link
          href="/employees/info"
        >
          <span
           onTouchMove={() => {
            console.log(v)
            handlePrefetchEmployee(v.value);
            handlePrefetchRecords(v.value);
            setFetch(v.value);
          }}
          onMouseEnter={() => {
            handlePrefetchEmployee(v.value);
            handlePrefetchRecords(v.value);
            setFetch(v.value);
          }}
          >
           
               View
          </span>
       
        </Link>
      ),
    },
    {
      Header: "Employee",
      accessor: "nome",
      filter: true
    },
    {
      Header: "Pending training",
      accessor: "pendentes",
      filter: true
    },
    {
      Header: "Status",
      accessor: "status",
      filter: true
    },
    {
      Header: "Internal",
      accessor: "interno",
    },
    {
      Header: "Completed hours",
      accessor: "horasConcluidas",
    },
  ];

  const arrEmployeeDefault = () => {
    const employees = data?.employees.map(employee => {
      return {
        ...employee,
        pendentes: employee.pendentes?.length,
        status: employee.pendentes?.length === 0
          ? <Badge type="employee" status='able' />
          : <Badge type="employee" status='unqualified' />,
      }
    })
    setEmployee(employees)
  }

  useEffect(() => {
    arrEmployeeDefault();
  }, [data])

  useEffect(() => {
    if(search){
      const handleSubmit = async() => {
        const {data} = await api.get(`/funcionario/search/${search}`);
        const formated = data.search.map(employee => {
          return {
            ...employee,
            id: employee._id,
            pendentes: employee.pendentes?.length,
            status: employee.pendentes?.length === 0
              ? <Badge type="employee" status='able' />
              : <Badge type="employee" status='unqualified' />,
          }
        })
        setEmployee(formated);
      }
      handleSubmit();
    }else{
      arrEmployeeDefault()
    }
  }, [search])
  

  return (
    <>
      <Head>
        <title>Employees | Geogas</title>
      </Head>

      <Layout>
          <div className={styles.box_content}>
            <div className={`${styles.box_table} box`}>
              <div className={styles.header}>
                <h1>
                  Employees{" "}
                  {!isLoading && isFetching && <Spinner ml="2" size="sm" />}
                </h1>
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
                  {employee && <Table arrRows={employee} arrColumns={COLUMNS} options={{search, setSearch}} />}
                  <Pagination
                    totalCountOfRegisters={data.totalCount}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </>
              )}
            </div>
          </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {},
  };
});
