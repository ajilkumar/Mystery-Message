import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function GET(request: Request) {
  await dbConnect();

  try {
    // Get random users with messages (limit to verified users)
    const usersWithMessages = await UserModel.find({
      isVerified: true,
      isAcceptingMessages: true,
      messages: { $exists: true, $ne: [] },
    })
      .select("username messages")
      .limit(10);

    // Collect all messages from different users
    const allMessages: Array<{
      content: string;
      createdAt: Date;
      username: string;
    }> = [];

    usersWithMessages.forEach((user) => {
      if (user.messages && user.messages.length > 0) {
        // Take a random message from each user (or the latest one)
        const randomMessage =
          user.messages[Math.floor(Math.random() * user.messages.length)];
        if (randomMessage) {
          allMessages.push({
            content: randomMessage.content,
            createdAt: randomMessage.createdAt,
            username: user.username,
          });
        }
      }
    });

    // Shuffle and limit to 10 messages
    const shuffled = allMessages.sort(() => 0.5 - Math.random());
    const sampleMessages = shuffled.slice(0, 10);

    return Response.json(
      {
        success: true,
        messages: sampleMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching sample messages", error);
    // Return some default sample messages if database query fails
    return Response.json(
      {
        success: true,
        messages: [
          {
            content:
              "This is a sample anonymous message. Share your unique link to receive messages from others!",
            createdAt: new Date(),
            username: "sample",
          },
          {
            content:
              "Anonymous messaging allows you to express yourself freely without revealing your identity.",
            createdAt: new Date(),
            username: "sample",
          },
          {
            content:
              "Connect with friends and receive honest feedback through anonymous messages.",
            createdAt: new Date(),
            username: "sample",
          },
        ],
      },
      { status: 200 }
    );
  }
}

