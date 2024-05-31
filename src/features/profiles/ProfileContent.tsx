import { Tab } from "semantic-ui-react";
import ProfileAbout from "./ProfileAbout";
import { Profile } from "./profile";
import ProfilePhoto from "./ProfilePhoto";
import ProfileEvents from "./ProfileEvents";
import FollowTab from "./following/FollowTab";
import { useState } from "react";

type Props = {
    profile: Profile
}

export default function ProfileContent({ profile }: Props) {
    const [activeTab, setActiveTab] = useState(0)
    const panes = [
        { menuItem: 'About', render: () => <ProfileAbout profile={profile} /> },
        { menuItem: 'Photos', render: () => <ProfilePhoto profile={profile} /> },
        { menuItem: 'Events', render: () => <ProfileEvents profile={profile} /> },
        { menuItem: 'Followers', render: () => <FollowTab key={"follower"} profileId={profile.id} activeTab={activeTab} /> },
        { menuItem: 'Following', render: () => <FollowTab key={"following"} profileId={profile.id} activeTab={activeTab} /> }
    ]
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(_e, data) => setActiveTab(data.activeIndex as number)}
        >
        </Tab>
    )
}