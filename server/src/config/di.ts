import DIContainer, { factory } from "rsdi"
import { Sequelize } from "sequelize/types"

function configureDB() {
    const DB = new Sequelize(<string>process.env.DATABASE, <string>process.env.USERNAME, <string>process.env.PASSWORD, {
        dialect: 'postgres',
        host: 'localhost'
    })
    return DB
}

function addCommonDefinitions(container: DIContainer) {
    container.add({
        Sequelize: factory(configureDB)
    })
}

export const configureDI = () => {
    const container = new DIContainer()
    addCommonDefinitions(container)
}