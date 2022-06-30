import { Stack } from "@chakra-ui/layout"
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav(){
    return(
        <Stack spacing="12" align="flex-start">
        <NavSection title="Geral">
            <NavLink href="/dashboard" icon={RiDashboardLine} children="Dashboard" />
            <NavLink href="/users" icon={RiContactsLine} children="Usuários" />
        </NavSection>

        <NavSection title="Automação">
            <NavLink href="/forms" icon={RiInputMethodLine} children="Formulários" />
            <NavLink href="/automation" icon={RiGitMergeLine} children="Automação" />
        </NavSection>
    </Stack >
    )
}