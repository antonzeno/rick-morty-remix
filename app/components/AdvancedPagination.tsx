import { useSearchParams } from "@remix-run/react";
import { Info } from "generated/types";

interface PaginationProps {
    route: string;
    info?: Info;
}

const AdvancedPagination = ({ info }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    let page = Number(searchParams.get("page") ?? 1);
    const totalPages = info?.pages ?? 0;
    const showPages = 5;

    const handlePagination = (newPage: number) => {
        setSearchParams((params) => {
            const updatedParams = new URLSearchParams(params);
            updatedParams.set("page", String(newPage));
            return updatedParams;
        });
    };

    const renderButtons = () => {
        const buttons = [];
        const startPage = Math.max(1, page - Math.floor(showPages / 2));
        const endPage = Math.min(totalPages, startPage + showPages - 1);

        if (startPage > 1) {
            buttons.push(
                <button key={0} onClick={() => handlePagination(1)} className={`btn btn-success mx-2 ${1 === page && "disabled"}`}>
                    &lt;&lt;
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    disabled={i === page}
                    className={`btn btn-success mx-2 ${i === page && "disabled"}`}
                    onClick={() => handlePagination(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            buttons.push(
                <button
                    key={totalPages + 1}
                    onClick={() => handlePagination(totalPages)}
                    className={`btn btn-success mx-2 ${totalPages === page && "disabled"}`}
                >
                    &gt;&gt;
                </button>
            );
        }
        return buttons;
    };

    return <div className="d-flex justify-content-center align-items-center mb-2">{renderButtons()}</div>;
};

export default AdvancedPagination;
