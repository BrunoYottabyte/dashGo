import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
     label?: string;
     name: string;
     variant?: string;
     error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ label, name, variant = "filled", error = null, ...rest }, ref) => {
     return (
          <FormControl isInvalid={!!error}>
               <FormLabel htmlFor='email'>{label}</FormLabel>
               <ChakraInput
                    name={name}
                    focusBorderColor="blue.500"
                    bgColor="var(--bg-main)"
                    borderColor={"var(--bg-second)"}
                    variant={variant}
                    shadow={'var(--box-shadow-input)'}
                    color={'var(--color-50)'}
                    _hover={{
                         opacity: 0.8
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

export const Input = forwardRef(InputBase)