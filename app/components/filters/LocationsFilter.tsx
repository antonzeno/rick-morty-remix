import { useSearchParams } from "@remix-run/react";
import Filter from "./Filter";
import { dimensions } from "~/data/dimensions";
import { types } from "~/data/location-types";

const LocationsFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dimensionParams = searchParams.getAll("dimension");
    const typeParams = searchParams.getAll("type");

    const resetParams = (key: string | undefined) => {
        if (!key) {
            setSearchParams([]);
            return;
        }
        const urlSearchParams = new URLSearchParams(location.search);
        urlSearchParams.delete(key);
        const newSearchParams = urlSearchParams.toString();

        setSearchParams(newSearchParams);
    };

    const renderParams = (params: string[], key: string) => {
        return params.map((param) => (
            <div className="p-1 m-1 d-flex justify-content-between border rounded bg-light" key={param}>
                <div className="fw-bold">{param}</div>
                <div role="button" className="fw-bold" onClick={() => resetParams(key)}>
                    X
                </div>
            </div>
        ));
    };

    return (
        <div className="filter-container">
            {(dimensionParams.length > 0 || typeParams.length > 0) && (
                <div className="active-filters d-flex flex-column border mb-2">
                    <div className="fw-bold bg-light p-2 d-flex justify-content-between">
                        <div>Selected filters:</div>
                        <div className="fw-bold" role="button" onClick={() => resetParams(undefined)}>
                            Clear all
                        </div>
                    </div>
                    {renderParams(dimensionParams, "dimension")}
                    {renderParams(typeParams, "type")}
                </div>
            )}

            <Filter type="dimension" data={dimensions} />
            <Filter type="type" data={types} />
        </div>
    );
};

export default LocationsFilter;
