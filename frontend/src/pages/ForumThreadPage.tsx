import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Menu from "@/components/Menu";
import Footer from "@/components/Foooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

function ForumThreadPage() {
    const { id } = useParams<{ id: string }>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [threadTitle, setThreadTitle] = useState("");
    const [threadDescription, setThreadDescription] = useState("");

    // Mock data for threads in this forum
    const [forumThreads, setForumThreads] = useState([
        { id: "1", title: "How to get started with React?", author: "Alice", date: "2024-01-01", replies: 5 },
        { id: "2", title: "Best practices for TypeScript", author: "Bob", date: "2024-01-02", replies: 12 },
        { id: "3", title: "Understanding React Hooks", author: "Charlie", date: "2024-01-03", replies: 8 },
        { id: "4", title: "State management solutions", author: "Diana", date: "2024-01-04", replies: 15 },
        { id: "5", title: "Performance optimization tips", author: "Eve", date: "2024-01-05", replies: 3 },
    ]);

    const handleCreateThread = () => {
        if (!threadTitle.trim()) {
            toast.warning("Please enter a thread title");
            return;
        }

        // Create new thread object
        const newThread = {
            id: String(forumThreads.length + 1),
            title: threadTitle,
            author: "CurrentUser", // In a real app, get from auth context
            date: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '-'),
            replies: 0,
        };

        // Add thread to the list
        setForumThreads([newThread, ...forumThreads]);

        // Clear form and close dialog
        setThreadTitle("");
        setThreadDescription("");
        setIsDialogOpen(false);

        // Show success message
        toast.success("Thread created successfully!");
    };

    return (
        <div className='w-full min-h-screen flex flex-col gap-4 p-4 bg-gray-50'>
            <Menu />
            
            <div className="container mx-auto max-w-6xl flex-1">
                {/* Forum Header */}
                <div className="mb-6">
                    <Button variant="outline" onClick={() => window.history.back()} className="mb-4">
                        ← Back to Forums
                    </Button>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Forum Category {id}</h1>
                            <p className="text-gray-600">Browse and discuss threads in this category</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    + Create New Thread
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New Thread</DialogTitle>
                                    <DialogDescription>
                                        Start a new discussion in this forum category
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Thread Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter thread title..."
                                            value={threadTitle}
                                            onChange={(e) => setThreadTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Enter thread description..."
                                            className="min-h-[100px] resize-none"
                                            value={threadDescription}
                                            onChange={(e) => setThreadDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateThread}>
                                        Create Thread
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Threads Table */}
                <div className="bg-white rounded-lg border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50%]">Thread Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Replies</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {forumThreads.map((thread) => (
                                <TableRow key={thread.id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <Link 
                                            to={`/forum/${id}/thread/${thread.id}`}
                                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                        >
                                            {thread.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-gray-700">{thread.author}</TableCell>
                                    <TableCell className="text-gray-700">{thread.replies}</TableCell>
                                    <TableCell className="text-gray-500">{thread.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ForumThreadPage;
