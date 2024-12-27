import { Input, InputTheme } from "@/shared/components/Input/Input";
import { SexRadioInput } from "@/shared/components/SexRadioInput/SexRadioInput";
import styles from "./PlayerForm.module.scss";
import { ChangeEvent, FC } from "react";
import { RegFormData } from "../../model/types";
import { Role } from "@/entities/user";

interface PlayerFormProps {
    role: Role;
    formData: RegFormData;
    readonly: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const PlayerForm: FC<PlayerFormProps> = ({
    role,
    formData,
    readonly,
    onChange,
}) => {
    const title = role === 'player' ? <>Введите <b>ваше</b> имя, пол и электронную почту</> :  <>Введите имя, пол, и электронную почту вашего <b>партнера</b></>
    return (
        <div className={styles.playerForm}>
            <h3 className={styles.playerFormTitle}>
                {title}
            </h3>
            <div className={styles.playerFormBlock}>
                <Input
                    name={`${role}-name`}
                    id={`${role}-name`}
                    theme={InputTheme.SMALL}
                    type="text"
                    label="Имя:"
                    value={formData[`${role}-name`]}
                    onChange={onChange}
                    readOnly={readonly}
                    required
                />
                <Input
                    name={`${role}-email`}
                    id={`${role}-email`}
                    theme={InputTheme.SMALL}
                    type="email"
                    value={formData[`${role}-email`]}
                    label="Электронная почта:"
                    readOnly={readonly}
                    onChange={onChange}
                    required
                />
                <div className={styles.playerFormSex}>
                    <span className={styles.label}>Пол: </span>
                    <SexRadioInput
                        name={`${role}-sex`}
                        type="female"
                        id={`${role}-female`}
                        checked={formData[`${role}-sex`] === "female"}
                        onChange={onChange}
                        disabled={readonly}
                        required
                    />
                    <SexRadioInput
                        name={`${role}-sex`}
                        type="male"
                        id={`${role}-male`}
                        checked={formData[`${role}-sex`] === "male"}
                        onChange={onChange}
                        disabled={readonly}
                        required
                    />
                </div>
            </div>
        </div>
    );
};
