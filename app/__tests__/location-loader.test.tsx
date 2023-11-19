import { DataFunctionArgs } from "@remix-run/node";
import { Location } from "generated/types";
import { loader } from "~/routes/locations.$locationId";

const CLIENT_URL = "http://localhost:3000";

describe("Test locations path loader", () => {
    it("should fetch location with id 1", async () => {
        const mockedLocation = {
            dimension: "Dimension C-137",
            id: "1",
            name: "Earth (C-137)",
            type: "Planet",
        };

        const mockRequest = new Request(`${CLIENT_URL}/locations/${mockedLocation.id}`);

        const data = (await loader({
            request: mockRequest,
            params: {
                locationId: "1",
            },
            context: {},
        } as DataFunctionArgs)) as { location: Location };

        expect(data).toHaveProperty("location");
        expect(data.location).toHaveProperty("dimension");
        expect(data.location).toHaveProperty("name");
        expect(data.location).toHaveProperty("residents");
        expect(data.location.name).toBe(mockedLocation.name);
    });

    it("should catch error when id is not a number", async () => {
        const mockRequest = new Request(`${CLIENT_URL}/locations/a`);

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
