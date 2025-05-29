const admin = require("firebase-admin");
const db = require("../config/firebase");
const collection = db.collection("credit-cards");

exports.getAllCards = async (req, res) => {
    try {
        const snapshot = await collection.get();
        const cards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCard = async (req, res) => {
    try {
        const { number, expirationDate, name, cvv, card_issuer } = req.body;

        if (
            isEmpty(number) ||
            isEmpty(expirationDate) ||
            isEmpty(name) ||
            isEmpty(cvv) ||
            isEmpty(card_issuer)
        ) {
            return res.status(400).json({ message: "Missing one or more required fields." });
        }

        const numberStr = String(number);
        if (!/^\d{16}$/.test(numberStr)) {
            return res.status(400).json({ message: "Card number must be 16 digits and numeric only." });
        }

        const existing = await collection.where("number", "==", Number(number)).get();
        if (!existing.empty) {
            return res.status(409).json({ message: "Card number already exists." });
        }

        const expDate = new Date(expirationDate);
        const fiveYearsLater = new Date();
        fiveYearsLater.setFullYear(fiveYearsLater.getFullYear() + 5);
        if (expDate < fiveYearsLater) {
            return res.status(400).json({ message: "Expiration date must be at least 5 years in the future." });
        }

        if (typeof name !== "string" || name.length > 20) {
            return res.status(400).json({ message: "Cardholder name must be a string with max 20 characters." });
        }

        const cvvStr = String(cvv);
        if (!/^\d{3}$/.test(cvvStr)) {
            return res.status(400).json({ message: "CVV must be a 3-digit numeric value." });
        }

        const data = {
            number: Number(numberStr),
            expirationDate: admin.firestore.Timestamp.fromDate(expDate),
            name,
            cvv: Number(cvvStr),
            card_issuer
        };

        const docRef = await collection.add(data);
        res.status(201).json({ id: docRef.id, ...data });

    } catch (err) {
        console.error("Error creating card:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getCard = async (req, res) => {
    try {
        const doc = await collection.doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).update(req.body);
        res.status(200).json({ message: "Card updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        await collection.doc(req.params.id).delete();
        res.status(200).json({ message: "Card deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

function isEmpty(value) {
    return value === undefined || value === null || value === "";
}