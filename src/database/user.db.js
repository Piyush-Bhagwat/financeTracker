import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "./config.db";

const setBalance = async (uid, balanceAmount) => {
    const colRef = doc(db, "users", uid);

    await updateDoc(colRef, { balance: balanceAmount });
    console.log("balance updated");
};

export { setBalance };
