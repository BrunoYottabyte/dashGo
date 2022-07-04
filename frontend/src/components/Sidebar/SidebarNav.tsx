import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

import styles from './styles.module.scss';

export function SidebarNav(){
    return(

        <div className={styles.sidebarNav}>
            <NavSection title="Geral">
                <NavLink href="/dashboard" icon={<RiDashboardLine/>} children="Dashboard" />
                <NavLink href="/employees" icon={<RiContactsLine/>} children="Employees" />
            </NavSection>

            <NavSection title="Automação">
                <NavLink href="/forms" icon={<RiInputMethodLine/>} children="Formulários" />
                <NavLink href="/automation" icon={<RiGitMergeLine/>} children="Automação" />
            </NavSection>
        </div>
    )
}