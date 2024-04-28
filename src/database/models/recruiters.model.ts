import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class Recruiters extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public hired_count!: number;
    public group_count!: number;
    public team_lead_id!: number;
}

Recruiters.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    hired_count: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    group_count: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    team_lead_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'recruiters',
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
});

export { Recruiters }