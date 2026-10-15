import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteTaskInBackend, updateTaskInBackend } from "@/lib/backendApi";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const payload = (await request.json()) as {
      title?: string;
      completed?: boolean;
    };

    const updates: { title?: string; completed?: boolean } = {};

    if (payload.title !== undefined) {
      if (typeof payload.title !== "string") {
        return NextResponse.json(
          { error: { message: "title should be string" } },
          { status: 400 },
        );
      }

      updates.title = payload.title.trim();
    }

    if (payload.completed !== undefined) {
      if (typeof payload.completed !== "boolean") {
        return NextResponse.json(
          { error: { message: "completed should be bool" } },
          { status: 400 },
        );
      }

      updates.completed = payload.completed;
    }

    if (updates.title === undefined && updates.completed === undefined) {
      return NextResponse.json(
        { error: { message: "nothing to update" } },
        { status: 400 },
      );
    }

    const task = await updateTaskInBackend(params.id, updates);
    revalidateTag("tasks");
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message:
            error instanceof Error ? error.message : "Unable to update task.",
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    await deleteTaskInBackend(params.id);
    revalidateTag("tasks");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message:
            error instanceof Error ? error.message : "Unable to delete task.",
        },
      },
      { status: 500 },
    );
  }
}
