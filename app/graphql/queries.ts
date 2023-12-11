import { gql } from "@apollo/client/index.js";

export const GET_LOCATIONS = gql`
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
