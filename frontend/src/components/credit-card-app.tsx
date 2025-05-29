"use client"

import { useState, useEffect } from "react"
import CreditCardForm from "./credit-card-form"
import CreditCardList from "./credit-card-list"

export interface CreditCardResponse {
    id: string
    number: number
    expirationDate: {
        _seconds: number
        _nanoseconds: number
    }
    name: string
    cvv: number
    card_issuer: string
}

export default function CreditCardApp() {
    const [cards, setCards] = useState<CreditCardResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCards = async () => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:3000/api/cards")

            if (!response.ok) {
                throw new Error("Error al cargar las tarjetas")
            }

            const data = await response.json()
            setCards(data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido")
            console.error("Error fetching cards:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCards()
    }, [])

    const handleCardAdded = () => {
        fetchCards()
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Card List */}
            <div className="order-2 lg:order-1">
                <CreditCardList cards={cards} loading={loading} error={error} onRefresh={fetchCards} />
            </div>

            {/* Right side - Card Form */}
            <div className="order-1 lg:order-2">
                <CreditCardForm onCardAdded={handleCardAdded} />
            </div>
        </div>
    )
}
