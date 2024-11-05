"use client";

import { FormEvent, useRef } from "react";
import { Input } from "../Input/Input";
import { SexRadioInput } from "../SexRadioInput/SexRadioInput";
import styles from "./RegistrationForms.module.scss";
import classNames from "classnames";

export default function RegistrationForms() {
    const form = useRef<HTMLFormElement>(null);
    const handleSubmmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(form.current!);
        // const formDataObj = {};
        // formData.forEach((value, key) => (formDataObj[key] = value));
        // console.log(formDataObj);
    };
    return (
        <form ref={form} onSubmit={handleSubmmit}>
            <div className={styles.wrapper}>
                <div className={styles.playerForm}>
                    <h3 className={styles.playerFormTitle}>
                        Введите <b>ваше</b> имя, пол и электронную почту
                    </h3>
                    <div className={styles.playerFormBlock}>
                        <Input
                            name="player-name"
                            id="player-name"
                            inputStyle="Small"
                            type="text"
                            label="Ваше имя:"
                            required
                        />
                        <Input
                            name="player-email"
                            id="player-email"
                            inputStyle="Small"
                            type="email"
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
                    <h3 className={styles.playerFormTitle}>
                        Введите имя, пол, и электронную почта вашего{" "}
                        <b>партнера</b>
                    </h3>
                    <div className={styles.playerFormBlock}>
                        <Input
                            name="partner-name"
                            id="partner-name"
                            type="text"
                            inputStyle="Small"
                            label="Ваше имя:"
                        />
                        <Input
                            name="partner-email"
                            id="partner-email"
                            type="email"
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
            </div>

            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <div className={styles.circle}></div>
                    <p className={styles.p}>
                        Игра идет в несколько этапов, в конце каждого уровня вам
                        будут даны инструкции к дальнейшему прохождению.
                    </p>
                </li>
                <li className={styles.listItem}>
                    <div className={styles.circle}></div>
                    <p className={styles.p}>
                        После прохождения вами первого уровня, к игре сможет
                        присоединиться ваш партнер, для этого ему будет
                        отправленная ссылка для прохождения на указанный вами
                        e-mail.
                    </p>
                </li>
            </ul>
            <div className={styles.submitBtnWrapper}>
                <button
                    className={classNames("btn", styles.submitBtn)}
                    type="submit"
                >
                    ВСЕ ПОНЯТНО
                </button>
            </div>
        </form>
    );
}
