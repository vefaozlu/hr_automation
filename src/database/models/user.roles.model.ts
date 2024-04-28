import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

class UserRoles extends Model {
    public id!: number;
    public role_name!: string;
}

UserRoles.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user_roles',
    timestamps: true,
    underscored: true,
    paranoid: true
});

export { UserRoles }