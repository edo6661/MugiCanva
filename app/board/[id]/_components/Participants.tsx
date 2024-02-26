"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./UserAvatar";

const MAX_PARTICIPANTS = 2;

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_PARTICIPANTS;
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_PARTICIPANTS).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || "T"}
          />
        ))}
        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0] || "T"}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_PARTICIPANTS} more`}
            fallback={`+ ${users.length - MAX_PARTICIPANTS}`}
          />
        )}
      </div>
    </div>
  );
};

Participants.skeleton = () => {
  return (
    <div className=" absolute gap-2 h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md px-2">
      <Skeleton className="w-[28px] h-[28px] bg-muted-foreground rounded-full" />
      <Skeleton className="w-[28px] h-[28px] bg-muted-foreground rounded-full" />
    </div>
  );
};

export default Participants;
