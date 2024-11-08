// import Link from "next/link";

// type Product = {
//     id: number;
//     name: string;
//     price: number;
//     isAvailable: boolean;
// };

// async function getProducts() {
//     try {
//         const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
//         const products = await res.json();

//         return products;
//     } catch (error) {
//         console.error(error);
//     }
// }

// export default async function Page({ params }: { params: { id: string } }) {
//     const products = await getProducts();
//     return (
//         <div>
//             <Link href={`/game/${params.id}/result-player`}>Back</Link>
//             {products.map((product: Product) => (
//                 <div key={product.id}>
//                     {product.name} {params.id}
//                 </div>
//             ))}
//         </div>
//     );
// }

import RegistrationForms from "@/shared/components/RegistrationForms/RegistrationForms";
import { StartInfo } from "@/shared/components/StartInfo/StartInfo";

export default function StartPage() {
    
    const currentUser = "player";
    if (currentUser === "player") {
        return (
            <div className="container">
                <RegistrationForms />
            </div>
        );
    }

    return <div className="container"> </div>;
}
