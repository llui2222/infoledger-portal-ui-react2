import React from "react";
import {
    Redirect,
    Route,
    Switch, useParams,
    useRouteMatch
} from "react-router-dom";
import Company from "../company/Company";
import CompanySettings from "./settings/CompanySettings";
import CompanyCreatePopup from "./CompanyCreatePopup";
import CompanySidebar from "./CompanySidebar";
import {useSelector} from "react-redux";

function CompanyRouter() {

    let { path } = useRouteMatch();
    let { companyID } = useParams();
    const childCompanies = useSelector(state => state.companies.childCompanies);
    const rootCompany = useSelector(state => state.companies.rootCompany);

    if(!rootCompany) {
        return null;
    }

    const company = rootCompany.profileId === companyID ? rootCompany : childCompanies.find(company => {
        return company.profileId === companyID
    });

    if(!company) {
        return <Redirect to={'/company/' + rootCompany.profileId}/>;
    }

    return (
        <>
            <CompanySidebar company={rootCompany.typeOfBusiness === 'SERVICE_COMPANY' ? company : rootCompany } />
            <Switch>
                <Route path={`${path}/settings`}>
                    <CompanySettings company={company}/>
                </Route>
                <Route path={`${path}`}>
                    <Company company={company}/>
                </Route>
            </Switch>
            <Route path={`${path}/settings/create-company`}>
                <CompanyCreatePopup/>
            </Route>
        </>
    );
}

export default CompanyRouter;
