import {Text} from '@chakra-ui/react'

export function Logo(){
    return(
        <Text
                    fontSize={["2xl", "3xl"]}
                    fontWeight="bold"
                    
                    letterSpacing="tight"
                    w="64"
                    _hover={{
                         cursor: "pointer"
                    }}
                    onClick={() => document.body.classList.toggle('active')}
               >
                    dashgo
                    <Text
                         as="span"
                         ml="1"
                         color="pink.500"
                    >.</Text>
        </Text>
    )
}