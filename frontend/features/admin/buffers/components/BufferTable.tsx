import React from 'react';
import {Button} from '@/components/ui/button';
import {Trash2} from 'lucide-react';
import {BufferItem} from '@/features/admin/types/buffer.types';

interface BufferTableProps {
  buffers: BufferItem[];
  isLoading: boolean;
  onDelete: (buffer_id: string) => void;
}

export default function BufferTable({
  buffers,
  isLoading,
  onDelete
}: BufferTableProps) {
  if (isLoading) return <p>Loading buffers...</p>;

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left">Manager</th>
            <th className="px-4 py-2 text-left">Buffer Amount</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buffers.length > 0 ? (
            buffers.map(buffer => (
              <tr
                key={buffer._id}
                className="border-t hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-2">{buffer.manager_name}</td>
                <td className="px-4 py-2">{buffer.buffer_price}</td>
                <td className="px-4 py-2 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(buffer._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-6 text-center text-muted-foreground"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
