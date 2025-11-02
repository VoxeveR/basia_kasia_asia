import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Menu from "@/components/Menu";
import Footer from "@/components/Foooter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

function ThreadDetailPage() {
    const { id, threadId } = useParams<{ id: string; threadId: string }>();
    const [newComment, setNewComment] = useState("");

    // Mock data for the thread - in a real app, you'd fetch this based on the threadId
    const thread = {
        id: threadId,
        title: "Sample Thread Title",
        author: "Username",
        date: "01.01.2024",
        avatar: "/src/assets/img/default-user.svg",
        content: "This is the main thread content. Users can discuss this topic in the comments below. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };

    const [comments, setComments] = useState([
        {
            id: 1,
            username: "User1",
            date: "02.01.2024",
            avatar: "/src/assets/img/default-user.svg",
            content: "Great thread! I have some thoughts on this topic. It's really interesting how you approached this problem.",
        },
        {
            id: 2,
            username: "User2",
            date: "03.01.2024",
            avatar: "/src/assets/img/default-user.svg",
            content: "I agree with the points made above. Additionally, I think we should consider other aspects as well.",
        },
        {
            id: 3,
            username: "User3",
            date: "04.01.2024",
            avatar: "/src/assets/img/default-user.svg",
            content: "Thanks for sharing this! Very helpful information.",
        },
    ]);

    const handlePostComment = () => {
        if (!newComment.trim()) {
            toast.warning("Please enter a comment before posting");
            return;
        }

        // Create new comment object
        const comment = {
            id: comments.length + 1,
            username: "CurrentUser", // In a real app, get from auth context
            date: new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
            }).replace(/\//g, '.'),
            avatar: "/src/assets/img/default-user.svg",
            content: newComment,
        };

        // Add comment to the list
        setComments([...comments, comment]);
        
        // Clear the textarea
        setNewComment("");
        
        // Show success message
        toast.success("Comment posted successfully!");
    };

    const handleCancel = () => {
        setNewComment("");
        toast.info("Comment cancelled");
    };

    return (
        <div className='w-full min-h-screen flex flex-col gap-4 p-4 bg-gray-50'>
            <Menu />
            
            <div className="container mx-auto max-w-4xl flex-1">
                {/* Thread Header */}
                <div className="mb-4">
                    <Button variant="outline" onClick={() => window.history.back()}>
                        ← Back to Threads
                    </Button>
                </div>

                {/* Main Thread Post */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                    <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>
                    
                    <div className="flex items-start space-x-3 mb-4">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={thread.avatar} alt={thread.author} />
                            <AvatarFallback>{thread.author[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">{thread.author}</span>
                                <span className="text-gray-500 text-sm">• {thread.date}</span>
                            </div>
                            
                            <p className="text-gray-700 mt-3 leading-relaxed">
                                {thread.content}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Comments ({comments.length})
                    </h2>
                    
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-3">
                            <div className="flex items-start space-x-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={comment.avatar} alt={comment.username} />
                                    <AvatarFallback>{comment.username[0]}</AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="font-semibold text-gray-900">{comment.username}</span>
                                        <span className="text-gray-500 text-sm">• {comment.date}</span>
                                    </div>
                                    
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* New Comment Form */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold mb-3">Add a Comment</h3>
                    
                    <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src="/src/assets/img/default-user.svg" alt="Your avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                            <Textarea 
                                placeholder="Write your comment..." 
                                className="min-h-[100px] mb-3 resize-none"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            
                            <div className="flex justify-end space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={handleCancel}
                                    disabled={!newComment.trim()}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    size="sm"
                                    onClick={handlePostComment}
                                    disabled={!newComment.trim()}
                                >
                                    Post Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ThreadDetailPage;
