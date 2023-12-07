import { useSearchParams } from "@remix-run/react";
import { Info } from "generated/types";

interface PaginationProps {
    route: string;
    info?: Info;
}

const Pagination = ({ info }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    let page = Number(searchParams.get("page"));

    const handlePagination = (newPage: number) => {
        setSearchParams((params) => {
            const updatedParams = new URLSearchParams(params);
            updatedParams.set("page", String(newPage));
            return updatedParams;
        });
    };

    if (!info || (info?.prev === null && info?.next === null)) {
        return <></>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center mb-2">
            <button onClick={() => handlePagination(page - 1)} className={`btn btn-success mx-2 ${info?.prev === null && "disabled"}`}>
                Previous
            </button>
            <button
                onClick={() => handlePagination(page ? page + 1 : 2)}
                className={`btn btn-success mx-2 ${info?.next === null && "disabled"}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
