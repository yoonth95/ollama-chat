export default async function Page({ params }: { params: Promise<{ chatRoomId: string }> }) {
  const { chatRoomId } = await params;
  return <div>My Post: {chatRoomId}</div>;
}
