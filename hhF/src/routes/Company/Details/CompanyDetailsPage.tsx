import React from "react";
import { useParams } from 'react-router-dom';
import useCompanyDetails from "../../../hooks/useCompanyDetails.ts";

const CompanyDetailPage: React.FC = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const {company, error, handleRoleChange} = useCompanyDetails(companyId!);


    if (error) return <p>{error}</p>;
    if (!company) return <p>Company ID is missing.</p>;

    console.log(company.members)

    return (
        <div>
            <h2>Company Details</h2>
            {company ? (
                <div>
                    <h3>{company.name}</h3>
                    <p>{company.description}</p>

                    <h4>Members</h4>
                    <ul>
                        {company.members.map(member => (
                            <li key={member.user.id}>
                                {member.user.name} - {member.role}
                                {company.owner.id !== member.user.id && (
                                    <select
                                        value={"Change role"}
                                        onChange={(e) => handleRoleChange(member.user.id, e.target.value)}
                                    >
                                        <option value="member">Member</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Company not found</p>
            )}
        </div>
    )
}

export default CompanyDetailPage;