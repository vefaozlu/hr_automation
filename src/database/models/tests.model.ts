import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class Tests extends Model {
    public id!: number;
    public appoinment_date!: Date;
    public driver_id!: number;
    public doc_id!: number;
}

Tests.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    appoinment_date: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
    driver_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    doc_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'tests',
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
});

export { Tests }