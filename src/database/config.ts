import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('hr_automation', 'postgres', '271344', {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    });

export default sequelize;
