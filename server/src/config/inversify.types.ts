export const TYPES = {
    Common: {
        Database: Symbol("Database"),
        Encryption: Symbol("Encription"),
        FormMiddleware: Symbol("Multer")
    },
    User: {
        Model: Symbol("UserModel"),
        Repository: Symbol("UserRepository"),
        Service: Symbol("UserService"),
        Controller: Symbol("UserController")
    },
    Auth: {
        Service: Symbol("AuthService"),
        Controller: Symbol("AuthController")
    },
    Organization: {
        Model: Symbol("OrganizationModel"),
        Repository: Symbol("OrganizationRepository"),
        Service: Symbol("OrganizationService"),
        Controller: Symbol("OrganizationController"),
    },
    Project: {
        Model: Symbol("ProjectModel"),
        Repository: Symbol("ProjectRepository"),
        Service: Symbol("ProjectService"),
        Controller: Symbol("ProjectController")
    },
    Transaction: {
        Model: Symbol("TransactionModel"),
        Repository: Symbol("TransactionRepository"),
        Service: Symbol("TransactionService"),
        Controller: Symbol("TransactionController")
    },
    Stellar: {
        Repository: Symbol("StellarRepository"),
        Service: Symbol("StellarService")
    }
}