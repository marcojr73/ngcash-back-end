import { prisma } from "../config/database.js"
import { badRequest } from "../utils/errors.js"

async function transactionsDb(accountIn: number, accountOut: number, value: number) {
    try {
        return await prisma.$transaction(async (prisma) => {
            const sender = await prisma.accounts.update({
                where: { id: accountOut },
                data: {
                    balance: {
                        decrement: value
                    }
                }
            })
            if (sender.balance < 0) throw Error
            await prisma.accounts.update({
                where: { id: accountIn },
                data: {
                    balance: {
                        increment: value
                    }
                }
            })
            await prisma.transactions.create({
                data: {
                    debitedAccountId: accountOut,
                    creditedAccountId: accountIn,
                    value
                }
            })
        })
    } catch (error) {
        badRequest("insuficiente balance")
    }
}

async function findTransactionsNoFilters(accountId: number) {
    return await prisma.transactions.findMany({
        select: {
            createdAt: true,
            value: true,
            credited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            },
            debited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        },
        where: {
            OR: [
                { debitedAccountId: accountId },
                { creditedAccountId: accountId }
            ]
        }
    })
}

async function findTransactionsByBetweenDates(accountId, initial, final) {
    return await prisma.transactions.findMany({
        select: {
            createdAt: true,
            value: true,
            credited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            },
            debited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        },
        where: {
            OR: [
                { debitedAccountId: accountId },
                { creditedAccountId: accountId },
            ],
            AND: [
                {
                    createdAt: {
                        lte: final,
                        gte: initial,
                    },
                },
            ]
        }
    })
}

async function findTransactionsByDebited(accountId) {
    return await prisma.transactions.findMany({
        select: {
            createdAt: true,
            value: true,
            credited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            },
            debited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        },
        where: {
            debitedAccountId: accountId
        }

    })
}

async function findTransactionsByCredited(accountId) {
    return await prisma.transactions.findMany({
        select: {
            createdAt: true,
            value: true,
            credited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            },
            debited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        },
        where: {
            creditedAccountId: accountId
        }

    })
}

async function findTransactionsByDateAndDebited(accountId, initial, final) {
    return await prisma.transactions.findMany({
        select: {
            createdAt: true,
            value: true,
            credited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            },
            debited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        },
        where: {
            AND: [
                {
                    createdAt: {
                        lte: final,
                        gte: initial,
                    },
                },
                { debitedAccountId: accountId },
            ]
        }
    })
}

async function findTransactionsByDateAndCredited(accountId, initial, final) {
    return await prisma.transactions.findMany({
        select: {
            createdAt: true,
            value: true,
            credited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            },
            debited: {
                select: {
                    Users: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        },
        where: {
            AND: [
                {
                    createdAt: {
                        lte: final,
                        gte: initial,
                    },
                },
                { creditedAccountId: accountId },
            ]
        }
    })
}

export {
    transactionsDb,
    findTransactionsNoFilters,
    findTransactionsByBetweenDates,
    findTransactionsByDebited,
    findTransactionsByCredited,
    findTransactionsByDateAndDebited,
    findTransactionsByDateAndCredited
}