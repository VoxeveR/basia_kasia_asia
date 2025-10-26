import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const forumTopics = [
    { title: "First Topic", author: "Alice", date: "2023-01-01" },
    { title: "Second Topic", author: "Bob", date: "2023-01-02" },
    { title: "Third Topic", author: "Charlie", date: "2023-01-03" },
];

function Forum(){
    return (
        <div>
            <Table className="w-9/10 bg-white/98 mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forumTopics.map((topic, index) => (
                        <TableRow key={index}>
                            <TableCell>{topic.title}</TableCell>
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