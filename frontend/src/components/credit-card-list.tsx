"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, CreditCardIcon } from "lucide-react"
import type { CreditCardResponse } from "./credit-card-app"

interface CreditCardListProps {
    cards: CreditCardResponse[]
    loading: boolean
    error: string | null
    onRefresh: () => void
}

export default function CreditCardList({ cards, loading, error, onRefresh }: CreditCardListProps) {
    const maskCardNumber = (number: number): string => {
        const numberStr = number.toString()
        if (numberStr.length < 6) return numberStr

        const firstTwo = numberStr.slice(0, 2)
        const lastFour = numberStr.slice(-4)
        const maskedMiddle = "*".repeat(numberStr.length - 6)

        return `${firstTwo}${maskedMiddle}${lastFour}`
    }

    const formatExpirationDate = (expirationDate: { _seconds: number; _nanoseconds: number }): string => {
        const date = new Date(expirationDate._seconds * 1000 + expirationDate._nanoseconds / 1000000)
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = String(date.getFullYear()).slice(-2)
        return `${month}/${year}`
    }

    const getCardTypeIcon = (cardIssuer: string) => {
        switch (cardIssuer.toLowerCase()) {
            case "visa":
                return (
                    <div className="flex items-center justify-center w-8 h-6 bg-blue-600 text-white text-xs font-bold rounded">
                        VISA
                    </div>
                )
            case "mastercard":
                return (
                    <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-red-500 opacity-90" />
                        <div className="h-6 w-6 rounded-full bg-yellow-500 opacity-90 -ml-3" />
                    </div>
                )
            default:
                return <CreditCardIcon className="h-6 w-6 text-gray-500" />
        }
    }

    const getCardAddedDate = (expirationDate: { _seconds: number; _nanoseconds: number }): string => {
        return new Date().toLocaleDateString()
    }

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Mis Tarjetas
                        <Button variant="outline" size="sm" disabled>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Mis Tarjetas
                        <Button variant="outline" size="sm" onClick={onRefresh}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">{error}</p>
                        <Button onClick={onRefresh} variant="outline">
                            Intentar de nuevo
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Mis Tarjetas ({cards.length})
                    <Button variant="outline" size="sm" onClick={onRefresh}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {cards.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <CreditCardIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No tienes tarjetas registradas</p>
                        <p className="text-sm">Agrega tu primera tarjeta usando el formulario</p>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {cards.map((card) => (
                            <div key={card.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        {getCardTypeIcon(card.card_issuer)}
                                        <span className="font-medium text-sm uppercase">{card.card_issuer}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{getCardAddedDate(card.expirationDate)}</span>
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Número de Tarjeta</p>
                                        <p className="font-mono text-lg tracking-wider">{maskCardNumber(card.number)}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Titular</p>
                                            <p className="font-medium text-sm">{card.name || "Sin nombre"}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Vencimiento</p>
                                            <p className="font-medium text-sm text-right">
                                                {formatExpirationDate(card.expirationDate)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
