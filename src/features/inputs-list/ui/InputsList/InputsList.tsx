import { FC } from "react";
import styles from "./InputsList.module.scss";
import { InputTheme } from "@/shared/components/Input/Input";
import { CrossIcon } from "@/shared/components/Icons/CrossIcon";
import { Button } from "@/shared/components/Button/Button";
import classNames from "classnames";
import { Expectation } from "@/entities/expectation";
import { Action } from "@/entities/action";
import { ListItem } from "../ListItem/ListItem";

interface InputsListProps {
    actions: Action[] | Expectation[];
    btnToDelete: number | null;
    isSomeFieldsEmpty: boolean;
    isReadyBtnDisabled: boolean;
    isDeleteActionLoading: boolean;
    placeholder: string;
    firstInputTheme: InputTheme.CLOUD | InputTheme.CLOUD_L;
    isSaveSuccess: boolean;
    onInputChange: (value: string, i: number) => void;
    onRowDelete: (actionId: number) => void;
    onAddClick: () => void;
    onReadyClick: () => Promise<void>;
    className?: string;
    isError?: boolean;
}

export const InputsList: FC<InputsListProps> = (props) => {
    const {
        actions,
        btnToDelete,
        isSomeFieldsEmpty,
        isReadyBtnDisabled,
        isDeleteActionLoading,
        placeholder,
        isSaveSuccess,
        onInputChange,
        onRowDelete,
        onAddClick,
        onReadyClick,
        firstInputTheme,
        className,
        isError,
    } = props;

    const list = actions.map((action, i) => {
        let id: number | undefined;
        if ("actionId" in action) {
            id = action.actionId;
        } else if ("expectationId" in action) {
            id = action.expectationId;
        }
        if (id === undefined) return;
        return (
            <ListItem
                key={id}
                actionsLength={actions.length}
                index={i}
                action={action}
                actionId={id}
                btnToDelete={btnToDelete}
                isDeleteActionLoading={isDeleteActionLoading}
                isSomeFieldsEmpty={isSomeFieldsEmpty}
                placeholder={placeholder}
                firstInputTheme={firstInputTheme}
                onInputChange={onInputChange}
                onRowDelete={onRowDelete}
            />
        );
    });

    return (
        <>
            <ul
                className={classNames(
                    styles.list,
                    className && styles[className]
                )}
            >
                {list}
            </ul>

            <button onClick={onAddClick} className={styles.addRow}>
                <CrossIcon />
                <span>Добавить ещё строку</span>
            </button>

            <div className={styles.btnWrapper}>
                <Button
                    onClick={onReadyClick}
                    disabled={isReadyBtnDisabled}
                    type="button"
                >
                    Готово
                </Button>
            </div>
            {isSaveSuccess && (
                <div className={styles.success}>Данные успешно сохранены</div>
            )}

            {isError && <div>Произошла ошибка</div>}
        </>
    );
};
