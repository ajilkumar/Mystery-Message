"use client";

import { Message } from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { acceptMessageSchema } from "@/schema/acceptMesageSchema";
import { User } from "next-auth";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Link2, Loader2, RefreshCw } from "lucide-react";
import MessageCard from "@/components/MessageCard";
import Link from "next/link";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => String(message._id) !== String(messageId)));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch mesage settings"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);

      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        const fetchedMessages = response.data.messages || [];
        setMessages(fetchedMessages);
        if (refresh) {
          toast.success("Showing latest messages");
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(
          axiosError.response?.data.message || "Failed to fetch messages"
        );
        setMessages([]);
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchMessages, fetchAcceptMessages]);

  // handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch mesage settings"
      );
    }
  };

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 mx-auto">
                <span className="text-4xl select-none">😊</span>
              </div>
              <CardTitle className="text-2xl">Sign in to access your Dashboard</CardTitle>
              <CardDescription>
                Please sign in to view your messages, unique link, and manage account settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 mt-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link href="/sign-up">Create Free Account</Link>
                </Button>
                <Link href="/" className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors mt-3">
                  &larr; Back to home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const user = session.user as User;
  const username = user?.username;

  // TODO: do more research
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profileUrl);
        toast.success("Profile URL has been copied to clipboard");
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = profileUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          toast.success("Profile URL has been copied to clipboard");
        } catch (err) {
          console.error(err)
          toast.error("Failed to copy URL. Please copy manually.");
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to copy URL. Please copy manually.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your messages and share your unique link
          </p>
        </div>

        {/* Unique Link Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              <CardTitle>Your Unique Link</CardTitle>
            </div>
            <CardDescription>
              Share this link with others to receive anonymous messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md border font-mono text-sm break-all">
                {profileUrl}
              </div>
              <Button
                onClick={copyToClipboard}
                size="icon"
                className="shrink-0"
                variant="outline"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Accept Messages Toggle */}
        <Card>
          <CardHeader>
            <CardTitle>Message Settings</CardTitle>
            <CardDescription>
              Control whether you want to receive new messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label
                  htmlFor="accept-messages"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept Messages
                </label>
                <p className="text-sm text-muted-foreground">
                  {acceptMessages
                    ? "You are currently accepting messages"
                    : "You are not accepting messages"}
                </p>
              </div>
              {isSwitchLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <Switch
                  id="accept-messages"
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Messages Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Messages</CardTitle>
                <CardDescription>
                  {messages.length > 0
                    ? `You have ${messages.length} message${messages.length > 1 ? "s" : ""}`
                    : "No messages yet"}
                </CardDescription>
              </div>
              {messages.length > 0 && (
                <Button
                  onClick={() => fetchMessages(true)}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span className="ml-2">Refresh</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && messages.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageCard
                    key={String(message._id)}
                    message={message}
                    onMessageDelete={handleDeleteMessage}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Link2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No messages to display</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Share your unique link above to start receiving anonymous messages from others.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
