import { Character } from "generated/types";
import React from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md/index.js";

interface CharacterItemCardProps {
    resident: Character;
    isFavorite: boolean;
    toggleFavorite: (id: string) => void;
}

const CharacterItemCard: React.FC<CharacterItemCardProps> = ({ resident, isFavorite, toggleFavorite }) => {
    return (
        <div className="col-12 col-sm-6 col-md-3 mb-3">
            <div className="card shadow-sm">
                <div className="card-head position-relative">
                    <img src={resident?.image ?? ""} alt="" className="w-100" />
                    <button className="position-absolute top-0 end-0 btn btn-sm btn-light m-2" onClick={() => toggleFavorite(resident.id!)}>
                        {isFavorite ? <MdFavorite size={18} /> : <MdFavoriteBorder size={18} />}
                    </button>
                </div>
                <div className="card-body">
                    <h6 className="card-title fw-bold">
                        {resident?.name} - ({resident?.gender})
                    </h6>
                    <p className="card-text">
                        <span className={getStatusClassName(resident?.status as string)}>{resident?.status}</span> - {resident?.species}
                    </p>
                </div>
            </div>
        </div>
    );

    function getStatusClassName(status: string) {
        switch (status) {
            case "Dead":
                return "text-danger";
            case "Alive":
                return "text-success";
            case "unknown":
                return "text-muted";
            default:
                return "text-muted";
        }
    }
};

export default CharacterItemCard;
