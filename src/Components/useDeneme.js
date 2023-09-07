import React, { useState } from "react"

function UseDeneme() {

    const [yazi, setYazi] = useState('Hain Evlat');
    const [enab, setEnab] = useState(false);
    function HandleClick() {
        setEnab(true);
        setYazi('Tuman öldü, Mete kağan olup Çine sefere gitti.')
    }
    return (
        <div>
            <h2>{yazi}</h2>
            <button onClick={HandleClick} disabled={enab}>Babana ok at! </button>
        </div>
    )
}
export default UseDeneme