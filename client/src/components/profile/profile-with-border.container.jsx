import WithBorder from '../with-border/with-border.component';
import Profile from './profile.component';

const ProfileWithBorder = WithBorder(Profile, props => props);

export default ProfileWithBorder;
