import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
    isCurrent?: boolean;
    number: number;
    onPageChange: (page: number) => void;
}

export function PaginationItem({isCurrent = false, number, onPageChange}:PaginationItemProps){
    if(isCurrent){
        return(
            <Button 
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="blue"
                disabled
                _disabled={{
                    bgColor: 'blue.300',
                    cursor: 'default'
                }}
            >
                {number}
            </Button>
        )
    }

    return(
        <Button 
            size="sm"
            fontSize="xs"
            width="4"
            bgColor="gray.500"
            color={'white'}
            _hover={{
                bg: 'gray.600'
            }}
            onClick={() => onPageChange(number)}
        >
            {number}
        </Button>
    )
}