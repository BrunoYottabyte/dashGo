import { Select as ChakraSelect, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { resolvePtr } from 'dns/promises';
import {forwardRef, ForwardRefRenderFunction} from 'react'
import {FieldError} from 'react-hook-form';
import { isObject } from 'util';

interface SelectProps {
    label?: string;
    name?: string;
    error?: FieldError;
    data: [{}];
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({label, name, error = null, data, ...rest}, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel>{label}</FormLabel>
                <ChakraSelect
                name={name}
                placeholder="Select option"
                focusBorderColor="blue.500"
                bgColor="var(--bg-main)"
                borderColor={"var(--bg-second)"}
                shadow={'var(--box-shadow-input)'}
                color={'var(--color-50)'}
                size="lg"
                _hover={{
                    opacity: 0.8
                }}
                ref={ref}
                {...rest}
            >
                {
                    data?.length > 0 && isObject(data[0]) ? data.map(item => {
                        return(
                            <option  key={item._id} value={item._id}><span>
                                {item.nome}</span></option>
                        )
                    }) : data.map(item => {
                        return(
                            <option  key={item} value={item}>{item}</option>
                        )
                    })
                }
            </ChakraSelect>
            {!!error && 
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>}
        </FormControl>
    )
}

export const Select = forwardRef(SelectBase);