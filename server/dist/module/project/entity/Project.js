"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
class Project {
    constructor(author_id, goal, name, description, from, to, id, image, Author) {
        this.author_id = author_id;
        this.goal = goal;
        this.name = name;
        this.description = description;
        this.from = from;
        this.to = to;
        this.id = id;
        this.image = image;
        this.Author = Author;
    }
}
exports.Project = Project;
