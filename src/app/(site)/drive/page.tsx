import { graphClient } from "@/utils/graphClient";
import FolderView from "@/components/Drive/DriveLayout";

export default async function Drive() {
  const userId = "me@altaf.xyz"; // Replace with actual user email
  const response = await graphClient
    .api(`/users/${userId}/drive/root/children`)
    .get();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">OneDrive Files</h1>
      <FolderView items={response.value} userId={userId} />
    </div>
  );
} 