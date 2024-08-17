"use client"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ContactMessage } from "@prisma/client"
import axios from "axios"
import { ArrowLeft, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface MessageFormProps {
  data: ContactMessage
}

export const MessageForm: React.FC<MessageFormProps> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/contact/${params.id}`)
      router.push("/admin/messages")
      router.refresh()
      toast.success("Message is deleted.")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        diasbled={loading}
      />
      <div className="flex items-center justify-between gap-x-2">
        <Heading
          title="Form Message"
          description="Display the form message from contact form."
        />
        <div className="flex items-center gap-x-2">
          <Button
            variant="secondary"
            className="border"
            onClick={() => router.push("/admin/messages")}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Messages
          </Button>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Subject</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{data.name}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.phone}</TableCell>
            <TableCell>{data.subject}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator />
      <div>
        <span className="font-semibold">Message</span>
        <p>{data.message}</p>
      </div>
    </>
  )
}
