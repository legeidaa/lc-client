import { FC, useEffect, useRef, useState } from "react";

import { useParams } from "next/navigation";
import { createClientExpectations } from "@/entities/expectation/factory/createClientExpectations";
import { createClientExpectation } from "@/entities/expectation/factory/createClientExpectation";
import {
    ClientExpectation,
    Expectation,
    useCreateExpectationsMutation,
    useDeleteExpectationMutation,
    useGetExpectationsQuery,
    useUpdateExpectationsMutation,
} from "@/entities/expectation";
import { useGetGameQuery } from "@/entities/game";
import { User } from "@/entities/user";
import { InputTheme } from "@/shared/components/Input/Input";
import { InputsList } from "@/features/inputs-list/ui/InputsList/InputsList";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import {
    deleteInputItem,
    saveInputsListData,
    updateInputsData,
} from "@/features/inputs-list";

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

    const [
        updateExpectations,
        {
            isSuccess: isUpdateExpectationsSuccess,
            isLoading: isUpdateExpectationsLoading,
            isError: isUpdateExpectationsError,
            status: updateExpectationsStatus,
            reset: updateExpectationsReset,
        },
    ] = useUpdateExpectationsMutation();

    const [
        createExpectations,
        {
            isSuccess: isCreateExpectationsSuccess,
            isLoading: isCreateExpectationsLoading,
            isError: isCreateExpectationsError,
            status: createExpectationsStatus,
            reset: createExpectationsReset,
        },
    ] = useCreateExpectationsMutation();

    const [
        deleteExpectation,
        {
            isError: isDeleteExpectationError,
            isLoading: isDeleteExpectationLoading,
            reset: resetDeleteExpectation,
        },
    ] = useDeleteExpectationMutation();

    const [btnToDelete, setBtnToDelete] = useState<number | null>(null);
    const [clientExpectations, setClientExpectations] = useState<
        (ClientExpectation | Expectation)[]
    >([]);
    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);
    const isInitialized = useRef(false);
    const isUpdated = useRef(false);

    const isSaveSuccess =
        (createExpectationsStatus === "fulfilled" &&
            isCreateExpectationsSuccess) ||
        (updateExpectationsStatus === "fulfilled" &&
            isUpdateExpectationsSuccess);

    // очищение isSaveSuccess
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (isSaveSuccess) {
            timeoutId = setTimeout(() => {
                createExpectationsReset();
                updateExpectationsReset();
            }, 3000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [createExpectationsReset, isSaveSuccess, updateExpectationsReset]);

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
        await deleteInputItem(
            expectationId,
            clientExpectations,
            isClientExpectation,
            setBtnToDelete,
            deleteExpectation
        );
        
        setClientExpectations(
            clientExpectations.filter(
                (item) => item.expectationId !== expectationId
            )
        );
        setBtnToDelete(null);
        resetDeleteExpectation();
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
            isDeleteActionLoading={isDeleteExpectationLoading}
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
            isError={
                isCreateExpectationsError ||
                isUpdateExpectationsError ||
                isDeleteExpectationError
            }
            className="expectationsList"
            isSaveSuccess={isSaveSuccess}
        />
    );
};
