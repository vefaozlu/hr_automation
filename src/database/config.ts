import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('hr_automation', 'postgres', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    });

export default sequelize;
