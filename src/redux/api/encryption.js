import {currentCredentials} from "./auth";
import {buildClient, CommitmentPolicy, getClient, KMS, KmsKeyringBrowser} from "@aws-crypto/client-browser";

const { encrypt, decrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
)

async function keyringProvider () {

    const credentials = await currentCredentials();

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

    return new KmsKeyringBrowser({
        clientProvider,
        generatorKeyId,
        keyIds,
    });
}

export async function encryptData(action) {

    const {message, context} = action;

    const preparedData = new TextEncoder("utf-8").encode(message);
    const keyring = await keyringProvider();

    const encryptedData =  await encrypt(keyring, preparedData, {
        encryptionContext: context,
    });

    return encryptedData.result;
}

export async function decryptData(action) {

    const {message, context} = action;
    const keyring = await keyringProvider();
    const { plaintext, messageHeader } = await decrypt(keyring, message);
    const { encryptionContext } = messageHeader;

    Object.entries(context).forEach(([key, value]) => {
        if (encryptionContext[key] !== value)
            throw new Error('Encryption Context does not match expected values')
    })

    return new TextDecoder().decode(plaintext);
}