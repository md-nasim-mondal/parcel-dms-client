import { useAuth } from "@/hooks/useAuth";

export const GetUserAvatar = () => {
  const { user } = useAuth();
  if (!user) return null;

  // If user has profile picture
  if (user.picture) {
    return (
      <img
        src={user.picture}
        alt={user.name}
        className='size-8 rounded-full object-cover'
      />
    );
  }

  // Fallback to initials avatar
  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className='size-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm'>
      {initials}
    </div>
  );
};
