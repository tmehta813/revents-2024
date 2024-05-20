import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "./profile";


type Props = {
    profile: Profile
}

export default function ProfileHeader({profile}: Props) {
    console.log(profile);
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src= {profile.photoURL || '/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' style={{ display: 'block', marginBottom: 10 }} 
                                 content= {profile.displayName}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group>
                        <Statistic label='Followers' value={10}></Statistic>
                        <Statistic label='Following' value={5}></Statistic>
                    </Statistic.Group>
                    <Divider />
                    <Reveal animated='move'>
                        <Reveal.Content visible style={{ width: '100%' }}>
                            <Button fluid color='teal' content='Following'></Button>
                        </Reveal.Content>
                        <Reveal.Content hidden style={{ width: '100%' }}>
                            <Button fluid color='red' content='Unfollow'></Button>
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}