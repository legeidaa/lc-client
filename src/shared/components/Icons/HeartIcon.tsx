import { FC, SVGProps } from "react";

export const HeartIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="117"
            height="117"
            viewBox="0 0 117 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="58.5" cy="58.5" r="58.5" fill="white" />
            <path
                d="M57.8604 44.7062C58.43 43.9538 58.9981 43.2526 59.5704 42.5958C60.1428 41.939 60.7195 41.3265 61.2946 40.7654C61.8698 40.2043 62.4482 39.6748 63.0249 39.1966C63.6016 38.7185 64.1755 38.2791 64.7538 37.8839C65.3322 37.4888 65.9013 37.1329 66.4741 36.8151C67.047 36.4972 67.617 36.218 68.1779 35.9781C68.7453 35.7375 69.3034 35.5363 69.8582 35.3673C70.413 35.1983 70.9652 35.068 71.5139 34.9699C72.0626 34.8719 72.6016 34.8068 73.1307 34.7746C73.6599 34.7424 74.1856 34.7426 74.7016 34.7756C75.2176 34.8087 75.7232 34.8684 76.2255 34.9604C76.7213 35.053 77.2131 35.1716 77.6881 35.3173C78.1632 35.4631 78.6349 35.6412 79.0891 35.8402C79.5433 36.0392 79.9871 36.2648 80.4205 36.5169C80.8539 36.7691 81.2699 37.0421 81.6684 37.3361C82.0734 37.6294 82.4614 37.9499 82.8321 38.2913C83.2028 38.6327 83.5618 38.9881 83.904 39.3706C84.2456 39.7468 84.5698 40.1439 84.8765 40.5619C85.1826 40.9735 85.4711 41.406 85.7353 41.8537C86.0058 42.3007 86.2521 42.763 86.4801 43.2398C86.7081 43.7165 86.9181 44.2079 87.1035 44.7144C87.289 45.2209 87.4557 45.7356 87.5973 46.2591C87.739 46.7827 87.8627 47.3208 87.9548 47.8683C88.0533 48.4153 88.1268 48.971 88.1745 49.5293C88.2228 50.0938 88.2452 50.6609 88.2427 51.2368C88.2402 51.8127 88.212 52.3911 88.1516 52.9726C88.0912 53.5541 88.0122 54.1439 87.8939 54.7311C87.7821 55.3176 87.6386 55.9136 87.4689 56.5057C87.2992 57.0978 87.0973 57.6931 86.8627 58.2852C86.628 58.8772 86.3671 59.4654 86.0739 60.0567C85.7802 60.6417 85.4543 61.2298 85.0886 61.809C84.7293 62.3876 84.331 62.9635 83.9061 63.5357C83.6818 63.8325 83.4573 64.1292 83.2446 64.4121C83.0255 64.6957 82.8187 64.9716 82.6047 65.2418C82.3972 65.5114 82.1891 65.7747 81.9874 66.0374C81.785 66.2937 81.5891 66.5493 81.392 66.7923C81.1949 67.0353 81.0042 67.2776 80.8136 67.52C80.6229 67.7624 80.431 67.9921 80.2455 68.2212C80.06 68.4503 79.8675 68.6737 79.6814 68.8964C79.4953 69.1192 79.3086 69.3355 79.1219 69.5519C78.9352 69.7684 78.7484 69.9848 78.561 70.1949C78.3737 70.4049 78.187 70.6213 77.9997 70.8314C77.8124 71.0414 77.6251 71.2515 77.4313 71.4622C77.2375 71.6729 77.0502 71.883 76.8494 72.088C76.6557 72.2987 76.4555 72.51 76.2553 72.7213C76.0551 72.9326 75.8485 73.1446 75.6418 73.3565C75.4352 73.5685 75.2229 73.7873 75.0105 74.0062C74.798 74.2251 74.5791 74.4447 74.3544 74.6712C74.1298 74.8977 73.9051 75.1241 73.6682 75.3582C73.4313 75.5923 73.1944 75.8264 72.9516 76.0674C72.7089 76.3084 72.4539 76.5571 72.1989 76.8057C71.9439 77.0543 71.6773 77.3168 71.4042 77.58C71.1312 77.8432 70.8524 78.1133 70.5677 78.3904C70.283 78.6675 69.9861 78.9521 69.6833 79.2437C69.3806 79.5354 69.072 79.834 68.7512 80.1401C68.4304 80.4463 68.1037 80.7595 67.7654 81.0866C67.4272 81.4136 67.0762 81.7419 66.7205 82.0898C66.3642 82.4314 65.9898 82.7876 65.616 83.15C65.2358 83.5132 64.844 83.8902 64.4464 84.2742C64.0423 84.6588 63.633 85.0567 63.2051 85.4628C62.7771 85.869 62.344 86.2884 61.8928 86.7224C61.4416 87.1563 60.9781 87.5979 60.5036 88.0597C60.0286 88.5152 59.536 88.9915 59.0377 89.4748C58.5329 89.9588 58.0172 90.4629 57.4892 90.9747C57.4892 90.9747 57.4609 90.9519 57.4046 90.9062C57.3482 90.8605 57.2702 90.7913 57.1639 90.6993C57.0576 90.6073 56.9295 90.4918 56.7803 90.3592C56.6312 90.2265 56.4602 90.0704 56.2617 89.8977C56.0697 89.7245 55.8557 89.5278 55.6214 89.3203C55.387 89.1127 55.1367 88.8748 54.8665 88.6324C54.5957 88.3836 54.3103 88.1171 54.0107 87.8392C53.7104 87.5549 53.3898 87.2598 53.0608 86.9463C52.7318 86.6328 52.3821 86.3086 52.0243 85.966C51.6665 85.6233 51.2947 85.2692 50.9146 84.8967C50.535 84.5306 50.1406 84.1467 49.7387 83.7508C49.3368 83.3548 48.9278 82.9532 48.5106 82.5332C48.094 82.1195 47.669 81.6873 47.2377 81.2559C46.8063 80.8244 46.3731 80.374 45.9265 79.9184C45.4862 79.4622 45.0391 79.0003 44.5912 78.5321C44.1433 78.0639 43.6941 77.5829 43.245 77.102C42.7958 76.6211 42.3456 76.1275 41.8952 75.6339C41.4449 75.1403 40.9939 74.6405 40.5487 74.1336C40.1036 73.6267 39.6583 73.1198 39.2126 72.6066C38.7668 72.0934 38.334 71.5789 37.9011 71.0644C37.4682 70.55 37.0474 70.0279 36.6274 69.5122C36.2073 68.9965 35.7996 68.4732 35.3989 67.9556C34.9981 67.438 34.6037 66.9198 34.2223 66.4004C33.8408 65.8809 33.4664 65.3672 33.1113 64.8516C32.7497 64.3366 32.4082 63.826 32.0736 63.3212C31.739 62.8164 31.4237 62.3097 31.1218 61.8081C30.82 61.3065 30.5322 60.8164 30.2637 60.3243C29.9959 59.8386 29.741 59.3517 29.5065 58.8755C29.2721 58.3993 29.0581 57.934 28.8641 57.4731C28.67 57.0122 28.4965 56.5621 28.3429 56.1165C28.1893 55.6709 28.0633 55.2417 27.9572 54.817C27.8511 54.3924 27.7719 53.9779 27.7139 53.5806C27.6353 53.0381 27.5836 52.5059 27.5525 51.9844C27.5207 51.4566 27.503 50.9402 27.5117 50.4277C27.5204 49.9151 27.5432 49.414 27.5923 48.9167C27.6414 48.4195 27.6982 47.9342 27.7819 47.4592C27.8656 46.9841 27.9627 46.5141 28.0811 46.0613C28.1988 45.6021 28.3312 45.1607 28.4836 44.7238C28.6359 44.2868 28.8023 43.8613 28.9828 43.4472C29.1633 43.0331 29.3579 42.6305 29.5731 42.2386C29.7882 41.8468 30.0116 41.4733 30.2484 41.1049C30.4853 40.7365 30.7368 40.3859 31.0024 40.0467C31.2681 39.7075 31.548 39.3797 31.836 39.0703C32.124 38.7609 32.4262 38.463 32.743 38.1827C33.0534 37.9032 33.3778 37.635 33.717 37.3846C34.0498 37.1349 34.3966 36.8965 34.7518 36.6765C35.1069 36.4566 35.4703 36.255 35.8414 36.0654C36.2131 35.8822 36.5925 35.7111 36.9801 35.5583C37.3677 35.4056 37.7635 35.2713 38.1613 35.1559C38.5654 35.0399 38.9716 34.9429 39.3859 34.8643C39.8001 34.7858 40.2227 34.7256 40.6477 34.6907C41.0721 34.6495 41.5054 34.6331 41.9342 34.6362C42.3693 34.6388 42.8063 34.6603 43.2451 34.7009C43.684 34.7415 44.1317 34.8067 44.5813 34.891C45.0309 34.9753 45.4765 35.0856 45.9304 35.2142C46.3843 35.3429 46.8342 35.4974 47.2859 35.6711C47.7377 35.8447 48.1917 36.0437 48.6484 36.268C49.1051 36.4923 49.5573 36.7363 50.0125 37.0119C50.467 37.2812 50.9182 37.5829 51.3648 37.9041C51.8178 38.2248 52.2604 38.572 52.7055 38.9445C53.1506 39.3171 53.5918 39.7156 54.0354 40.1395C54.4726 40.564 54.9127 41.0202 55.3419 41.4966C55.7711 41.9731 56.1969 42.4818 56.6194 43.0229C57.0413 43.5576 57.46 44.1247 57.8675 44.7119L57.8604 44.7062Z"
                fill="#D98097"
            />
        </svg>
    );
};
