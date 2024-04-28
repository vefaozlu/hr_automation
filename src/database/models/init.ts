import { Users } from './users.model';
import { UserRoles } from './user.roles.model';
import { UserStatus } from './user.status.model';
import { UserProfile } from './user.profile.model';
import { UserJobTitles } from './user.job.titles.model';
import { UserAddresses } from './user.addresses.model';
import { UserSkills } from './user.skills.model';


const pgInit = async () => {
    try {
        await Users.sync({ alter: true });
        await UserRoles.sync({ alter: true });
        await UserStatus.sync({ alter: true });
        await UserProfile.sync({ alter: true });
        await UserJobTitles.sync({ alter: true });
        await UserAddresses.sync({ alter: true });
        await UserSkills.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { pgInit }