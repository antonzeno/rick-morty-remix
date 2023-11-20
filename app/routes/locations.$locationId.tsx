import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request";
import { client } from "~/graphql/client";
import { Location, Character } from "generated/types";
import LocationStats from "~/components/LocationStats";
import CharacterItemCard from "~/components/CharacterItemCard";

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
                        return <CharacterItemCard key={resident?.id} resident={resident!} />;
                    })}
                </div>
            </div>
        </>
    );
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
