import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class TeamLeads extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
}

TeamLeads.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
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
}, {
    tableName: 'team_leads',
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
});

export { TeamLeads }