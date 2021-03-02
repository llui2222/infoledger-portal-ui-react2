import React, { useEffect } from "react";
import { encryptData, decryptData } from "../redux/api/crypto";
import {toBase64} from "@aws-sdk/util-base64-browser";

function Crypto() {

    useEffect(async () => {

        const dataToEncrypt = [1,2,3,4,5,6,7,8];
        console.log('dataToEncrypt', dataToEncrypt);

        const encryptedData = await encryptData(dataToEncrypt);

        const resultBase64 = toBase64(encryptedData);
        console.log('encryptedData',resultBase64);

        const decryptedData = await decryptData(encryptedData);
        console.log('decryptedData',decryptedData);

    }, [])

    return null;
}

export default Crypto;
