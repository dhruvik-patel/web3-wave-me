import React from 'react'
import waveImg from '../static/waving-hand.png'

const Wave = () => {

    const waving = () => {
        alert("Waved")
    }

    return (
        <div style={{ width: "50%", margin: "5% auto", fontFamily: "monospace"}}>
            <div style={{ fontSize: "24px", textAlign: "center", marginBottom:"10%"}}>
                <img src={waveImg} alt="" width={22} height={22}/>
                &nbsp;
                <p style={{ display: "inline" }}>
                    Hello Stranger! Welcome to this page. If you want to wave at me, please click below button.
                </p>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
                <button 
                    style={{ backgroundColor: "#519aff", padding: "10px 30px", fontSize: "16px",borderRadius:"10px", color:"#fff", border:"none" }}
                    onClick={waving}
                >
                    Wave
                </button>
            </div>
        </div>
  )
}

export default Wave