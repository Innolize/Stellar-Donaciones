export class Project {
    constructor(
        public id: number,
        public objetivo: number,
        public nombre: string,
        public imagen: string,
        public descripcion: string,
        public desde: Date,
        public hasta: Date
    ) { }
}