import { Character } from "generated/types";
import React from "react";

interface CharacterItemCardProps {
    resident: Character;
}

const CharacterItemCard: React.FC<CharacterItemCardProps> = ({ resident }) => {
    return (
        <div className="col-12 col-sm-6 col-md-3 mb-3">
            <div className="card shadow-sm">
                <div className="card-head">
                    <img src={resident?.image ?? ""} alt="" className="w-100" />
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
