import { DataFunctionArgs } from "@remix-run/node";
import { Locations } from "generated/types";
import { loader } from "~/routes/locations._index";

describe("Test locations path loader", () => {
    it("should fetch locations with default parameters", async () => {
        const mockedLocation = {
            dimension: "Dimension C-137",
            id: "1",
            name: "Earth (C-137)",
            type: "Planet",
        };

        const mockRequest = new Request(`https://localhost:3000/locations`);

        const data = (await loader({
            request: mockRequest,
        } as DataFunctionArgs)) as { locations: Locations };

        expect(data).toHaveProperty("locations");
        expect(data.locations).toHaveProperty("info");
        expect(data.locations).toHaveProperty("results");

        if (data.locations.results) {
            const firstLocation = data.locations.results.find((location) => location?.id === "1");
            if (firstLocation) {
                expect(firstLocation).toMatchObject(mockedLocation);
            }
        } else {
            fail("Results array or empty");
        }
    });

    it("should fetch locations with dimension and type parameters", async () => {
        const mockedLocation = {
            dimension: "Dimension C-137",
            id: "1",
            name: "Earth (C-137)",
            type: "Planet",
        };

        let params = new URLSearchParams({
            dimension: "Dimension C-137",
            type: "Planet",
        });

        const mockRequest = new Request(`https://localhost:3000/locations?${params.toString()}`);

        const data = (await loader({
            request: mockRequest,
        } as DataFunctionArgs)) as { locations: Locations };

        expect(data).toHaveProperty("locations");
        expect(data.locations).toHaveProperty("info");
        expect(data.locations).toHaveProperty("results");

        if (data.locations.results) {
            const firstLocation = data.locations.results.find((location) => location?.id === "1");
            if (firstLocation) {
                expect(firstLocation).toMatchObject(mockedLocation);
            }
        } else {
            fail("Results array or empty");
        }
    });

    it("should catch error when page param is not a number", async () => {
        const mockRequest = new Request("https://localhost:3000/locations?page=notnumber");

        try {
            await loader({
                request: mockRequest,
            } as DataFunctionArgs);
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Oh no! Something went wrong!");
        }
    });
});
