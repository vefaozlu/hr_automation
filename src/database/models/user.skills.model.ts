import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class UserSkills extends Model {
    public id!: number;
    public user_id!: number;
    public skill_name!: string;
    public proficiency_level!: string;
}

UserSkills.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    skill_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proficiency_level: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user_skills',
    timestamps: true,
    underscored: true,
    paranoid: true
});

export { UserSkills }