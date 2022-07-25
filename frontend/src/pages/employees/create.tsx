import {
  Box,
  Flex,
  Heading,
  Button,
  Divider,
  VStack,
  SimpleGrid,

} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api, setupClientApi } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { MdOutlineArrowBack } from "react-icons/md";
import { Select } from "../../components/Form/Select";
import { withSSRAuth } from "../../utils/withSSRAuth";

type CreateUserFormData = {
  gender: string;
  fullname: string;
  occupation: string;
  internal: string;
};

const createUserFormSchema = yup.object().shape({
  fullname: yup.string().required("Mandatory name"),
  gender: yup.string().required("Mandatory gender"),
  occupation: yup.string().required("Mandatory Occupation"),
  internal: yup.string().required("Required field")
});

export default function CreateEmployee({employees}) {


  const router = useRouter();

  const createEmployee = useMutation(
    async (employee: CreateUserFormData) => {
      const response = await api.post("/funcionario", {
        
          nome: employee.fullname,
          funcaoId: employee.occupation,
          funcionarioProprio: employee.internal,
          sexo: employee.gender,

        }
      );
        console.log(response);
      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("employees");
        router.push("/employees");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    createEmployee.mutateAsync(values);
  
  };


  return (
    <Box>
      <Head>
        <title>dashgo | Create user</title>
      </Head>

      <Layout>
        <Link href="/employees">
          <div className="back">
            <MdOutlineArrowBack /> <h1>Back</h1>
          </div>
        </Link>
        <Box
          as="form"
          flex="1"
          borderRadius="8"
          color={"var(--color-50)"}
          bg="var(--bg-second)"
          shadow={"var(--box-shadow-light)"}
          p={["4", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
          __css={{ transition: "0.4s 0.6s ease" }}
        >
          <Heading size="lg" fontWeight="normal" color="var(--color-50)">
            Criar usuário
          </Heading>

          <Divider my="5" borderColor="gray.700" />

          <VStack spacing={8}>
            <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%">
              <Input
                name="fullname"
                type="text"
                label="Full name"
                {...register("fullname")}
                error={errors.name}
              />
               <Select name="gender" label="Gender" {...register('gender')} error={errors.occupation} data={['M', 'F']} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%">
              <Select name="occupation" label="Occupation" {...register('occupation')} error={errors.occupation} data={employees?.allFunction} />
              <Select name="internal" label="Internal" {...register('internal')} error={errors.internal} data={['Sim', 'Não']} />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end" gap="4">
            <Link href="/users" passHref>
              <Button
                as="button"
                bg={"var(--bg-main)"}
                _hover={{ opacity: 0.65 }}
                color={"var(--color-100)"}
              >
                Cancelar
              </Button>
            </Link>
            <Button
              bg={"var(--blue-500)"}
              _hover={{ opacity: 0.9 }}
              color={"var(--color-100)"}
              type="submit"
              isLoading={formState.isSubmitting}
              disabled={formState.isSubmitting}
            >
              Salvar
            </Button>
          </Flex>
        </Box>
      </Layout>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
     const apiServer = setupClientApi(ctx);
     const {data} = await apiServer.get('/funcao');
   
     console.log(data);
     return {
          props: {
               employees: data
          }
     }
})