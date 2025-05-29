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
        <div
            className={`${getCardBackground()} rounded-xl p-6 text-white shadow-lg w-full aspect-[1.6/1] relative overflow-hidden`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-xl mb-1">monobank</p>
                    <p className="text-xs opacity-70">Universal Bank</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-4 border border-white rounded-sm opacity-70" />
                    <div className="w-6 h-4 border border-white rounded-sm opacity-70" />
                    <div className="w-6 h-4 border border-white rounded-sm opacity-70" />
                </div>
            </div>

            <div className="mt-8">
                <div className="h-10 w-12 bg-yellow-100/20 rounded mb-4" />
                <p className="text-xl tracking-wider mb-6">{data.number || "0000 0000 0000 0000"}</p>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs opacity-70">valid thru</p>
                        <p>{data.expiry || "00/00"}</p>
                    </div>
                    <div className="uppercase">
                        <p className="text-xs opacity-70">name</p>
                        <p>{data.name || "CARDHOLDER NAME"}</p>
                    </div>
                    <div className="absolute bottom-6 right-6">{getCardLogo()}</div>
                </div>
            </div>
        </div>
    )
}
