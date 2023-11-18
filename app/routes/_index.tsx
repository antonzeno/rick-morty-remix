import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [{ title: "Home" }, { name: "description", content: "Welcome to Rick and Morty" }];
};

export default function Index() {
    return (
        <>
            <div className="banner"></div>
            <div className="container">
                <div className="banner-content col-6 text-muted">
                    <h1>Discover Rick and Morty's extraordinary world</h1>
                    <Link to="/locations" className="btn btn-success rounded-pill text-light">
                        Discover
                    </Link>
                </div>
            </div>
        </>
    );
}
