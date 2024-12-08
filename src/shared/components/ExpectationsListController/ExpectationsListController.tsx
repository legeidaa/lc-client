import { FC, useEffect, useRef, useState } from "react";
import {
    ClientExpectation,
    Expectation,
    User,
} from "@/shared/interfaces/game";
import {
    useCreateExpectationsMutation,
    useDeleteExpectationMutation,
    useGetExpectationsQuery,
    useGetGameQuery,
    useUpdateExpectationsMutation,
} from "@/lib/redux/gameApi";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { InputsList } from "../InputsList/InputsList";
import { InputTheme } from "../Input/Input";
import { useParams } from "next/navigation";
import { updateInputsData } from "@/shared/utils/InputsListFuncs/updateInputItems";
import { saveInputsListData } from "@/shared/utils/InputsListFuncs/saveInputsListData";

export const createClientExpectation = (user: User): ClientExpectation => {
    return {
        userId: user.userId,
        title: "",
        expectationId: Date.now() + Math.random(),
        client: true,
    };
};

export const isClientExpectation = (
    expectation: ClientExpectation | Expectation
): expectation is ClientExpectation => {
    return (expectation as ClientExpectation).client !== undefined;
};

export const ExpectationsListController: FC = () => {
    const params = useParams<{ hash: string; user: string }>();
    const { data: game, isSuccess: isGameLoadingSuccess } = useGetGameQuery(
        params.hash
    );

    const user: User = game?.users.find((u) => u.role === params.user) as User;

    const { data: expectations, isSuccess: isExpectationsLoadingSuccess } =
        useGetExpectationsQuery(user?.userId, {
            skip: !isGameLoadingSuccess && !user,
        });

    const [updateExpectations, { isLoading: isUpdateExpectationsLoading }] =
        useUpdateExpectationsMutation();
    const [createExpectations, { isLoading: isCreateExpectationsLoading }] =
        useCreateExpectationsMutation();
    const [deleteExpectation] = useDeleteExpectationMutation();

    const [btnToDelete, setBtnToDelete] = useState<number | null>(null);
    const [clientExpectations, setClientExpectations] = useState<
        Array<Expectation>
    >([]);
    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // если в базе менее четырех действий, подмешиваем дополнительные с пометкой, что созданы на клиенте
        if (
            isExpectationsLoadingSuccess &&
            expectations &&
            isFirstRender.current
        ) {
            function createClientExpectations(
                num: number
            ): ClientExpectation[] {
                const clientExpectations: ClientExpectation[] = new Array(num)
                    .fill(null)
                    .map(() => {
                        return createClientExpectation(user);
                    });
                return clientExpectations;
            }

            const newActions =
                expectations.length > 4
                    ? expectations
                    : [
                          ...expectations,
                          ...createClientExpectations(4 - expectations.length),
                      ];
            isFirstRender.current = false;
            setClientExpectations(newActions);
            // }
        } else if (isExpectationsLoadingSuccess && expectations) {
            setClientExpectations([...expectations]);
        }
    }, [expectations, isExpectationsLoadingSuccess, user]);

    const onInputChange = (value: string, i: number) => {
        updateInputsData(
            value,
            i,
            clientExpectations,
            setClientExpectations,
            setIsSomeFieldsEmpty
        );
    };

    const onAddClick = () => {
        setClientExpectations([
            ...clientExpectations,
            createClientExpectation(user),
        ]);
    };

    const onRowDelete = async (expectationId: number) => {
        const toDelete = clientExpectations.find(
            (expectation) => expectation.expectationId === expectationId
        );

        if (!toDelete) throw new Error("Action not found");

        if (isClientExpectation(toDelete)) {
            setClientExpectations(
                clientExpectations.filter(
                    (expectation) => expectation.expectationId !== expectationId
                )
            );
        } else {
            setBtnToDelete(expectationId);
            const deleted = await deleteExpectation(expectationId).unwrap();
            if (deleted.success) {
                setBtnToDelete(null);
                setClientExpectations(
                    clientExpectations.filter(
                        (expectation) =>
                            expectation.expectationId !== expectationId
                    )
                );
            }
        }
    };

    const saveData = async () => {
        saveInputsListData(
            clientExpectations,
            isClientExpectation,
            createExpectations,
            updateExpectations,
            setIsSomeFieldsEmpty,
            user
        );
    };

    console.log(clientExpectations, expectations);

    if (!isExpectationsLoadingSuccess) {
        return <LoadingSpinner />;
    }

    return (
        <InputsList
            actions={clientExpectations}
            btnToDelete={btnToDelete}
            isReadyBtnDisabled={
                isCreateExpectationsLoading || isUpdateExpectationsLoading
            }
            placeholder="Мне бы хотелось, чтобы"
            firstInputTheme={InputTheme.CLOUD_L}
            onInputChange={onInputChange}
            onRowDelete={onRowDelete}
            onAddClick={onAddClick}
            onReadyClick={saveData}
            isSomeFieldsEmpty={isSomeFieldsEmpty}
            className="expectationsList"
        />
    );
};
