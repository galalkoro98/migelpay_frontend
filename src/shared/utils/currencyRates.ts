// Currency conversion rates (hidden from user)
// Based on 1 EUR = 2860 SDG
// export const CURRENCY_RATES = {
//     EUR: 2860,            // 1 EUR = 2860 SDG
//     USD: 2600,            // 1 USD ≈ 0.909 EUR → 2600 SDG
//     NGN: 2.65,            // 1 NGN ≈ 0.000926 EUR → 2860 * 0.000926
//     KES: 19.3,            // 1 KES ≈ 0.00675 EUR → 2860 * 0.00675
//     PHP: 45.1,            // 1 PHP ≈ 0.01576 EUR → 2860 * 0.01576
//     MWK: 3.6,             // 1 MWK ≈ 0.00126 EUR → 2860 * 0.00126
//     ZMW: 1.56,            // 1 ZMW ≈ 0.000545 EUR → 2860 * 0.000545
//     SDG: 1                // 1 SDG = 1 SDG
// };


export const CURRENCY_TO_EUR = {
    EUR: 1,           // 1 EUR = 1 EUR
    USD: 0.91,        // 1 USD = 0.91 EUR
    NGN: 0.00059,     // 1 NGN = 0.00059 EUR
    KES: 0.00675,
    PHP: 0.01576,
    MWK: 0.00126,
    ZMW: 0.000545,
    SDG: 1 / 2860     // 1 SDG = 0.0003496 EUR
};