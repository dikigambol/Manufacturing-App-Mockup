// import { AlertContext } from "@/contexts/alert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertContext } from "@/contexts/alert";
import { useContext } from "react";

const OnMessage = ({ msg, status }) => {
    let alertProps = {
        title: "Success",
        className: "absolute w-fit top-19 right-5 z-[9999] border-green-500 bg-green-50/50 backdrop-blur-sm text-green-800"
    };

    if (status == "error") {
        alertProps = {
            title: "Error",
            className: "absolute w-fit top-19 right-5 z-[9999] border-red-500 bg-red-50/50 backdrop-blur-sm text-red-800"
        };
    } else if (status == "warning") {
        alertProps = {
            title: "Warning",
            className: "absolute w-fit top-19 right-5 z-[9999] border-yellow-500 bg-yellow-50/50 backdrop-blur-sm text-yellow-800"
        };
    }

    return (
        <Alert className={alertProps.className}>
            <AlertTitle className="font-semibold text-base">{alertProps.title}</AlertTitle>
            <AlertDescription className='text-base text-gray-800'> {msg || ''} </AlertDescription>
        </Alert>
    );
}

export const AppAlert = () => {
    const { message, status } = useContext(AlertContext);

    return (
        message ? <OnMessage msg={message} status={status} /> : null
    );
}