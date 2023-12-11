import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link, useLocation } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";

import LocationsFilter from "~/components/filters/LocationsFilter";
import LocationItemCard from "~/components/LocationItemCard";
import LocationLoadingSkeleton from "~/components/skeletons/LocationLoadingSkeleton";
import useLocations from "~/hooks/useLocations";
import skeletonCss from "react-loading-skeleton/dist/skeleton.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: skeletonCss }];

export const meta: MetaFunction = () => {
    return [{ title: "Locations" }, { name: "description", content: "Explore locations" }];
};

export default function LocationsPage() {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const type = urlParams.get("type") || "";
    const dimension = urlParams.get("dimension") || "";
    const { loading, error, info, results, fetchMore } = useLocations({ page: 1, type, dimension });
    const [reachedBottom, setReachedBottom] = useState(false);

    const fetchNewData = async () => {
        if (info?.next! !== null) {
            fetchMore({
                page: info?.next!,
                type,
                dimension,
            });
        }
    };

    useEffect(() => {
        if (reachedBottom && !loading && !error && info) {
            fetchNewData().then(() => setReachedBottom(false));
        }
    }, [reachedBottom, loading, error, info, fetchMore]);

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrolledToBottom = Math.ceil(scrollTop + windowHeight) >= documentHeight;

        if (scrolledToBottom) {
            setReachedBottom(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    if (loading) {
        return <LocationLoadingSkeleton />;
    }

    return (
        <div>
            <div className="row d-flex justify-content-center align-items-center text-center bg-light mb-2 m-0" style={{ height: "200px" }}>
                <div className="h1 fw-bold">Locations infinite scroll pagination</div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <LocationsFilter />
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            {results && results.length > 0 ? (
                                results.map((location) => <LocationItemCard key={location.id as string} location={location} />)
                            ) : (
                                <div className="d-flex justify-content-center align-items-center fw-bold">
                                    No results found for your search
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div>Looks like there is nothing to see here.</div>
            <Link to="/locations" className="btn btn-outline-success my-2">
                Locations
            </Link>
        </div>
    );
}
