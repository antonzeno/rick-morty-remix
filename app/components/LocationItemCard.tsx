import { Link } from "@remix-run/react";
import { Location } from "generated/types";

interface LocationItemProps {
    location: Location;
}

const LocationItemCard: React.FC<LocationItemProps> = ({ location }) => {
    return (
        <div className="col-sm-6 col-md-4 mb-3">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h6 className="card-title fw-bold">{location.name}</h6>

                    <div className="small text-muted card-text">Type: {location.type}</div>
                    <div className="small text-muted card-text">Dimension: {location.dimension}</div>

                    <Link to={`/locations/${location.id}`} className="btn btn-outline-success btn-sm w-100">
                        Explore
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LocationItemCard;
