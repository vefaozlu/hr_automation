import sequelize from '../config';
import { Users } from './users.model';
import { UserRoles } from './user.roles.model';
import { UserStatus } from './user.status.model';
import { UserProfile } from './user.profile.model';
import { UserJobTitles } from './user.job.titles.model';
import { UserAddresses } from './user.addresses.model';
import { UserSkills } from './user.skills.model';


const pgInit = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('All models were synchronized successfully.');

        Users.sync({ alter: true });
        UserRoles.sync({ alter: true });
        UserStatus.sync({ alter: true });
        UserProfile.sync({ alter: true });
        UserJobTitles.sync({ alter: true });
        UserAddresses.sync({ alter: true });
        UserSkills.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { pgInit }