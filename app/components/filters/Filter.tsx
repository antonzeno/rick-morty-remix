import { useSearchParams } from "@remix-run/react";
import { useState } from "react";

interface FilterProps {
    type: string;
    data: string[];
}

const Filter = ({ type, data }: FilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get(type);
    const [expanded, setExpanded] = useState(false);

    const handleFilterExpand = () => {
        setExpanded(!expanded);
    };

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.delete("page");

    const handleFilterSelect = (value: string) => {
        const updatedParams = new URLSearchParams(updatedSearchParams.toString());
        updatedParams.set(type, value);
        setSearchParams(updatedParams);
    };

    return (
        <div className="border mb-2">
            <div onClick={() => handleFilterExpand()} className="fw-bold bg-light p-2 d-flex justify-content-between" role="button">
                <div>{type.toUpperCase()}</div>
                <div>{expanded ? "\u25B2" : "\u25BC"}</div>
            </div>
            <div className={`${expanded ? "d-block p-2" : "d-none"}`}>
                {data.map((value) => (
                    <div key={value}>
                        <a
                            role="button"
                            onClick={() => handleFilterSelect(value)}
                            className={`filter-item ${value === param ? "active-link" : ""}`}
                        >
                            {value}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;
