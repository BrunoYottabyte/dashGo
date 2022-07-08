import moment from "moment";
import { useQuery } from "react-query";
import { api } from "../api";

type Employee = {
    id: string;
    nome: string;
    cargo: string;
    pendentes: [{}];
    treinamentos: string[];
    interno: string;
    horasConcluidas: number;
    sexo: string;
    createdAt: string;
}

async function getEmployees(page: number): Promise<Employee[]>{

        const { data, headers } = await api.get('/funcionario', {
             params: {
                  page
             }
        });
        const employees = data.employees.map(employee => {
             return{
                  id: employee._id,
                  nome: employee.nome,
                  cargo: employee.funcaoId?.nome,
                  pendentes: employee.listaPendentes,
                  sexo: employee.sexo,
                  interno: employee.funcionarioProprio,
                  treinamentos: employee.treinamentos,
                  horasConcluidas: employee.totCargaHorFunc,
                  createdAt: new Date(employee.dataCadastro).toLocaleDateString('pt-BR', {
                       day: '2-digit',
                       month: 'long',
                       year: 'numeric'
                  })
             }
        })

        return {
             employees,
             totalCount: Number(headers['x-total-count'])
        };
}

export function useUsers(page: number){
    return useQuery(['employees', page], () => getEmployees(page), {
        staleTime: 1000 * 2
   })

}

export async function getEmployeesId(id: string): Promise<Employee>{
         const { data } = await api.get(`/funcionario/${id}`);
         console.log(data);
         const employee = {
                   id: data.employee._id,
                   nome: data.employee.nome,
                   cargo: data.employee.funcaoId?.nome,
                   pendentes: data.employee.listaPendentes,
                   sexo: data.employee.sexo,
                   interno: data.employee.funcionarioProprio,
                   treinamentos: data.employee.treinamentos,
                   horasConcluidas: data.totalCargaHoraria,
                   createdAt: new Date(data.employee.dataCadastro).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                   })
              }
              console.log(employee)

         return employee;
 }

 export async function getRecordsEmployee(id: string): Promise<Employee>{
     const { data } = await api.get(`/registro/funcionario/${id}`);
     const records = data.registros.map((record) => {
          return {
               id: record._id,
               dataConclusao: moment(record.dataConclusao).format('DD/MM/YYYY'),
               dataVencimento: moment(record.dataVencimento).format('DD/MM/YYYY'),
               nome: record.treinamentoId.nome,
               validade: record.treinamentoId.validade,
               cargaMinima: record.treinamentoId.cargaHorariaMin,
               cargaHoraria: record.cargaHoraria
          }
     })


     return records;
}
