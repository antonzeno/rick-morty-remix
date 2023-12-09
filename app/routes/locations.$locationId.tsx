import { Link, useParams } from "@remix-run/react";
import { gql, useQuery } from "@apollo/client/index.js";
import LocationStats from "~/components/LocationStats";
import CharacterItemCard from "~/components/CharacterItemCard";
import { Location } from "generated/types";
import { useFavorites } from "~/hooks/useFavorites";
import { jsonWithToast } from "remix-toast";
import { ActionFunctionArgs } from "@remix-run/node";

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

export async function action({ request }: ActionFunctionArgs) {
    let formData = await request.formData();
    const action = formData.get("action");

    switch (action) {
        case "favorite":
            const isFavorite = formData.get("isFavorite") === "true";
            return jsonWithToast("Favorites", {
                message: isFavorite ? "Character removed from favorites" : "Character added to favorites",
                type: "success",
            });
    }
    return null;
}

const LocationPage = () => {
    const { locationId } = useParams();
    const { favorites, toggleFavorite } = useFavorites();

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
                                    return (
                                        <CharacterItemCard
                                            key={resident?.id}
                                            resident={resident!}
                                            isFavorite={favorites.includes(resident?.id!)}
                                            toggleFavorite={() => toggleFavorite(resident?.id!)}
                                        />
                                    );
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
