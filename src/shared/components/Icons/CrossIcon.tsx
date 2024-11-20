import { FC, SVGProps } from "react";

export const CrossIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="48" cy="48" r="44.5" stroke="white" strokeWidth="7" />
            <path
                d="M31.0259 65.4742L64.9744 31.5258"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
            />
            <path
                d="M64.9741 65.4742L31.0256 31.5257"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
            />
        </svg>
    );
};
