import Prompt from "@models/propmt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const getPrompt = await Prompt.find({});
    console.log(getPrompt);
    return new Response(JSON.stringify(getPrompt), { status: 200 });
  } catch (err) {
    console.log("Error while getting prompts", err);
    return new Response(JSON.stringify({ msg: err }), { status: 500 });
  }
};
