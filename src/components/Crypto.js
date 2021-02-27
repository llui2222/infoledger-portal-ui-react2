import React, { useEffect } from "react";
import { Auth } from 'aws-amplify';
import {buildClient, CommitmentPolicy, getClient, KMS, KmsKeyringBrowser} from "@aws-crypto/client-browser";
import {toBase64} from "@aws-sdk/util-base64-browser";

function Crypto() {

    useEffect(() => {

        Auth.currentCredentials()
            .then(credentials => {

                const { encrypt, decrypt } = buildClient(
                    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
                )

                const accessKeyId = credentials.accessKeyId;
                const secretAccessKey = credentials.secretAccessKey;
                const sessionToken = credentials.sessionToken;

                const generatorKeyId =
                    'arn:aws:kms:us-east-1:840966547573:alias/FrontEndEncription'

                const keyIds = [
                    'arn:aws:kms:us-east-1:840966547573:key/b2b73de3-aea3-4f8b-8ee0-34441acbdf7b',
                ]

                const clientProvider = getClient(KMS, {
                    credentials: {
                        accessKeyId,
                        secretAccessKey,
                        sessionToken,
                    },
                })

                const keyring = new KmsKeyringBrowser({
                    clientProvider,
                    generatorKeyId,
                    keyIds,
                })

                const context = {
                    stage: 'testEncryption',
                    purpose: 'POC for client encryption',
                    origin: 'us-east-1'
                }

                const plainText = new Uint8Array([1, 2, 3, 4, 5])

                console.log('plainText:', plainText)
                document.write('</br>plainText:' + plainText + '</br>')

                encrypt(keyring, plainText, {
                    encryptionContext: context,
                }).then(({ result }) => {
                    const resultBase64 = toBase64(result)
                    console.log(resultBase64)
                    document.write(resultBase64)

                    decrypt(keyring, result).then(({ plaintext, messageHeader }) => {

                        const { encryptionContext } = messageHeader

                        Object.entries(context).forEach(([key, value]) => {
                            if (encryptionContext[key] !== value)
                                throw new Error('Encryption Context does not match expected values')
                        })

                        document.write('</br>plaintext:' + plaintext)
                        console.log(plaintext)
                    })
                })
            });

    }, [])

    return null;
}

export default Crypto;
