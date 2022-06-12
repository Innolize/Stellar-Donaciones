import * as StellarSDK from 'stellar-sdk'
import axios from 'axios'
import { injectable } from 'inversify'

@injectable()
export class StellarRepository {
    private SERVER_URL = "https://horizon-testnet.stellar.org"
    private server = new StellarSDK.Server(this.SERVER_URL)
    constructor() { }

    createAccount = async () => {
        const newAccountKeys = StellarSDK.Keypair.random()
        const accPublicKey = newAccountKeys.publicKey()
        try {
            (await axios.get(`https://friendbot.stellar.org?addr=${accPublicKey}`)).data
            return {
                publicKey: newAccountKeys.publicKey(),
                privateKey: newAccountKeys.secret()
            }
        } catch (error) {
            throw Error('Error!')
        }
    }

    transaction = async (originSecret: string, destinationPublic: string, amount: number) => {
        await this.checkIfAccountExists(destinationPublic)
        const originKeys = StellarSDK.Keypair.fromSecret(originSecret)
        const originAccount = await this.server.loadAccount(originKeys.publicKey())
        const transaction = new StellarSDK.TransactionBuilder(originAccount, {
            fee: StellarSDK.BASE_FEE,
            networkPassphrase: StellarSDK.Networks.TESTNET
        })
            .addOperation(
                StellarSDK.Operation.payment({
                    destination: destinationPublic,
                    asset: StellarSDK.Asset.native(),
                    amount: amount.toString()
                })
            )
            .addMemo(StellarSDK.Memo.text("Test Transaction"))
            .setTimeout(180)
            .build();
        transaction.sign(originKeys)
        return await this.server.submitTransaction(transaction)
    }


    checkIfAccountExists = async (publicKey: string) => {
        try {
            await this.server.loadAccount(publicKey)
        } catch (error) {
            throw new Error("La cuenta no existe!")
        }
    }
}


