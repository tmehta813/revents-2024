import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardGroup, Grid, Header, Image, TabPane } from "semantic-ui-react";
import { Photo, Profile } from "./profile";
import { auth, storage } from "../../app/config/firebase";
import PhotoUploads from "./PhotoUploads";
import { useAppSelector } from "../../app/store/store";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "./photoSlice";
import { updateProfile } from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { batchSetPhoto } from "../../app/actions/fireStoreAction";

type Props = {
    profile: Profile;
}

export default function ProfilePhoto({ profile }: Props) {
    const [editMode, setEditMode] = useState(false);
    const isCurrentUser = auth.currentUser?.uid === profile.id
    const { data: photos, status } = useAppSelector(state => state.photos)
    const { loadCollection, remove } = useFireStore(`profiles/${profile.id}/photos`)
    const { update } = useFireStore(`profiles`)

    useEffect(() => {
        loadCollection(actions)
    }, [loadCollection])

    async function handleSetMain(photo: Photo) {
        await batchSetPhoto(photo.url)
        await update(profile.id, {
            photoURL: photo.url
        })

        await updateProfile(auth.currentUser!, {
            photoURL: photo.url
        })
    }

    async function handleDeletePhoto(photo: Photo) {
        try {
            const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`)
            await deleteObject(storageRef)
            await remove(photo.id)
        } catch (error: any) {
            toast.error(error.message)
        }

    }

    return (
        <TabPane loading={status === 'loading'}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='photo' content='Photos' />
                    {isCurrentUser &&
                        <Button
                            floated='right'
                            basic
                            content={editMode ? 'Cancel' : 'Add photo'}
                            onClick={() => setEditMode(!editMode)}
                        />}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ? <PhotoUploads profile={profile} setEditMode={setEditMode} /> : (
                        <CardGroup itemsPerRow={5}>
                            {photos.map(photo => (
                                <Card
                                    key={photo.id}
                                >
                                    <Image src={photo.url} />
                                    {isCurrentUser &&
                                        <ButtonGroup>
                                            <Button
                                                basic
                                                disabled={photo.url === profile.photoURL}
                                                onClick={() => handleSetMain(photo)}
                                                color='green'
                                            >Main</Button>
                                            <Button
                                                onClick={() => { handleDeletePhoto(photo) }}
                                                disabled={photo.url === profile.photoURL}
                                                basic
                                                color='red'
                                                icon='trash' />
                                        </ButtonGroup>}
                                </Card>
                            ))}

                        </CardGroup>
                    )}
                </Grid.Column>
            </Grid>
        </TabPane>
    );
}
