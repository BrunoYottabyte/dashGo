import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import { useAuth, signOut } from "../../contexts/AuthContext";

import styles from './styles.module.scss';

interface ProfileProps{
    showProfileData?: boolean
}

export function Profile({showProfileData = true}:ProfileProps ){

    return(
        <div className={styles.profile}>
                
                {showProfileData && (
                    <div className={styles.informations}>
                        <h1>Bruno Siqueira</h1>
                        <p>projetointegrador792@gmail.com</p>
                    </div>
                )}

                <Avatar
                onClick={signOut}
                size="md"
                name="Bruno Siqueira"
                src="https://github.com/brunoyottabyte.png"
            />
        </div>
    )
}