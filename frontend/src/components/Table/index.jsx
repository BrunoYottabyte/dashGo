import Link from 'next/link';
import React, {useEffect, useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import { useFetch } from '../../contexts/FetchContext';
import {ImSortAlphaAsc, ImSortAlphaDesc} from 'react-icons/im'
import GlobalFilter from './GlobalFilter';
import {RiFilterOffFill} from 'react-icons/ri'

import styles from './styles.module.scss';
import { api } from '../../services/api';

const Table = ({arrRows, arrColumns, options}) => {
  const columns = useMemo(() => arrColumns, []);
  const data = useMemo(() => arrRows, [arrRows]);
  
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
    prepareRow } = tableInstance


  return (
    <main className={styles.tableContainer}>
    <GlobalFilter value={options.search} setValue={options.setSearch} />
    <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => {
                    if(column.filter){
                      return(
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          <div>
                            {column.render('Header')}
                      
                            {column.filter && <span>
                              {column.isSorted ? (column.isSortedDesc ? <ImSortAlphaDesc/> : <ImSortAlphaAsc/>): <RiFilterOffFill/>}
                            </span>}
                          </div>
                        </th>
                      )
                    }

                    return(
                      <th {...column.getHeaderProps()}>
                        <div>
                          {column.render('Header')}
                        </div>
                      </th>
                    )

                    })
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
                  
                      // if(cell.column.Header === 'Information'){
                      //   return <td {...cell.getCellProps()}
                      //   onTouchMove={() => {
                      //     handlePrefetchEmployee(cell.row.values.id);
                      //     handlePrefetchRecords(cell.row.values.id);
                      //     setFetch(cell.row.values.id);
                      //   }}
                      //   onMouseEnter={() => {
                      //     handlePrefetchEmployee(cell.row.values.id);
                      //     handlePrefetchRecords(cell.row.values.id);
                      //     setFetch(cell.row.values.id);
                      //   }}
                      //   >
                      //     <Link href="/employees/info">
                      //           View
                      //       </Link>
                      //   </td>
                      // }
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