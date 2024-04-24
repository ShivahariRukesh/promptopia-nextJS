import { connectToDB } from "@utils/database";
import Prompt from "@models/propmt";

export const POST = async (req) => {
  // I think POST is keyword here for posting
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await new Prompt({
      creator: userId,
      tag,
      prompt,
    });
    newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (err) {
    console.log("Error connecting to database when posting");
    return new Response(JSON.stringify({ msg: err }), { status: 200 });
  }
};
