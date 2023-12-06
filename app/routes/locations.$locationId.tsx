import { Link, useParams } from "@remix-run/react";
import { gql, useQuery } from "@apollo/client/index.js";
import LocationStats from "~/components/LocationStats";
import CharacterItemCard from "~/components/CharacterItemCard";
import { Location } from "generated/types";

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

const LocationPage = () => {
    const { locationId } = useParams();

    const { loading, error, data } = useQuery(LOCATION_QUERY, {
        variables: {
            id: locationId,
        },
    });

    const location: Location = data?.location;

    return (
        <>
            {!loading && (
                <>
                    <LocationStats location={location} />

                    <div className="container">
                        <div className="row">
                            {location &&
                                location.residents.map((resident) => {
                                    return <CharacterItemCard key={resident?.id} resident={resident!} />;
                                })}
                        </div>
                    </div>
                </>
            )}
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
