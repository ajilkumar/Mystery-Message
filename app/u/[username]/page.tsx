"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2, MessageSquare, Send, UserX, AlertCircle, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";

const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Message content must be at least 10 characters long." })
    .max(300, {
      message: "Message content must be at most 300 characters long.",
    }),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface UserInfo {
  username: string;
  isAcceptingMessages: boolean;
}

const PublicProfilePage = () => {
  const params = useParams();
  const username = params?.username as string;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!username) return;

      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse & { user?: UserInfo }>(
          `/api/get-user?username=${username}`
        );

        if (response.data.success && response.data.user) {
          setUserInfo(response.data.user);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response?.status === 404) {
          setUserInfo(null);
        } else {
          toast.error("Failed to load user profile");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [username]);

  const onSubmit = async (data: MessageFormData) => {
    if (!username || !userInfo) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content: data.content,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Message sent successfully!");
        form.reset();
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to send message. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 rounded-full bg-muted p-4 w-fit">
              <UserX className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>User Not Found</CardTitle>
            <CardDescription>
              The user you're looking for doesn't exist or hasn't verified their account.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!userInfo.isAcceptingMessages) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 rounded-full bg-muted p-4 w-fit">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Not Accepting Messages</CardTitle>
            <CardDescription>
              @{userInfo.username} is currently not accepting messages.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 rounded-full bg-primary/10 p-4 w-fit">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Send a Message to @{userInfo.username}</CardTitle>
            <CardDescription>
              Send an anonymous message. Your identity will remain hidden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here (10-300 characters)..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between items-center">
                        <FormMessage />
                        <span className="text-xs text-muted-foreground">
                          {field.value?.length || 0}/300
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Note:</strong> This message will be sent anonymously. The recipient will not
                know who sent it.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Join the Webapp Section */}
        <Card className="mt-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6 md:p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Want to Receive Messages Too?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Join Mystery Message and get your own unique link to receive anonymous messages from friends, followers, and colleagues.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>100% Anonymous</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Easy to Use</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/sign-up">
                  Join Mystery Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicProfilePage;
