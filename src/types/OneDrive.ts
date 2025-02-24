export interface DriveItem {
  id: string;
  name: string;
  folder?: {
    childCount: number;
  };
  file?: {
    mimeType: string;
  };
  webUrl: string;
  parentReference?: {
    path: string;
  };
}

export interface DriveItemResponse {
  value: DriveItem[];
} 