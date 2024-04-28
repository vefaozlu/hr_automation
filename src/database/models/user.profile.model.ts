import  { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class UserProfile extends Model {
    public id!: number;
    public user_id!: number;
    public name!: string;
    public last_name!: string;
    public email_company!: string;
    public email_individual!: string;
    public phone_number!: string;
    public birth_date!: Date;
    public gender!: string;
    public profile_picture!: string;
    public job_title_id!: number;
    public department!: string;
    public manager_id!: number;
    public hire_date!: Date;
}

UserProfile.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_individual: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false    
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_title_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hire_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user_profile',
    timestamps: true,
    underscored: true,
    paranoid: true
});

export { UserProfile }