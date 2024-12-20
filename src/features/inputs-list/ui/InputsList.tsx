import { FC } from "react";
import styles from "./InputsList.module.scss";
import { Input, InputTheme } from "@/shared/components/Input/Input";
import { CrossIcon } from "@/shared/components/Icons/CrossIcon";
import { Button } from "@/shared/components/Button/Button";
import classNames from "classnames";
import { Expectation } from "@/entities/expectation";
import { Action } from "@/entities/action";

interface InputsListProps {
    actions: Action[] | Expectation[];
    btnToDelete: number | null;
    isSomeFieldsEmpty: boolean;
    isReadyBtnDisabled: boolean;
    placeholder: string;
    firstInputTheme: InputTheme.CLOUD | InputTheme.CLOUD_L;
    onInputChange: (value: string, i: number) => void;
    onRowDelete: (actionId: number) => void;
    onAddClick: () => void;
    onReadyClick: () => Promise<void>;
    className?: string;
    isError?: boolean
}

export const InputsList: FC<InputsListProps> = (props) => {
    const {
        actions,
        btnToDelete,
        isSomeFieldsEmpty,
        isReadyBtnDisabled,
        placeholder,
        onInputChange,
        onRowDelete,
        onAddClick,
        onReadyClick,
        firstInputTheme,
        className,
        isError
    } = props;

    return (
        <>
            <ul
                className={classNames(
                    styles.list,
                    className && styles[className]
                )}
            >
                {actions.map((action, i) => {
                    let id: number = 0;
                    if ("actionId" in action) {
                        id = action.actionId;
                    } else if ("expectationId" in action) {
                        id = action.expectationId;
                    }
                    return (
                        <li
                            key={id}
                            className={classNames(styles.listItem, {
                                [styles[firstInputTheme] as string]: i === 0,
                            })}
                        >
                            <Input
                                theme={
                                    i === 0
                                        ? firstInputTheme
                                        : InputTheme.ACTION
                                }
                                value={action.title}
                                placeholder={placeholder}
                                onChange={(e) =>
                                    onInputChange(e.target.value, i)
                                }
                                isDeleteBtnDisabled={btnToDelete === id}
                                onDelete={
                                    actions.length > 1
                                        ? () => onRowDelete(id)
                                        : undefined
                                }
                            />
                            {isSomeFieldsEmpty && action.title.length === 0 && (
                                <div className={styles.emptyField}>
                                    Поле не должно быть пустым
                                </div>
                            )}
                        </li>
                    );
                })}
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

            {isError && <div>Произошла ошибка</div>}
        </>
    );
};
