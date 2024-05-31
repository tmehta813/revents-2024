import { Card, Grid, Header, TabPane } from "semantic-ui-react";
import { useAppSelector } from "../../../app/store/store";
import FollowCard from "./FollowCard";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "./followslice";

type Props = {
    profileId: string
    activeTab: number
}

export default function FollowTab({ profileId, activeTab }: Props) {
    const { data, status } = useAppSelector(state => state.follows)
    const {loadCollection: loadFollowing} = useFireStore(`profiles/${profileId}/following`)
    const {loadCollection: loadFollowers} = useFireStore(`profiles/${profileId}/followers`)

    useEffect(()=>{
        if(activeTab===3){
            loadFollowers(actions)
        }
        if(activeTab===4){
            loadFollowing(actions)
        }

    },[activeTab, loadFollowers, loadFollowing])   
    
    console.log('profile', data);
    

    return (
        <TabPane loading={status === 'loading'}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={activeTab === 3 ? 'Followers' : 'Following'} ></Header>
                </Grid.Column>
            </Grid>
            <Grid.Column width={16}>
                <Card.Group itemsPerRow={5} >
                    {data.map(profile => (
                        (profile.id != null || profile.displayName!=null) && <FollowCard profile={profile} key={profile.id}/>
                    ))}
                </Card.Group>
            </Grid.Column>
        </TabPane>
    )
}