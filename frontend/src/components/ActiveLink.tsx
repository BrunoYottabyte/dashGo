import Link, {LinkProps} from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps{
    children: ReactElement;
}

export function ActiveLink ({children, ...rest}: ActiveLinkProps){
    const {asPath} = useRouter();
  
    const isActive = asPath === rest.href || asPath.includes(String(rest.href));

    return(
        <Link {...rest}>
            {cloneElement(children, {
                style: {color: isActive ? 'var(--blue-500)': 'var(--color-50)'}
            })}
        </Link>
    )
}