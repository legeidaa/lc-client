import { fireEvent, waitFor } from "@testing-library/react";
import { ActionsListController } from "./ActionsListController";

import { useParams } from "next/navigation";
import { renderWithProviders } from "tests/utils";
import { server } from "tests/server";
import { http, HttpResponse } from "msw";
import { apiUrl } from "@/shared/config/consts";

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

describe("ActionsListController", () => {
    jest.mocked(useParams).mockReturnValue({ hash: "test", user: "player" });
    pathnameMock.mockImplementation(() => "/pl-to-pr");

    test("renders loading spinner initially", () => {
        const result = renderWithProviders(<ActionsListController />);
        expect(result.getByTestId(/loading-spinner/i)).toBeInTheDocument();
    });

    test("renders actions list after loading", async () => {
        const result = renderWithProviders(<ActionsListController />);

        await waitFor(
            () => {
                expect(
                    result.getByDisplayValue(/Action 1/i)
                ).toBeInTheDocument();
                expect(
                    result.getByDisplayValue(/Action 2/i)
                ).toBeInTheDocument();
            },
            { timeout: 1000 }
        );
    });

    test("updates action value on input change", async () => {
        const result = renderWithProviders(<ActionsListController />);

        await waitFor(() => {
            const input = result.getByDisplayValue(/Action 1/i);
            fireEvent.change(input, { target: { value: "Action changed" } });
            expect(input).toHaveValue("Action changed");
        });
    });

    test("adds a new action when add button is clicked", async () => {
        const result = renderWithProviders(<ActionsListController />);

        await waitFor(() => {
            expect(result.getByDisplayValue(/Action 1/i)).toBeInTheDocument();
        });

        const addButton = result.getByText(/Добавить ещё строку/i);
        fireEvent.click(addButton);

        const inputs = result.getAllByPlaceholderText(/Что вы делаете/i);
        // четыре создаются изначально, один добавляется
        expect(inputs).toHaveLength(5);
    });

    test("deletes action created on client", async () => {
        const result = renderWithProviders(<ActionsListController />);

        await waitFor(() => {
            const deleteBtns = result.getAllByTestId("input-delete-btn");
            expect(deleteBtns).toHaveLength(4);
            if (deleteBtns[3]) {
                fireEvent.click(deleteBtns[3]);
            }
        });
        const inputs = result.getAllByPlaceholderText(/Что вы делаете/i);
        expect(inputs).toHaveLength(3);
    });

    test("deletes action created on server", async () => {
        const result = renderWithProviders(<ActionsListController />);

        await waitFor(() => {
            const deleteBtns = result.getAllByTestId("input-delete-btn");
            expect(deleteBtns).toHaveLength(4);
            if (deleteBtns[0]) {
                fireEvent.click(deleteBtns[0]);
            }
        });

        await waitFor(() => {
            const inputs = result.getAllByPlaceholderText(/Что вы делаете/i);
            expect(inputs).toHaveLength(3);
        });
    });

    test("doesnt save action with empty value", async () => {
        const result = renderWithProviders(<ActionsListController />);

        await waitFor(() => {
            expect(result.getByDisplayValue(/Action 1/i)).toBeInTheDocument();
        });

        const saveBtn = result.getByText(/^Готово$/i);
        fireEvent.click(saveBtn);

        const emptyFieldMessages = result.getAllByText(
            /Поле не должно быть пустым/i
        );
        expect(emptyFieldMessages).toHaveLength(2);
    });

    test("saves actions", async () => {
        server.use(
            http.post(apiUrl + "action", () => {
                return HttpResponse.json([
                    {
                        actionId: 3,
                        title: "New action 1",
                        estimate: null,
                        type: "green",
                        userId: 1,
                    },
                    {
                        actionId: 4,
                        title: "New action 2",
                        estimate: null,
                        type: "green",
                        userId: 1,
                    },
                ]);
            }),

            http.patch(apiUrl + "action", () => {
                return HttpResponse.json([
                    {
                        actionId: 1,
                        title: "Action 1",
                        estimate: null,
                        type: "green",
                        userId: 1,
                    },
                    {
                        actionId: 2,
                        title: "Action 2",
                        estimate: null,
                        type: "green",
                        userId: 1,
                    },
                ]);
            })
        );
        const result = renderWithProviders(<ActionsListController />);

        await waitFor(() => {
            expect(result.getByDisplayValue(/Action 1/i)).toBeInTheDocument();
            expect(result.getByDisplayValue(/Action 2/i)).toBeInTheDocument();
        });
        const inputs = result.getAllByPlaceholderText(/Что вы делаете/i);
        if (inputs[2] && inputs[3]) {
            fireEvent.change(inputs[2], { target: { value: "New action 1" } });
            fireEvent.change(inputs[3], { target: { value: "New action 2" } });
        }

        const saveBtn = result.getByText(/^Готово$/i);
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(
                result.getByText(/Данные успешно сохранены/i)
            ).toBeInTheDocument();
        });
    });
});
