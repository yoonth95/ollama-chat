"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteChatRoom } from "@/components/layout/sidebar/services";
import { DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { revalidateTagAction } from "@/actions/revalidateTagAction";
import { Pencil, Trash2 } from "lucide-react";

const ChatRoomMenu = ({ roomId }: { roomId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const isNowChatRoom = pathname === "/chat/" + roomId;
  const alertMessage = isNowChatRoom ? "현재 채팅방이 삭제되고 메인페이지로 이동합니다." : "해당 채팅방이 삭제됩니다.";

  // 채팅방 삭제
  const handleDelete = async () => {
    const { ok, message } = await deleteChatRoom(roomId);
    if (ok) {
      toast.success(message);
      revalidateTagAction("rooms");
      isNowChatRoom && router.replace("/");
    } else {
      toast.error(message);
    }
    return;
  };

  // 채팅방 이름 변경
  const handleRename = () => {};

  return (
    <>
      <DropdownMenuContent
        className="mt-[-5px] min-w-[10rem] space-y-2 border border-border bg-accent px-2 py-3"
        align="start"
      >
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3 rounded-md p-3 text-sm dark:hover:bg-neutral-700/60"
          onClick={handleRename}
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

      {/* Alert 부분 */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="dark:bg-neutral-700">
          <AlertDialogHeader>
            <AlertDialogTitle>채팅을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-1">
            <AlertDialogCancel className="rounded-3xl border dark:border-neutral-700 dark:bg-transparent dark:hover:bg-neutral-700/70">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-3xl bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 hover:dark:bg-red-600"
              onClick={handleDelete}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChatRoomMenu;
