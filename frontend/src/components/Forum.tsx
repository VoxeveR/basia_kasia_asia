import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"

const forumTopics = [
    { id: "1", title: "First Topic", author: "Alice", date: "2023-01-01" },
    { id: "2", title: "Second Topic", author: "Bob", date: "2023-01-02" },
    { id: "3", title: "Third Topic", author: "Charlie", date: "2023-01-03" },
];

function Forum(){
    return (
        <div>
            <Table className="w-9/10 mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forumTopics.map((topic) => (
                        <TableRow key={topic.id} className="hover:bg-gray-50 cursor-pointer">
                            <TableCell>
                                <Link 
                                    to={`/forum/${topic.id}`}
                                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                >
                                    {topic.title}
                                </Link>
                            </TableCell>
                            <TableCell>{topic.author}</TableCell>
                            <TableCell>{topic.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Forum;