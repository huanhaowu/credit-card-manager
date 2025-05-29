export enum CardType {
    Unknown = "unknown",
    Visa = "visa",
    Mastercard = "mastercard",
}

export interface CreditCardData {
    number: string
    name: string
    expiry: string
    cvv: string
    type: CardType
}
