import { useSearchParams } from "@remix-run/react";
import Filter from "./Filter";
import { dimensions } from "~/data/dimensions";
import { types } from "~/data/location-types";

const LocationsFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="filter-container">
            <Filter type="dimension" data={dimensions} />
            <Filter type="type" data={types} />
        </div>
    );
};

export default LocationsFilter;
