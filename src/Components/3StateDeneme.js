import React,{ Component } from "react";

class StateDeneme extends Component{
    constructor() {
        super()
        this.state = {
            Yazi: 'Hain Evlat'
        }
    }
    YaziDegis () {
        this.setState({
            Yazi: 'Tuman öldü, Mete kağan olup Çine sefere gitti.'
        })
    }
    render () {
        return (
            <div>
                <h2>{this.state.Yazi}</h2>
                <button onClick = {() => this.YaziDegis()}>Babana ok at!</button>
            </div>
        )
    }
}
export default StateDeneme