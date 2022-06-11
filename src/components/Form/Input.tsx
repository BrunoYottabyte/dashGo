import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react"
import { FieldError } from 'react-hook-form'

import { forwardRef, ForwardRefRenderFunction,  } from "react";

interface InputProps extends ChakraInputProps {
     label?: string;
     name: string;
     variant?: string;
     error?: FieldError;
}

 const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ label, name, variant = "filled", error = null, ...rest }, ref) => {
     return (
          <FormControl isInvalid={!!error}>
               <FormLabel htmlFor='email'>{label}</FormLabel>
               <ChakraInput
                    name={name}
                    focusBorderColor="pink.500"
                    bgColor="gray.900"
                    variant={variant}
                    _hover={{
                         bg: "gray.900"
                    }}
                    size="lg"
                    ref={ref}
                    {...rest}
               />

              {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
              )}
              
          </FormControl>
     )
}

export const Input = forwardRef(InputBase);