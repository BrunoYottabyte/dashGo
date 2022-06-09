import { Input as InputForm, FormControl, FormLabel, InputProps as ChakraInputProps } from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
     label?: string;
     name: string;
     variant?: string;
}

export function Input({ label, name, variant = "filled", ...rest }: InputProps) {
     return (
          <FormControl>
               <FormLabel htmlFor='email'>{label}</FormLabel>
               <InputForm
                    name={name}
                    focusBorderColor="pink.500"
                    bgColor="gray.900"
                    variant={variant}
                    _hover={{
                         bg: "gray.900"
                    }}
                    size="lg"
                    {...rest}
               />
          </FormControl>
     )
}