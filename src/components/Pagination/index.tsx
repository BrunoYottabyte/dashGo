import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";


interface PaginationProps {
    registerPerPage?: number;
    currentPage?: number;
}


export function Pagination({ currentPage = 1, registerPerPage = 10 }: PaginationProps) {

    return (
        <Stack direction={["column", "row"]} mt="8" justify="space-between" align="center">
            <Box>
                <strong>{(currentPage - 1) * registerPerPage + 1}</strong> - <strong>{currentPage * registerPerPage}</strong> de 100
            </Box>
            <Stack direction="row" spacing={2}>

                <PaginationItem number={1} isCurrent />
                <PaginationItem number={2} />
                <PaginationItem number={3} />
                <PaginationItem number={4} />
                <PaginationItem number={5} />



            </Stack>
        </Stack>
    );
}