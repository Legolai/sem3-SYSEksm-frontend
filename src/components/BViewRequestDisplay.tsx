import {Button} from "@/components/index";
import {newScoutRequestMenu} from "@/types/entities/newScoutRequest";
import {ReactNode, useEffect} from "react";

interface requestType {
    requests: newScoutRequestMenu[];
    buttonsTrue: boolean;
    Accept?: (item: newScoutRequestMenu) => void;
    Reject?: (item: newScoutRequestMenu) => void;
}

function BViewRequestDisplay(props: requestType) {

    return (<>
        {
            props.requests.map(request => {
                return (
                    <div className="flex flex-row rounded-md shadow-md items-center m-1 gap-8">
                        <div>
                            {request.id}, Message: {request.message} <br/>
                            Status: {request.status} <br/>
                            SpotMenuID: {request.spotMenuID}, FooclescoutID: {request.fooclescoutsID} <br/>
                            Date of creation: {request.createdAt} <br/>Date of last update: {request.updatedAt}
                        </div>
                        {props.buttonsTrue && <div className="flex flex-row gap-6 ml-auto">
                            <Button onClick={() => {props.Accept && props.Accept(request)}} >
                                Accept
                            </Button>
                            <Button onClick={() => {props.Reject && props.Reject(request)}} >
                                Reject
                            </Button>
                        </div>}

                    </div>
                );
            })
        }
    </>);
}

export default BViewRequestDisplay;