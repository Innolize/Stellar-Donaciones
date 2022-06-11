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
    }
}