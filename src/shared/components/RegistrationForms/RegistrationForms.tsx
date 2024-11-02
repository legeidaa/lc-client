"use client";

import { FormEvent } from "react";
import { Input } from "../Input/Input";
import { SexRadioInput } from "../SexRadioInput/SexRadioInput";
import styles from "./RegistrationForms.module.scss";

export default function RegistrationForms() {
    const handleSubmmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
    };
    return (
        <form onSubmit={handleSubmmit}>
            <div className={styles.wrapper}>
                <div className={styles.playerForm}>
                    <h3>
                        Введите <b>ваше</b> имя, пол и электронную почту
                    </h3>
                    <div className={styles.playerFormBlock}>
                        <Input
                            name="player-name"
                            id="player-name"
                            inputStyle="Small"
                            label="Ваше имя:"
                            required
                        />
                        <Input
                            name="player-email"
                            id="player-email"
                            inputStyle="Small"
                            label="Ваша электронная почта:"
                            required
                        />
                        <div className={styles.playerFormSex}>
                            <span className={styles.label}>Пол: </span>
                            <SexRadioInput
                                name="player-sex"
                                type="female"
                                id="player-female"
                                required
                            />
                            <SexRadioInput
                                name="player-sex"
                                type="male"
                                id="player-male"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.playerForm}>
                    <h3>
                        Введите <b>ваше</b> имя, пол и электронную почту
                    </h3>
                    <div className={styles.playerFormBlock}>
                        <Input
                            name="partner-name"
                            id="partner-name"
                            inputStyle="Small"
                            label="Ваше имя:"
                        />
                        <Input
                            name="partner-email"
                            id="partner-email"
                            inputStyle="Small"
                            label="Ваша электронная почта:"
                        />
                        <div className={styles.playerFormSex}>
                            <span className={styles.label}>Пол: </span>
                            <SexRadioInput
                                name="partner-sex"
                                type="female"
                                id="partner-female"
                            />
                            <SexRadioInput
                                name="partner-sex"
                                type="male"
                                id="partner-male"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit">
                    ОТПРАВИТЬ
                </button>
            </div>
        </form>
    );
}
