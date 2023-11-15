'use client'
import * as React from "react"
import { useState } from "react"
import { Check, Plus, Send } from "lucide-react"
import { GrEmoji } from 'react-icons/gr';
import axios from 'axios'
import { cn } from "@/lib/utils"
import { HiOutlineGif } from 'react-icons/hi2'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '../components/ui/card'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../components/ui/command'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../components/ui/tooltip'
import EmojiPicker from 'emoji-picker-react'

const users = [
    {
        name: "Olivia Martin",
        email: "m@example.com",
        avatar: "/avatars/01.png",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        avatar: "/avatars/03.png",
    },
    {
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar: "/avatars/05.png",
    },
    {
        name: "Jackson Lee",
        email: "lee@example.com",
        avatar: "/avatars/02.png",
    },
    {
        name: "William Kim",
        email: "will@email.com",
        avatar: "/avatars/04.png",
    },
] as const

type User = (typeof users)[number]

const Chat = () => {
    const [open, setOpen] = React.useState(false)
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])
    const [gifUrl, setGifUrl] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [messages, setMessages] = React.useState([
        {
            role: "user",
            content: "You created a new group chat",
        },
    ])
    const [input, setInput] = React.useState("")
    const inputLength = input.trim().length


    const handleEmojiClick = (emojiObject: any) => {
        setInput((prevInput) => prevInput + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleGrEmojiClick = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    const handleGifClick = async () => {
        try {
            const response = await axios.get(
                `https://api.giphy.com/v1/gifs/search?q=hi&api_key=jSlLrqTooqLvxaTRldj27jmplyvVXK85&limit=1`
            );
            const gifData = response.data.data[0];
            const gifUrl = gifData.images.downsized.url;

            setMessages([
                ...messages,
                {
                    role: "gif",
                    content: gifUrl,
                },
            ]);
        } catch (error) {
            console.error('Error fetching GIF:', error);
        }
    };


    return (
        <>
            <Card className="h-full pb-5 bg-zinc-950 rounded-[8px]">
                <CardHeader className="flex flex-row ">
                    <div className="flex items-center space-x-4">
                        <div className="flex">
                            {selectedUsers.length > 0 && (
                                selectedUsers.map((user) => (
                                    <Avatar
                                        key={user.email}
                                        className="inline-block border-2 border-background"
                                    >
                                        <AvatarImage src={user.avatar} alt="Image" />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium leading-none">
                                {selectedUsers.length > 0 && (
                                    selectedUsers.map((user) => user.name).join(', ')
                                )}
                            </p>
                            <p className="text-sm text-muted-foreground text-white">
                                {selectedUsers.length > 0 ? (
                                    selectedUsers.length > 1 ? "Group Chat" : selectedUsers[0].email
                                ) : (
                                    "No users selected"
                                )}
                            </p>
                        </div>
                    </div>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="ml-auto rounded-full text-white"
                                    onClick={() => setOpen(true)}
                                >
                                    <Plus className="h-4 w-4 text-white" />
                                    <span className="sr-only">Add users</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={10} className="text-white">Add users</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeader>
                <CardContent className="max-h-[140px] position-relative  flex flex-col-reverse custom-scrollbar text-white">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex w-max max-w-[75%] flex-col gap-2 rounded-[12px]  px-3 py-2 text-sm border ",
                                    message.role === "user"
                                        ? "ml-auto bg-primary text-primary-foreground"
                                        : message.role === "gif"
                                            ? "ml-auto" // Adjust styling for GIF messages
                                            : "bg-muted"
                                )}
                            >
                                {message.role === "gif" ? (
                                    <img src={message.content} alt="GIF" className="max-w-full" />
                                ) : (
                                    message.content
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>

                <CardFooter>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            if (inputLength === 0) return
                            setMessages([
                                ...messages,
                                {
                                    role: "user",
                                    content: input,
                                },
                            ])
                            setInput("")
                        }}
                        className="flex w-full items-center space-x-2  mt-[60%]"
                    >
                        <div>
                            <Button type="button" size="icon" onClick={handleGifClick}>
                                <HiOutlineGif className="h-8 w-8 text-white" />
                                <span className="sr-only">Send GIF</span>
                            </Button>
                            {gifUrl && (
                                <img src={gifUrl} alt="GIF" className="h-12 w-12" />
                            )}
                        </div>
                        <Input
                            id="message"
                            placeholder="Type your message..."
                            className="flex-1 bg-zinc-800 text-white rounded-[12px]"
                            autoComplete="off"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <div className="relative">
                            <Button type="button" size="icon" className="w-[200px]" onClick={handleGrEmojiClick}>
                                <GrEmoji className="h-8 w-8 text-white" />
                                <span className="sr-only">Open Emoji Picker</span>
                            </Button>
                            {showEmojiPicker && (
                                <div className="absolute bottom-0 right-0 mt-2">
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </div>
                        <Button type="submit" size="icon" disabled={inputLength === 0}>
                            <Send className="h-8 w-8 text-white" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="gap-0 p-0 outline-none">
                    <DialogHeader className="px-4 pb-4 pt-5">
                        <DialogTitle>New message</DialogTitle>
                        <DialogDescription>
                            Invite a user to this thread. This will create a new group
                            message.
                        </DialogDescription>
                    </DialogHeader>
                    <Command className="overflow-hidden rounded-t-none border-t">
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                            <CommandEmpty>No users found.</CommandEmpty>
                            <CommandGroup className="p-2">
                                {users.map((user) => (
                                    <CommandItem
                                        key={user.email}
                                        className="flex items-center px-2"
                                        onSelect={() => {
                                            if (selectedUsers.includes(user)) {
                                                return setSelectedUsers(
                                                    selectedUsers.filter(
                                                        (selectedUser) => selectedUser !== user
                                                    )
                                                )
                                            }

                                            return setSelectedUsers(
                                                [...users].filter((u) =>
                                                    [...selectedUsers, user].includes(u)
                                                )
                                            )
                                        }}
                                    >
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt="Image" />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2">
                                            <p className="text-sm font-medium leading-none">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                        {selectedUsers.includes(user) ? (
                                            <Check className="ml-auto flex h-5 w-5 text-primary" />
                                        ) : null}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                        {selectedUsers.length > 0 ? (
                            <div className="flex -space-x-2 overflow-hidden">
                                {selectedUsers.map((user) => (
                                    <Avatar
                                        key={user.email}
                                        className="inline-block border-2 border-background"
                                    >
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Select users to add to this thread.
                            </p>
                        )}
                        <Button
                            disabled={selectedUsers.length < 2}
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default Chat