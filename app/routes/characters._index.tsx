import { Form, Link, useActionData, useFetcher, useLocation, useParams } from "@remix-run/react";
import { gql, useQuery, useLazyQuery } from "@apollo/client/index.js";
import CharacterItemCard from "~/components/CharacterItemCard";
import { Character, Info } from "generated/types";
import { redirect, type ActionFunctionArgs, json } from "@remix-run/node";
import _ from "lodash";
import AdvancedPagination from "~/components/AdvancedPagination";
import { useFavorites } from "~/hooks/useFavorites";
import { jsonWithToast, redirectWithToast } from "remix-toast";

const CHARACTERS_QUERY = gql`
    query GetCharacters($page: Int!, $name: String) {
        characters(page: $page, filter: { name: $name }) {
            info {
                count
                pages
                next
                prev
            }
            results {
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
        case "search":
            const name = formData.get("name");
            return redirect(`?q=${name}`);
    }
    return null;
}

const CharactersPage = () => {
    const location = useLocation();
    const fetcher = useFetcher();
    const [getCharacterSuggestions, { loading: loadingSuggestions, data: suggestionsData }] = useLazyQuery(CHARACTERS_QUERY);
    const { favorites, toggleFavorite } = useFavorites();

    const urlParams = new URLSearchParams(location.search);
    const page = Number(urlParams.get("page")) || 1;
    const q = urlParams.get("q") || "";

    const { loading, error, data } = useQuery(CHARACTERS_QUERY, {
        variables: {
            page,
            name: q,
        },
    });

    const characters: Character[] = data?.characters.results;
    const info: Info = data?.characters.info;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        getCharacterSuggestions({
            variables: {
                page: 1,
                name: e.target.value,
            },
        });
    };
    const debouncedOnChange = _.debounce(onChange, 500);

    return (
        <>
            {!loading && (
                <>
                    <div className="bg-light mb-3 m-0 py-2 d-flex justify-content-center flex-column align-items-center">
                        <div className="h1 fw-bold">Search for your favorite character:</div>
                        <fetcher.Form method="post">
                            <input
                                name="name"
                                type="text"
                                className="me-2 p-1 border-success rounded"
                                defaultValue={q || ""}
                                list="suggestions"
                                onChange={debouncedOnChange}
                            />

                            <input type="hidden" name="action" value="search" />

                            {!loadingSuggestions && (
                                <datalist id="suggestions">
                                    {suggestionsData?.characters?.results &&
                                        (suggestionsData?.characters?.results as Character[]).map((item) => {
                                            return <option key={item.id} value={item.name!} />;
                                        })}
                                </datalist>
                            )}
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </fetcher.Form>
                    </div>
                    {
                        <div className="container">
                            <div className="row">
                                {characters &&
                                    characters.map((resident) => {
                                        return (
                                            <CharacterItemCard
                                                key={resident?.id}
                                                resident={resident!}
                                                isFavorite={favorites.includes(resident.id!)}
                                                toggleFavorite={() => toggleFavorite(resident.id!)}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    }

                    <AdvancedPagination route={"characters"} info={info} />
                </>
            )}
        </>
    );
};

export default CharactersPage;

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
