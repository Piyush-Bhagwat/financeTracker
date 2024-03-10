import { addDoc, collection } from "@firebase/firestore";
import { db } from "./config.db";

const addTransaction = async (uid, transactionData) => {
    const colRef = collection(db, `users/${uid}/transactions`);

    await addDoc(colRef, transactionData);
    console.log("transactionData inserted");
};

export { addTransaction };
