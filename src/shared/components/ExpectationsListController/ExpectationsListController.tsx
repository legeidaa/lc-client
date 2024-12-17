import { FC, useEffect, useRef, useState } from "react";
import { ClientExpectation, Expectation, User } from "@/shared/interfaces/game";
import {
    useCreateExpectationsMutation,
    useDeleteExpectationMutation,
    useGetExpectationsQuery,
    useGetGameQuery,
    useUpdateExpectationsMutation,
} from "@/shared/api";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { InputsList } from "../InputsList/InputsList";
import { InputTheme } from "../Input/Input";
import { useParams } from "next/navigation";
import { updateInputsData } from "@/shared/utils/InputsListFuncs/updateInputItems";
import { saveInputsListData } from "@/shared/utils/InputsListFuncs/saveInputsListData";
import { deleteInputItem } from "@/shared/utils/InputsListFuncs/deleteInputItem";
import { createClientExpectations } from "@/shared/utils/createClientExpectations";
import { createClientExpectation } from "@/shared/utils/createClientExpectation";

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
        (ClientExpectation | Expectation)[]
    >([]);
    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);
    const isInitialized = useRef(false);
    const isUpdated = useRef(false);

    useEffect(() => {
        if (
            isExpectationsLoadingSuccess &&
            expectations &&
            !isInitialized.current
        ) {
            const newActions: (ClientExpectation | Expectation)[] =
                expectations.length > 4
                    ? expectations
                    : [
                          ...expectations,
                          ...createClientExpectations(
                              4 - expectations.length,
                              user
                          ),
                      ];
            setClientExpectations(newActions);
            isInitialized.current = true;
        } else if (
            isExpectationsLoadingSuccess &&
            expectations &&
            isUpdated.current
        ) {
            setClientExpectations([...expectations]);
            isUpdated.current = false;
        } else if (
            isExpectationsLoadingSuccess &&
            expectations &&
            btnToDelete !== null
        ) {
            setClientExpectations(
                clientExpectations.filter(
                    (item) => item.expectationId !== btnToDelete
                )
            );
            setBtnToDelete(null);
        }
    }, [
        btnToDelete,
        clientExpectations,
        expectations,
        isExpectationsLoadingSuccess,
        user,
    ]);

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
        deleteInputItem(
            expectationId,
            clientExpectations,
            isClientExpectation,
            setBtnToDelete,
            deleteExpectation
        );
    };

    const saveData = async () => {
        saveInputsListData(
            clientExpectations,
            isClientExpectation,
            createExpectations,
            updateExpectations,
            setIsSomeFieldsEmpty,
            user,
            isUpdated
        );
    };

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
