import { Box, Stack, Icon, Text, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiDashboardLine, RiContactsLine } from "react-icons/ri";

import styles from './styles.module.scss';

interface NavSectionProps {
    title: string;
    children: ReactNode;
}

export function NavSection({title, children}: NavSectionProps) {
    return(
        <div>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.group_link}>
                {children}
            </div>
        </div>
    )
}