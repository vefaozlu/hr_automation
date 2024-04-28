import {    Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class Drivers extends Model {
    public id!: number;
    public name!: string;
    public last_name!: string;
    public email!: string;
    public phone!: string;
    public position!: string;
    public company!: string;
    public source!: string;
    public test_count!: number;
    public status!: string;
    public recruiter_id!: number;
}

Drivers.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
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
    position: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    source: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    test_count: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    recruiter_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'drivers',
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
});

export { Drivers }