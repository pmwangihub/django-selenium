


import { useSelector } from "react-redux";
import { wrapper } from "../wrapper/Wrapper"
import { SideBar } from "./SideBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function profileWrapper(WrappedComponent) {

    const ProfileWrapper = (props) => {
        const navigate = useNavigate();
        const auth = useSelector(state => state.AuthLoginReducer);

        useEffect(() => {
            if (!auth.authData && !auth.authLoader) {
                navigate("/", { replace: true })
            }
        }, [auth.authData, auth.authLoader, navigate])


        return (
            <div className="row">
                {auth && auth.authData && <SideBar {...auth} />}

                <div className="col-md-9 col-lg-10 col-sm-12 ms-sm-auto  px-md-4">
                    <WrappedComponent {...props} {...auth} />
                </div>
            </div>
        )
    };

    const WrappedProfileComponent = wrapper(ProfileWrapper, "container-fluid mt-2");

    return WrappedProfileComponent;
}

