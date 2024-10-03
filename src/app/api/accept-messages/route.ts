import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authnticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUSer = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUSer) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Mesage acceptance status updated successfully",
        updatedUSer,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to update user status");

    return Response.json(
      {
        success: false,
        message: "failed to update user status",
      },
      {
        status: 401,
      }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authnticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = user._id;

  try {
    const founduser = await UserModel.findById(userId);
    if (!founduser) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "user not found",
        isAcceptingMessage: founduser.isAcceptingMessage,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to update user status");

    return Response.json(
      {
        success: false,
        message: "error in getting message acceptance status",
      },
      {
        status: 500,
      }
    );
  }
}
