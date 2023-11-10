import { buttonVariants } from "@/components/ui/button"
import {default as NextLink, LinkProps} from "next/link"
import React, { ReactNode } from "react";

interface CustomLinkProps extends LinkProps {
    children: ReactNode
}

const Link: React.FC<CustomLinkProps> = (props) => {
    return (
        <NextLink {...props} className={buttonVariants({ variant: "outline" })}>{props.children}</NextLink>
    )
}

export default Link;