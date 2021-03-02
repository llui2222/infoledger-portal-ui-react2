import {currentCredentials} from "./auth";
import {buildClient, CommitmentPolicy, getClient, KMS, KmsKeyringBrowser} from "@aws-crypto/client-browser";

const { encrypt, decrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
)

async function encryptClient () {

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

    return { keyring, context }
}

export async function encryptData(data) {

    const preparedData = new Uint8Array(data);
    const { keyring, context } = await encryptClient();

    const encryptedData =  await encrypt(keyring, preparedData, {
        encryptionContext: context,
    });

    return encryptedData.result;
}

export async function decryptData(data) {

    const { keyring, context } = await encryptClient();
    const { plaintext, messageHeader } = await decrypt(keyring, data);

    const { encryptionContext } = messageHeader;

    Object.entries(context).forEach(([key, value]) => {
        if (encryptionContext[key] !== value)
            throw new Error('Encryption Context does not match expected values')
    })

    return plaintext;
}