import React, { ReactNode } from 'react'

interface AdminTableProps {
    headers: string[];
    children: ReactNode;
}

const AdminTable: React.FC<AdminTableProps> = ({headers, children}) => {
  return (
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-left">
            <tr>
            {headers.map((header) => (
                <th
                    key={header}
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                    {header}
                </th>
            ))}
            </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
            {children}
        </tbody>
    </table>
  )
}

export default AdminTable
