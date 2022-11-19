interface IauthData {
    userName: string
    password: string
}

interface InewTransaction {
    userName: string
    value: number
}

interface Ifilters {
    initial: string
    final: string
    type: string
    // type: "cashin" | "cashout"
}

export {
    IauthData,
    InewTransaction,
    Ifilters
}