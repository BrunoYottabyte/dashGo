import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import { useAuth, signOut } from "../../contexts/AuthContext";

interface ProfileProps{
    showProfileData?: boolean
}

export function Profile({showProfileData = true}:ProfileProps ){

    return(
        <Flex>
            {showProfileData && (
                <Box mr="4" textAlign="right">
                <Text>Bruno Siqueira</Text>
                <Text
                    color="gray.300"
                    fontSize="small"
                >
                    projetointegrador792@gmail.com
                </Text>
                </Box>
            )}
         
            <Avatar
                onClick={signOut}
                size="md"
                name="Bruno Siqueira"
                src="https://github.com/brunoyottabyte.png"
            />

    </Flex>
    )
}