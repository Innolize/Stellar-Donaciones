"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(id, amount, user_id, organization_id, project_id, Organization, User, Project) {
        this.id = id;
        this.amount = amount;
        this.user_id = user_id;
        this.organization_id = organization_id;
        this.project_id = project_id;
        this.Organization = Organization;
        this.User = User;
        this.Project = Project;
    }
}
exports.Transaction = Transaction;
