import React from "react";
import Pagination from "../pagination/pagination";

interface TbAssignmentfootProps {
  metadata: any; // Ganti 'any' dengan tipe yang sesuai jika diketahui
}

const TbAssignmentfoot: React.FC<TbAssignmentfootProps> = ({ metadata }) => {
  return (
    <div>
      <tfoot>
        <tr>
          <td className="py-5" colSpan={7}>
            <div className="flex items-center space-x-3.5">
              <Pagination {...metadata} />
            </div>
          </td>
        </tr>
      </tfoot>
    </div>
  );
};

export default TbAssignmentfoot;
