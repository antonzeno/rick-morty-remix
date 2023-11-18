import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request";
import { client } from "~/graphql/client";
import { Location, Character } from "generated/types";
import LocationStats from "~/components/LocationStats";
import { GlobalErrorBoundary } from "~/components/GlobalErrorBoundary";

const LOCATION_QUERY = gql`
    query GetLocation($id: ID!) {
        location(id: $id) {
            name
            dimension
            type
            residents {
                id
                name
                status
                species
                gender
                image
            }
        }
    }
`;

export async function loader({ params }: LoaderFunctionArgs) {
    try {
        const data = await client.request(LOCATION_QUERY, { id: params.locationId });
        return data;
    } catch (error) {
        throw new Error("Oh no! Something went wrong!");
    }
}

const LocationPage = () => {
    const { location } = useLoaderData<typeof loader>() as { location: Location };

    return (
        <>
            <LocationStats location={location} />

            <div className="container">
                <div className="row">
                    {location.residents.map((resident) => {
                        return (
                            <div key={resident?.id} className="col-12 col-sm-6 col-md-3 mb-3">
                                <div className="card shadow-sm">
                                    <div className="card-head">
                                        <img src={resident?.image ?? ""} alt="" className="w-100" />
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title fw-bold">
                                            {resident?.name} - ({resident?.gender})
                                        </h6>
                                        <p className="card-text">
                                            <span className={getStatusClassName(resident?.status as string)}>{resident?.status}</span> -{" "}
                                            {resident?.species}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );

    function getStatusClassName(status: string) {
        switch (status) {
            case "Dead":
                return "text-danger";
            case "Alive":
                return "text-success";
            case "unknown":
                return "text-muted";
            default:
                return "text-muted";
        }
    }
};

export default LocationPage;

export function ErrorBoundary() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="mb-2">Looks like there is nothing to see here.</div>
            <Link to="/locations" className="btn btn-outline-success my-2">
                Explore locations
            </Link>
        </div>
    );
}
