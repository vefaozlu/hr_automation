import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

class Users extends Model { 
    public id!: number;
    public user_name!: string;
    public email!: string;
    public password!: string;
    public user_role_id!: number;
    public is_active_id!: number;
    public last_login!: Date;
    public registration_date!: Date;
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_active_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE
    },
    registration_date: {
        type: DataTypes.DATE
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
    deleted_at: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true,
});

export { Users }