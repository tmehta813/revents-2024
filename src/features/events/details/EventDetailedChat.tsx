import { Segment, Header, Comment, CommentGroup } from "semantic-ui-react";
import ChatForm from "./ChatForm";
import { useEffect, useState } from "react";
import { ChatComment } from "../../../app/types/event";
import { fb } from "../../../app/config/firebase";
import { onChildAdded, ref } from "firebase/database";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDistance } from "date-fns";

type Props = {
    eventId: string
}

export default function EventDetailedChat({ eventId }: Props) {
    const [comments, setComments] = useState<ChatComment[]>([]);
    const [replyForm, setReplyForm] = useState<any>({
        open: false,
        commentId: null
    })

    useEffect(() => {
        try {
            const chatRef = ref(fb, `chat/${eventId}`);
            const unsubscribe = onChildAdded(chatRef, snapshot => {
                const data = snapshot.val();
                console.log(data);
                if (snapshot.key && snapshot.key != null) {
                    const newComment = { ...data, id: snapshot.key }
                    setComments(prevComments => [...prevComments, newComment])
                }
            });

            // Return the unsubscribe function outside the onChildAdded callback
            return () => unsubscribe();
        } catch (error: any) {
            toast.error(error.message);
        }
    }, [eventId]);

    function createCommentTree(data: ChatComment[]) {
        const table = Object.create(null);
        data.forEach(item => table[item.id] = { ...item, childNodes: [] })
        const dataTree: ChatComment[] = [];
        data.forEach(item => {
            if (item.parentId) table[item.parentId].childNodes.push(table[item.id])
            else dataTree.push(table[item.id])
        })
        return dataTree
    }

    return (
        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>

            <Segment attached style = {{height: 400, overflowY: 'scroll'}}>
                <Comment.Group style = {{paddingBottom: 0, marginBottom: 0}}>
                <ChatForm eventId={eventId} />
                    {createCommentTree(comments).reverse().map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.photoURL || "/user.png"} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.uid}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistance(comment.date, new Date())} ago</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                                <Comment.Actions
                                    onClick={() => setReplyForm({ open: true, commentId: comment.id })}
                                >
                                    Reply
                                </Comment.Actions>

                                {replyForm.open && replyForm.commentId === comment.id && (
                                    <ChatForm
                                        key={comment.id}
                                        eventId={eventId}
                                        parentId={comment.id}
                                        setReplyForm={setReplyForm}
                                    />
                                )}

                            </Comment.Content>

                            <CommentGroup style={{ paddingBottom: 0 }}>
                                {comment.childNodes.map(child =>

                                    <Comment key ={child.id}>
                                        <Comment.Avatar src={child.photoURL || "/user.png"} />
                                        <Comment.Content>
                                            <Comment.Author as={Link} to={`/profiles/${child.uid}`}>{child.displayName}</Comment.Author>
                                            <Comment.Metadata>
                                                <div>{formatDistance(child.date, new Date())} ago</div>
                                            </Comment.Metadata>
                                            <Comment.Text>{child.text}</Comment.Text>
                                            <Comment.Actions
                                                onClick={() => setReplyForm({ open: true, commentId: child.id })}
                                            >
                                                Reply
                                            </Comment.Actions>

                                            {replyForm.open && replyForm.commentId === child.id && (
                                                <ChatForm
                                                    key={child.id}
                                                    eventId={eventId}
                                                    parentId={child.parentId}
                                                    setReplyForm={setReplyForm}
                                                />
                                            )}

                                        </Comment.Content>
                                    </Comment>
                                )}
                            </CommentGroup>
                        </Comment>
                    ))}
                </Comment.Group>
            </Segment>
        </>
    );
}
