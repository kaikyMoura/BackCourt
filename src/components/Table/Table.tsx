import React from 'react';
import styles from './Table.module.scss'

const Table = ({ className, data, fields, headers }: {
    className?: string
    data: Record<string, any>[]
    fields: string[]
    headers?: string[]
}) => {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <div className={className}>
            <table className={`text-sm table-auto border-collapse`}>
                <thead className="sticky top-0">
                    <tr className="text-center">
                        {(headers ?? fields).map((header, i) => (
                            <th key={i} className="px-4 py-2">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="text-center">
                            {fields.map((field) => (
                                <td key={field} className="px-4 py-2">
                                    {row[field] ?? '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;