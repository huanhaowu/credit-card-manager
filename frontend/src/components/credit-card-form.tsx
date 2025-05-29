"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "./credit-card"
import { CardType, type CreditCardData } from "@/lib/types"

export default function CreditCardForm() {
    const [cardData, setCardData] = useState<CreditCardData>({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
        type: CardType.Unknown,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        let formattedValue = value

        // Format card number with spaces
        if (name === "number") {
            formattedValue = value.replace(/\s/g, "").substring(0, 16)

            // Add spaces after every 4 digits
            if (formattedValue.length > 0) {
                formattedValue = formattedValue.match(/.{1,4}/g)?.join(" ") || ""
            }

            // Detect card type
            const cardNumber = value.replace(/\s/g, "")
            let type = CardType.Unknown

            if (/^4/.test(cardNumber)) {
                type = CardType.Visa
            } else if (/^5[1-5]/.test(cardNumber)) {
                type = CardType.Mastercard
            }

            setCardData((prev) => ({ ...prev, type }))
        }

        // Format expiry date
        if (name === "expiry") {
            formattedValue = value.replace(/\D/g, "").substring(0, 4)
            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.substring(0, 2)}/${formattedValue.substring(2)}`
            }
        }

        // Format CVV
        if (name === "cvv") {
            formattedValue = value.replace(/\D/g, "").substring(0, 3)
        }

        setCardData((prev) => ({ ...prev, [name]: formattedValue }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Card data submitted:", cardData)
        // Here you would typically send the data to your backend
        alert("Tarjeta agregada correctamente")
    }

    return (
        <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="mb-6">
                <CreditCard data={cardData} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="number">Número de Tarjeta</Label>
                    <Input
                        id="number"
                        name="number"
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
                            value={cardData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" name="cvv" value={cardData.cvv} onChange={handleInputChange} placeholder="000" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Nombre Titular</Label>
                    <Input
                        id="name"
                        name="name"
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
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}
