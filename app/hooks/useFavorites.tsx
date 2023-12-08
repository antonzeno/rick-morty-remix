import { useState, useEffect } from "react";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.includes(id);
            const updatedFavorites = isFavorite ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id];

            return updatedFavorites;
        });
    };

    return {
        favorites,
        toggleFavorite,
    };
}
