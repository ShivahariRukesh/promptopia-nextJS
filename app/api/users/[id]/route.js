import { connectToDB } from "@utils/database";
import Prompt from "@models/propmt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const getPrompt = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify(getPrompt), { status: 200 });
  } catch (err) {
    console.log("Error while fetching prompt for the specific user", err);
    return Response(JSON.stringify({ msg: err }), { status: 500 });
  }
};
