"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "./credit-card"
import { CardType, type CreditCardData } from "@/lib/types"

interface CreditCardFormProps {
    onCardAdded?: () => void
}

export default function CreditCardForm({ onCardAdded }: CreditCardFormProps) {
    const [cardData, setCardData] = useState<CreditCardData>({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
        type: CardType.Unknown,
    })

    const getMinDate = () => {
        const now = new Date()
        const minDate = new Date(now.getFullYear() + 5, now.getMonth())
        const year = minDate.getFullYear()
        const month = String(minDate.getMonth() + 1).padStart(2, "0")
        return `${year}-${month}`
    }

    const getMaxDate = () => {
        const now = new Date()
        const maxDate = new Date(now.getFullYear() + 20, now.getMonth())
        const year = maxDate.getFullYear()
        const month = String(maxDate.getMonth() + 1).padStart(2, "0")
        return `${year}-${month}`
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        let formattedValue = value

        if (name === "number") {
            // Remove all non-numeric characters
            const numericOnly = value.replace(/\D/g, "").substring(0, 16)

            if (numericOnly.length > 0) {
                formattedValue = numericOnly.match(/.{1,4}/g)?.join(" ") || ""
            } else {
                formattedValue = ""
            }

            let type = CardType.Unknown

            if (/^4/.test(numericOnly)) {
                type = CardType.Visa
            } else if (/^5[1-5]/.test(numericOnly)) {
                type = CardType.Mastercard
            }

            setCardData((prev) => ({ ...prev, type }))
        }

        if (name === "expiry") {
            const [year, month] = value.split("-").map(Number)
            const selectedDate = new Date(year, month - 1)
            const minDate = new Date()
            minDate.setFullYear(minDate.getFullYear() + 5)

            if (selectedDate < minDate) {
                alert("La fecha de vencimiento debe ser al menos 5 años en el futuro")
                return
            }

            formattedValue = value
        }

        if (name === "cvv") {
            formattedValue = value.replace(/\D/g, "").substring(0, 3)
        }

        if (name === "name") {
            formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "").toUpperCase()
        }

        setCardData((prev) => ({ ...prev, [name]: formattedValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const expiryYearMonth = cardData.expiry.split("-").map(Number)
        const expiryDate = new Date(expiryYearMonth[0], expiryYearMonth[1] - 1)
        const minDate = new Date()
        minDate.setFullYear(minDate.getFullYear() + 5)

        if (expiryDate < minDate) {
            alert("La fecha de vencimiento debe ser al menos 5 años en el futuro")
            return
        }

        const expirationDate = new Date(expiryYearMonth[0], expiryYearMonth[1] - 1)
        expirationDate.setMonth(expirationDate.getMonth() + 1)
        expirationDate.setDate(0)

        try {
            const response = await fetch("http://localhost:3000/api/cards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    number: Number.parseInt(cardData.number.replace(/\s/g, "")),
                    expirationDate: expirationDate.toISOString(),
                    name: cardData.name,
                    cvv: cardData.cvv,
                    card_issuer: cardData.type === CardType.Visa ? "visa" : "mastercard",
                }),
            })

            if (response.ok) {
                alert("Tarjeta agregada correctamente")
                // Clear form after successful submission
                handleCancelClick()
                // Notify parent component that a card was added
                onCardAdded?.()
            } else {
                alert("Error al agregar la tarjeta")
                console.error("Error response:", await response.text())
            }
        } catch (error) {
            alert("Error al enviar la solicitud")
            console.error("Request error:", error)
        }
    }

    const handleCancelClick = () => {
        setCardData({
            number: "",
            name: "",
            expiry: "",
            cvv: "",
            type: CardType.Unknown,
        })
    }

    const getDisplayExpiry = () => {
        if (!cardData.expiry) return ""
        const [year, month] = cardData.expiry.split("-")
        const shortYear = year.slice(-2)
        return `${month}/${shortYear}`
    }

    return (
        <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="mb-6">
                <CreditCard data={{ ...cardData, expiry: getDisplayExpiry() }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="number">Número de Tarjeta</Label>
                    <Input
                        id="number"
                        name="number"
                        type="text"
                        value={cardData.number}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiry">Fecha Vencimiento</Label>
                        <Input
                            id="expiry"
                            name="expiry"
                            type="month"
                            value={cardData.expiry}
                            onChange={handleInputChange}
                            min={getMinDate()}
                            max={getMaxDate()}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                            id="cvv"
                            name="cvv"
                            type="text"
                            value={cardData.cvv}
                            onChange={handleInputChange}
                            placeholder="000"
                            maxLength={3}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Nombre Titular</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={cardData.name}
                        onChange={handleInputChange}
                        placeholder="NOMBRE COMPLETO"
                        required
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                        Agregar Tarjeta
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancelClick}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}
