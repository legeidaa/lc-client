import { Input } from "../Input/Input";
import styles from "./RegistrationForms.module.scss";

export default function RegistrationForms() {
    return <form>
        <div className={styles.wrapper}>
            <div className={styles.playerForm}>
                <label htmlFor="">
                    <Input inputStyle="Small" className="input__element"/>
                </label>
            </div>
        </div>
    </form>;
}
