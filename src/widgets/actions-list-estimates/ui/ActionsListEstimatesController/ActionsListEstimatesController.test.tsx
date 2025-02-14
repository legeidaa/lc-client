import { useParams } from "next/navigation";
import { renderWithProviders } from "tests/utils";
import { ActionsListEstimatesContoller } from "./ActionsListEstimatesContoller";
import { fireEvent, waitFor } from "@testing-library/dom";
import { server } from "tests/server";
import { http, HttpResponse } from "msw";
import { apiUrl } from "@/shared/config/consts";
import {
    grayActions,
    greenActions,
    yellowActions,
} from "__mocks__/api/apiStubs";
import { Action } from "@/entities/action";

const pathnameMock = jest.fn();
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            query: {},
            push: pushMock,
        };
    },
    usePathname() {
        return pathnameMock();
    },
    useParams: jest.fn(),
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe("ActionsListEstimatesController", () => {
    jest.mocked(useParams).mockReturnValue({ hash: "test", user: "player" });
    jest.mocked(pathnameMock).mockReturnValue("/pr-to-pl-estimate");

    test("renders loading spinner initially", () => {
        const result = renderWithProviders(<ActionsListEstimatesContoller />);
        expect(result.getByTestId(/loading-spinner/i)).toBeInTheDocument();
    });

    test("renders actions list with estimates inputs after loading", async () => {
        const result = renderWithProviders(<ActionsListEstimatesContoller />);

        await waitFor(
            () => {
                expect(
                    result.getByDisplayValue(/Action 3 yellow/i)
                ).toBeInTheDocument();
                expect(
                    result.getByDisplayValue(/Action 4 yellow/i)
                ).toBeInTheDocument();
                expect(result.getByDisplayValue(/^100$/i)).toBeInTheDocument();
            },
            { timeout: 1000 }
        );
    });

    test("updates estimate value on input change", async () => {
        const result = renderWithProviders(<ActionsListEstimatesContoller />);

        await waitFor(() => {
            const estimateInput = result.getByDisplayValue(/^100$/i);
            fireEvent.change(estimateInput, { target: { value: 99 } });
            expect(estimateInput).toHaveValue(99);
        });
    });

    test("doesnt save action with empty value", async () => {
        const result = renderWithProviders(<ActionsListEstimatesContoller />);

        await waitFor(() => {
            expect(
                result.getByDisplayValue(/Action 3 yellow/i)
            ).toBeInTheDocument();
            expect(
                result.getByDisplayValue(/Action 4 yellow/i)
            ).toBeInTheDocument();
        });

        const saveBtn = result.getByText(/^Готово$/i);
        fireEvent.click(saveBtn);

        const emptyFieldMessages = result.getAllByText(
            /Поле не должно быть пустым/i
        );

        // в одном инпуте есть значение, во втором не должно быть
        expect(emptyFieldMessages).toHaveLength(1);
    });

    test("saves actions estimates", async () => {
        const updatedActions: Action[] = yellowActions.map(
            (action: Action) => ({ ...action })
        );
        const newEstimateValue = 55;
        updatedActions.forEach(
            (action) => (action.estimate = newEstimateValue)
        );

        server.use(
            http.patch(apiUrl + "action", () => {
                return HttpResponse.json(updatedActions);
            })
        );

        const result = renderWithProviders(<ActionsListEstimatesContoller />);

        await waitFor(() => {
            expect(
                result.getByDisplayValue(/Action 3 yellow/i)
            ).toBeInTheDocument();
            expect(
                result.getByDisplayValue(/Action 4 yellow/i)
            ).toBeInTheDocument();
        });
        const inputs = result.getAllByPlaceholderText(/0/i);
        expect(inputs).toHaveLength(2);
        inputs.forEach((input) => {
            fireEvent.change(input, { target: { value: newEstimateValue } });
        });

        const saveBtn = result.getByText(/^Готово$/i);
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(
                result.getByText(/Данные успешно сохранены/i)
            ).toBeInTheDocument();
        });
    });

    test("partner/pr-to-pl page should contain gray and green actions", async () => {
        jest.mocked(useParams).mockReturnValue({
            hash: "test",
            user: "partner",
        });
        jest.mocked(pathnameMock).mockReturnValue("/pr-to-pl-estimate");

        const result = renderWithProviders(<ActionsListEstimatesContoller />);

        await waitFor(() => {
            expect(
                result.getByDisplayValue(/Action 1 green/i)
            ).toBeInTheDocument();
            expect(
                result.getByDisplayValue(/Action 2 green/i)
            ).toBeInTheDocument();

            expect(
                result.getByDisplayValue(/Action 5 gray/i)
            ).toBeInTheDocument();
            expect(
                result.getByDisplayValue(/Action 6 gray/i)
            ).toBeInTheDocument();

            // type green инпуты должны получать значение из поля partnerEstimate
            const inputs = result.getAllByPlaceholderText(
                /0/i
            ) as HTMLInputElement[];
            expect(inputs.some((input) => input.value === "50")).toBe(true);
            expect(inputs.some((input) => input.value === "100")).toBe(true);
        });
    });

    test("chenges partnerEstimate field on green type value save at partner/pr-to-pl page", async () => {
        jest.mocked(useParams).mockReturnValue({
            hash: "test",
            user: "partner",
        });
        jest.mocked(pathnameMock).mockReturnValue("/pr-to-pl-estimate");

        const copiedGreenActions: Action[] = greenActions.map(
            (action: Action) => ({ ...action })
        );
        const copiedGrayActions: Action[] = grayActions.map(
            (action: Action) => ({ ...action })
        );

        const newEstimateValue = 55;
        const actionToUpdateIndex = copiedGreenActions.findIndex(
            (action) => action.type === "green" && action.partnerEstimate === 50
        );
        copiedGreenActions[actionToUpdateIndex]!.partnerEstimate =
            newEstimateValue;

        const updatedActions = [...copiedGrayActions, ...copiedGreenActions];

        server.use(
            http.patch(apiUrl + "action", () => {
                return HttpResponse.json(updatedActions);
            })
        );

        const result = renderWithProviders(<ActionsListEstimatesContoller />);

        await waitFor(() => {
            expect(
                result.getByDisplayValue(/Action 1 green/i)
            ).toBeInTheDocument();
            expect(
                result.getByDisplayValue(/Action 2 green/i)
            ).toBeInTheDocument();

            expect(
                result.getByDisplayValue(/Action 5 gray/i)
            ).toBeInTheDocument();
            expect(
                result.getByDisplayValue(/Action 6 gray/i)
            ).toBeInTheDocument();
        });

        const inputs = result.getAllByPlaceholderText(
            /0/i
        ) as HTMLInputElement[];
        const inputToChange = inputs.find((input) => input.value === "50");

        inputs.forEach(input => {
            fireEvent.change(input, {
                target: { value: 60 },
            });
        })

        if (inputToChange) {
            fireEvent.change(inputToChange, {
                target: { value: newEstimateValue },
            });
        }

        const saveBtn = result.getByText(/^Готово$/i);
        fireEvent.click(saveBtn);


        await waitFor(() => {
            expect(
                result.getByText(/Данные успешно сохранены/i)
            ).toBeInTheDocument();
            expect(inputToChange).toHaveValue(newEstimateValue);
        });
    });
});
