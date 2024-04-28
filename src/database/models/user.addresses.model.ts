import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class UserAddresses extends Model {
    public id!: number;
    public user_id!: number;
    public address_line1!: string;
    public address_line2!: string;
    public city!: string;
    public state_province!: string;
    public postal_code!: string;
    public country!: string;
    public is_primary!: boolean;
}

UserAddresses.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address_line1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address_line2: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state_province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user_addresses',
    timestamps: true,
    underscored: true,
    paranoid: true
});

export { UserAddresses }