import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

class UserStatus extends Model {
    public id!: number;
    public status_name!: string;
}

UserStatus.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user_status',
    timestamps: true,
    underscored: true,
    paranoid: true
});

export { UserStatus }