import Skeleton from "react-loading-skeleton";

const LocationLoadingSkeleton = () => {
    return (
        <div>
            <div className="row d-flex justify-content-center align-items-center text-center bg-light mb-2 m-0" style={{ height: "200px" }}>
                <div className="h1 fw-bold">Locations</div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Skeleton height={250} count={2} />
                    </div>

                    <div className="col-md-3">
                        <div className="row">
                            <Skeleton height={150} count={5} />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="row">
                            <Skeleton height={150} count={5} />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="row">
                            <Skeleton height={150} count={5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationLoadingSkeleton;
