import { ChildrenProps } from "~/types/types";
import Navbar from "~/components/Navbar";

export function Layout({ children }: ChildrenProps) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
}
