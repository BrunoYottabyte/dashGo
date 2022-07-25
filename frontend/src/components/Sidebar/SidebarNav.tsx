import { AiOutlineFileSearch } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { BsClockHistory } from 'react-icons/bs'
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

import styles from './styles.module.scss';
import { Logo } from "./Logo";

export function SidebarNav(){
    return(

        <div className={styles.sidebarNav}>
            <Logo />
            <NavSection title="Geral">
                <NavLink href="/dashboard" icon={<RiDashboardLine/>} children="Dashboard" />
                <NavLink href="/employees" icon={<RiContactsLine/>} children="Employees" />
                <NavLink href="/trainings" icon={<AiOutlineFileSearch/>} children="Training Available" />
                <NavLink href="/positions" icon={<FaUserTie/>} children="Available Positions" />
                <NavLink href="/expired" icon={<BsClockHistory/>} children="Expired Training" />
            </NavSection>
        </div>
    )
}