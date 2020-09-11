import React from "react";
import Reload from "./icons/Reload";

/**
 * @param {function} props.onReloadClick
 * @returns {JSX.Element}
 * @constructor
 */
export default function ThemeHeader(props) {
    return (
        <div className="border">
            <div className="m-4" style={{fontSize: "2rem"}}>
                現在のお題
                <div className="text-right" style={{float: "right"}} data-toggle="tooltip" title="Reload Theme"
                     onClick={() => props.onReloadClick()} >
                    <div style={{fill: "#6c757d"}}>
                        <Reload />
                    </div>
                </div>
            </div>
        </div>
    );
}