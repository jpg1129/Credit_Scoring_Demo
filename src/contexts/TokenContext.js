import React, { useState } from 'react'

const TokenContext = React.createContext([{}, () => {}])

const TokenContextProvider = (props) => {
    const [state, setState] = useState({
        access_token: null,
        meAdjCreditLimit: null,
        meSuggestedAPR: null,
        suggestedAPR: null,
        suggestedCreditLimit: null,
        unemploymentRate: null
    })

    return (
        <TokenContext.Provider value={[state, setState]}>
            {props.children}
        </TokenContext.Provider>
    )
}

export {TokenContext, TokenContextProvider}