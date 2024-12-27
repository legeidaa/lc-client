import { fireEvent, waitFor } from "@testing-library/react";
import RegistrationForms from "./RegistrationForms";
import { useParams } from "next/navigation";
import { renderWithProviders } from "tests/utils";
import { server } from "tests/server";
import { http, HttpResponse } from "msw";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            query: {},
            push: pushMock,
        }
    }, 
    useParams: jest.fn(),
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe("RegistrationForms Component", () => {
    jest.mocked(useParams).mockReturnValue({ hash: "test" });

    test("renders the RegistrationForms component", async () => {
        const result = renderWithProviders(<RegistrationForms />);

        await waitFor(() => {
            expect(result.getByText(/ВСЕ ПОНЯТНО/i)).toBeInTheDocument();
            expect(
                result.getByDisplayValue("test@mail.ru")
            ).toBeInTheDocument();
        });
    });

    test("submits the form and creates a pair", async () => {

        server.use(
            http.post("http://localhost:3001/api/user/pair", () => {
                console.log("CALLED");
                return HttpResponse.json([
                    {
                        userId: 1,
                        gameId: 1,
                        name: "Player Name",
                        email: "player@example.com",
                        sex: "male",
                        role: "player",
                    },
                    {
                        userId: 2,
                        gameId: 1,
                        name: "Partner Name",
                        email: "partner@example.com",
                        sex: "female",
                        role: "partner",
                    },
                ]);
            })
        );

        const result = renderWithProviders(<RegistrationForms />);

        const playerNameInput = result.container.querySelector("#player-name");
        const partnerNameInput =
            result.container.querySelector("#partner-name");
        const playerEmailInput =
            result.container.querySelector("#player-email");
        const partnerEmailInput =
            result.container.querySelector("#partner-email");
        const playerSexInput = result.container.querySelector("#player-male");
        const partnerSexInput =
            result.container.querySelector("#partner-female");

        fireEvent.change(playerNameInput as HTMLInputElement, {
            target: { value: "Player Name" },
        });

        fireEvent.change(playerEmailInput as HTMLInputElement, {
            target: { value: "player@example.com" },
        });
        fireEvent.change(playerSexInput as HTMLInputElement);
        fireEvent.change(partnerNameInput as HTMLInputElement, {
            target: { value: "Partner Name" },
        });
        fireEvent.change(partnerEmailInput as HTMLInputElement, {
            target: { value: "partner@example.com" },
        });
        fireEvent.change(partnerSexInput as HTMLInputElement);
        fireEvent.submit(result.getByTestId("registration-form"));

        await waitFor(
            () => {
                expect(pushMock).toHaveBeenCalled();
            },
            { timeout: 1000 }
        );
    });
});
