import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class Notes extends Model {
    public id!: number;
    public note!: string;
    public driver_id!: number;
    public creator_id!: number;
}

Notes.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    note: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    driver_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    creator_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'notes',
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
});

export { Notes }