import { type CreditCardData, CardType } from "@/lib/types"
import { CreditCardIcon, ViewIcon as VisaIcon } from "lucide-react"

interface CreditCardProps {
    data: CreditCardData
}

export function CreditCard({ data }: CreditCardProps) {
    const getCardBackground = () => {
        switch (data.type) {
            case CardType.Visa:
                return "bg-gradient-to-r from-blue-900 to-blue-700"
            case CardType.Mastercard:
                return "bg-black"
            default:
                return "bg-gradient-to-r from-gray-800 to-gray-700"
        }
    }

    const getCardLogo = () => {
        switch (data.type) {
            case CardType.Visa:
                return <VisaIcon className="h-8 w-12 text-white" />
            case CardType.Mastercard:
                return (
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-red-500 opacity-90" />
                        <div className="h-8 w-8 rounded-full bg-yellow-500 opacity-90 -ml-4" />
                    </div>
                )
            default:
                return <CreditCardIcon className="h-8 w-8 text-white" />
        }
    }

    return (
        <div className="w-[420px] aspect-[3.375/2.125] mx-auto flex items-center justify-center">
            <div
                className={`${getCardBackground()} rounded-xl p-6 text-white shadow-lg w-full relative overflow-hidden`}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <div className="h-10 w-12 bg-yellow-100/20 rounded mb-4"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-4 border border-white rounded-sm opacity-70"/>
                        <div className="w-6 h-4 border border-white rounded-sm opacity-70"/>
                        <div className="w-6 h-4 border border-white rounded-sm opacity-70"/>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-xs opacity-70">Card Number</p>
                    <p className="text-xl tracking-wider mb-6">{data.number || "0000 0000 0000 0000"}</p>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs opacity-70">cardholder</p>
                            <p>{data.name || "CARDHOLDER NAME"}</p>
                        </div>
                        <div>
                            <p className="text-xs opacity-70">expiration</p>
                            <p>{data.expiry || "00/00"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
