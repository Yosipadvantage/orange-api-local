
import Head from "next/head";
import { FC } from "react";


interface Props {
    title: string;
}

export const ModuleLayout: FC<Props> = ({ title }) => {
    return (
        <>
            <Head>
                <title>{title ? title : 'Api AMC'}</title>
                <meta name="author" content="Jhonattan Fonseca" />
            </Head>


        </>
    )
}
