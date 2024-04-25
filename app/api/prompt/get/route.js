import Prompt from "@models/propmt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    // to populate the creator field of the Prompt schema with actual user documents from the User collection.Basically means the userId connected to the respective prompt has the detail of that user pushed or populated inside the creator attribute  record');
    const getPrompt = await Prompt.find({}).populate("creator");
    console.log(getPrompt);
    return new Response(JSON.stringify(getPrompt), { status: 200 });
  } catch (err) {
    console.log("Error while getting prompts", err);
    return new Response(JSON.stringify({ msg: err }), { status: 500 });
  }
};
