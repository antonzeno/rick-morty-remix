import { ApolloError, useQuery } from "@apollo/client/index.js";
import { Info, Location, Locations } from "generated/types";
import { GET_LOCATIONS } from "~/graphql/queries";
import { useApolloClient } from "@apollo/client/index.js";
import { useEffect, useState } from "react";

export interface LocationsQueryVars {
    page: number;
    type: string;
    dimension: string;
}

type LocationsResult = {
    locations: {
        info: Info;
        results: Location[];
    };
};

const useLocations = ({ page, type, dimension }: LocationsQueryVars) => {
    const client = useApolloClient();
    const [data, setData] = useState<Locations | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApolloError | null>(null);
    const [query, setQuery] = useState<any>(null);

    useEffect(() => {
        const query = client.watchQuery({
            query: GET_LOCATIONS,
            variables: { page, type, dimension },
            fetchPolicy: "cache-and-network",
        });

        const subscription = query.subscribe({
            next: ({ data, loading }) => {
                setLoading(loading);
                setData(data.locations);
            },
            error: (e: ApolloError) => setError(e),
        });

        setQuery(query);

        return () => {
            subscription.unsubscribe();
        };
    }, [client, page, type, dimension]);

    const info: Info | undefined = data?.info ?? undefined;
    const results: Location[] | null = (data?.results ?? [])!.filter((result: any): result is Location => result !== null);

    const fetchMore = async (variables: LocationsQueryVars) => {
        if (query) {
            try {
                await query.fetchMore({
                    variables,
                    updateQuery: (prev: any, { fetchMoreResult }: { fetchMoreResult?: LocationsResult }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                            ...prev,
                            locations: {
                                ...prev.locations,
                                info: fetchMoreResult.locations.info,
                                results: [...prev.locations.results, ...fetchMoreResult.locations.results],
                            },
                        };
                    },
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    return { loading, error, info, results, fetchMore };
};

export default useLocations;
