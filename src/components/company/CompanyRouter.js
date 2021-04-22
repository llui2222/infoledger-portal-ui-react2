import React from "react";
import {
    Route,
    Switch, useParams,
    useRouteMatch
} from "react-router-dom";
import Company from "../company/Company";
import CompanySettings from "./CompanySettings";
import CompanyCreatePopup from "./CompanyCreatePopup";
import CompanySidebar from "./CompanySidebar";
import {useSelector} from "react-redux";

function CompanyRouter() {

    let { path } = useRouteMatch();
    let { companyID } = useParams();
    const companies = useSelector(state => state.companies.companies);

    if(companies.length === 0) {
        return null;
    }

    const company = companies.find(company => {
        return company.profileId === companyID
    });

    return (
        <>
            <CompanySidebar company={company} />
            <Switch>
                <Route path={`${path}/settings`}>
                    <CompanySettings company={company}/>
                </Route>
                <Route path={`${path}`}>
                    <Company company={company}/>
                </Route>
            </Switch>
            <Route path={`${path}/settings/create-company`}>
                <CompanyCreatePopup parentCompany={company}/>
            </Route>
        </>
    );
}

export default CompanyRouter;
