import { StartInfo } from "@/shared/components/StartInfo/StartInfo";

export default function Payment() {
    return (
        <div className="container">
            {/* отправляем запрос на оплату и создаем юзера в бд */}
            <StartInfo />
            <button className="btn">ОПЛАТИТЬ</button>
        </div>
    );
}
