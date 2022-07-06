import { useQuery } from "react-query";
import { api } from "../api";

type Employee = {
    id: string;
    nome: string;
    cargo: string;
    createdAt: string;
}

async function getEmployees(page: number): Promise<Employee[]>{
    console.log('con', page);
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
        
   })

}