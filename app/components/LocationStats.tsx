import { Character, Location } from "generated/types";

const LocationStats = ({ location }: { location: Location }) => {
    const { aliveCount, deadCount, guestCount } = getResidentStatusStats(location.residents as Character[]);
    const { robotCount, humanCount, alienCount } = getResidentTypeStats(location.residents as Character[]);

    return (
        <div className="bg-light mb-3 m-0 py-2">
            <div className="container">
                <div className="row mb-2 ">
                    <div className="col text-center">
                        <h1 className="fw-bold">{location.name}</h1>
                        <div className="text-muted fw-bold">{location.dimension}</div>
                        <div className="text-muted fw-bold">{location.type}</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col col-md-6">
                        <div className="text-center">
                            <div className="h6">Statuses:</div>
                            <span className="badge bg-success me-2">Alive: {aliveCount}</span>
                            <span className="badge bg-danger me-2">Dead: {deadCount}</span>
                            <span className="badge bg-info">Guests: {guestCount}</span>
                        </div>
                    </div>
                    <div className="col col-md-6">
                        <div className="text-center">
                            <div className="h6">Types:</div>
                            <span className="badge bg-primary me-2">Robots: {robotCount}</span>
                            <span className="badge bg-secondary me-2">Humans: {humanCount}</span>
                            <span className="badge bg-warning">Aliens: {alienCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function getResidentStatusStats(residents: Character[]) {
        return residents.reduce(
            (counts, resident) => {
                switch (resident.status) {
                    case "Alive":
                        counts.aliveCount++;
                        break;
                    case "Dead":
                        counts.deadCount++;
                        break;
                    default:
                        counts.guestCount++;
                        break;
                }
                return counts;
            },
            { aliveCount: 0, deadCount: 0, guestCount: 0 }
        );
    }

    function getResidentTypeStats(residents: Character[]) {
        return residents.reduce(
            (counts, resident) => {
                switch (resident.species) {
                    case "Robot":
                        counts.robotCount++;
                        break;
                    case "Alien":
                        counts.alienCount++;
                        break;
                    case "Human":
                        counts.humanCount++;
                        break;
                }
                return counts;
            },
            { robotCount: 0, alienCount: 0, humanCount: 0 }
        );
    }
};

export default LocationStats;
