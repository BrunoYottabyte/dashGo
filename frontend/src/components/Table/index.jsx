import Link from 'next/link';
import React, {useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import { useFetch } from '../../contexts/FetchContext';
import {COLUMNS} from '../../utils/theadsTables/employee'
import {ImSortAlphaAsc, ImSortAlphaDesc} from 'react-icons/im'
import GlobalFilter from './GlobalFilter';
import {RiFilterOffFill} from 'react-icons/ri'

import styles from './styles.module.scss';

const Table = ({arr, handlePrefetchEmployee, handlePrefetchRecords}) => {

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => arr, [arr]);
  const { setFetch } = useFetch();
  const tableInstance = useTable({
    columns,
    data,
  },
    useGlobalFilter,
    useSortBy
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, 
    rows, 
    state,
    setGlobalFilter,
    prepareRow } = tableInstance

    const {globalFilter} = state;

  return (
    <main className={styles.tableContainer}>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => {
                    if(column.Header === 'Information'){
                      return(
                          <th {...column.getHeaderProps()}>
                            <div>
                              {column.render('Header')}
                            </div>
                          </th>
                      )
                    }
                    return(
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div>
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? <ImSortAlphaDesc/> : <ImSortAlphaAsc/>): <RiFilterOffFill/>}
                        </span>
                      </div>
                    </th>
                  )})
                }
              </tr>
            ))
          }
         
        </thead>

        <tbody {...getTableBodyProps()}>
          {
            rows.map(row => {

              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell => {
                  
                      if(cell.column.Header === 'Information'){
                        return <td {...cell.getCellProps()}
                        onTouchMove={() => {
                          handlePrefetchEmployee(cell.row.values.id);
                          handlePrefetchRecords(cell.row.values.id);
                          setFetch(cell.row.values.id);
                        }}
                        onMouseEnter={() => {
                          handlePrefetchEmployee(cell.row.values.id);
                          handlePrefetchRecords(cell.row.values.id);
                          setFetch(cell.row.values.id);
                        }}
                        >
                          <Link href="/employees/info">
                                View
                            </Link>
                        </td>
                      }
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })
                  }
                </tr>
              )
            })
          }
         
        </tbody>
    </table>
    </main>
  )
}

export default Table;