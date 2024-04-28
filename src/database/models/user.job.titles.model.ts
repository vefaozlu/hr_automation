import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class UserJobTitles extends Model {
    public id!: number;
    public title_name!: string;
    public description!: string;
}

UserJobTitles.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user_job_titles',
    timestamps: true,
    underscored: true,
    paranoid: true
});

export { UserJobTitles }