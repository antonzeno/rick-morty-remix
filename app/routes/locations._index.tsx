import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLocation } from "@remix-run/react";
import { gql, useQuery } from "@apollo/client/index.js";
import { Info, Location, Locations } from "generated/types";
import Pagination from "~/components/Pagination";
import LocationsFilter from "~/components/filters/LocationsFilter";
import LocationItemCard from "~/components/LocationItemCard";

export const meta: MetaFunction = () => {
    return [{ title: "Locations" }, { name: "description", content: "Explore locations" }];
};

const LOCATIONS_QUERY = gql`
    query GetLocations($page: Int!, $type: String, $dimension: String) {
        locations(page: $page, filter: { type: $type, dimension: $dimension }) {
            info {
                count
                pages
                next
                prev
            }
            results {
                id
                name
                type
                dimension
            }
        }
    }
`;

export default function LocationsPage() {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const page = Number(urlParams.get("page")) || 1;
    const type = urlParams.get("type") || "";
    const dimension = urlParams.get("dimension") || "";

    const { loading, error, data } = useQuery(LOCATIONS_QUERY, {
        variables: {
            page,
            type,
            dimension,
        },
    });

    const info: Info | undefined = data?.locations?.info ?? undefined;
    const results: Location[] | null = (data?.locations?.results ?? [])!.filter((result: any): result is Location => result !== null);

    return (
        <div>
            <div className="row d-flex justify-content-center align-items-center text-center bg-light mb-2 m-0" style={{ height: "200px" }}>
                <div className="h1 fw-bold">Locations</div>
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

                <Pagination route={"/locations"} info={info} />
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
