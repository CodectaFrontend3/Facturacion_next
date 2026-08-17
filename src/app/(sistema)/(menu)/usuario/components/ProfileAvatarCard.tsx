import { Card, CardContent } from "@/components/ui/card";

interface ProfileAvatarCardProps {
  avatarUrl: string;
  altText?: string;
}

export function ProfileAvatarCard({
  avatarUrl,
  altText = "Profile Image",
}: ProfileAvatarCardProps) {
  return (
    <Card className="w-full h-full bg-white border border-slate-200/50 !rounded-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-h-[380px] flex items-center justify-center p-6">
      <CardContent className="p-0 flex justify-center items-center w-full h-full">
        <img
          src={avatarUrl}
          alt={altText}
          className="max-h-56 max-w-full object-contain"
        />
      </CardContent>
    </Card>
  );
}

export default ProfileAvatarCard;
