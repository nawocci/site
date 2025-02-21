export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  children?: FileItem[];
}