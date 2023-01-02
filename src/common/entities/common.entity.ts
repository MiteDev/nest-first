import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Common {
    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp'
    })
    updatedAt: Date
}