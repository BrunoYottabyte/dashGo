import { ReactNode } from "react";
import { ActiveLink } from "../ActiveLink";
import styles from './styles.module.scss';

interface NavLinkProps {
    icon: ReactNode;
    children: string;
    href: string
}

export function NavLink({icon, children, href, ...rest} : NavLinkProps){
    return(
        <ActiveLink href={href} passHref>
            <a className={styles.link} {...rest}>
                <span>{icon}</span>
                <p>{children}</p>
            </a>
        </ActiveLink>
    )
}