import React, { ReactNode } from 'react'

interface AdminTableProps {
    headers: string[];
    children: ReactNode;
}

const AdminTable: React.FC<AdminTableProps> = ({headers, children}) => {
  return (
    <table className="min-w-full bg-white text-sm">
        <thead className="text-left">
            <tr className='bg-[#03cf7a7b] border-2 border-[#03CF79]'>
            {headers.map((header) => (
                <th
                    key={header}
                    className="whitespace-nowrap px-4 py-4 font-medium text-gray-900"
                >
                    {header}
                </th>
            ))}
            </tr>
        </thead>

        <tbody className="divide-y border border-[#0E1428]">
            {children}
        </tbody>
    </table>
  )
}

export default AdminTable
