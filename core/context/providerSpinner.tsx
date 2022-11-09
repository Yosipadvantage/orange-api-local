import { createContext, useState } from "react";


const context: any = createContext(false);



const ProviderSpinner = ({ children }: any) => {
    const [state, setState] = useState(false);

    return (
        <context.Provider value={{ state, setState }}>
            {children}
        </context.Provider>
    );

}

export { ProviderSpinner, context };