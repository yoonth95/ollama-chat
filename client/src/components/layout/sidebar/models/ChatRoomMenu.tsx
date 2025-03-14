"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { deleteChatRoom } from "@/components/layout/sidebar/services";
import { ConfirmDialog, EditDialog } from "@/components/common";
import { revalidateTagAction } from "@/actions/revalidateTagAction";
import { Pencil, Trash2 } from "lucide-react";

interface ChatRoomMenuProps {
  roomId: string;
  roomTitle: string;
  setRoomTitle: Dispatch<SetStateAction<string>>;
}

const ChatRoomMenu = ({ roomId, roomTitle, setRoomTitle }: ChatRoomMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const isNowChatRoom = pathname === "/chat/" + roomId;
  const alertMessage = isNowChatRoom ? "현재 채팅방이 삭제되고 메인페이지로 이동합니다." : "해당 채팅방이 삭제됩니다.";

  // 채팅방 삭제
  const handleDelete = async () => {
    const { ok, message } = await deleteChatRoom(roomId);
    if (ok) {
      toast.success(message);
      revalidateTagAction("rooms");
      if (isNowChatRoom) router.replace("/");
    } else {
      toast.error(message);
    }
    return;
  };

  const handleRename = async (name: string) => {
    console.log(name);
    setRoomTitle(name);
    setShowEditDialog(false);
  };

  return (
    <>
      <DropdownMenuContent
        className="mt-[-5px] min-w-[10rem] space-y-2 border border-border bg-accent px-2 py-3"
        align="start"
      >
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3 rounded-md p-3 text-sm dark:hover:bg-neutral-700/60"
          onClick={() => setShowEditDialog(true)}
        >
          <Pencil />
          <span>이름 변경</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3 rounded-md p-3 text-sm text-red-400 hover:text-red-400 dark:hover:bg-neutral-700/60"
          onClick={() => setShowConfirmDialog(true)}
        >
          <Trash2 />
          <span>삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* 삭제 Alert */}
      <ConfirmDialog
        title="채팅방을 삭제하시겠습니까?"
        description={alertMessage}
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleDelete}
        confirmText="삭제"
        confirmColor="bg-red-500 hover:bg-red-600 dark:bg-red-500 hover:dark:bg-red-600"
      />

      {/* 이름 변경 Alert */}
      <EditDialog
        title="채팅방 이름 변경"
        open={showEditDialog}
        inputValue={roomTitle}
        onOpenChange={setShowEditDialog}
        onConfirm={handleRename}
      />
    </>
  );
};

export default ChatRoomMenu;
