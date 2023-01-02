import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSwORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: ["query", "error"]
}

// export const typeORMConfig: TypeOrmModuleOptions = {
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: '4989',
//     database: 'cat',
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize: true,
//     logging: ["query", "error"]
// }
