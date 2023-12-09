import { json, type LinksFunction, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { GlobalErrorBoundary } from "~/components/GlobalErrorBoundary";
import { Layout } from "~/components/Layout";
import { cssBundleHref } from "@remix-run/css-bundle";
import globalStylesHref from "~/assets/global.css";
import { ChildrenProps } from "~/types/types";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client/index.js";
import { getToast } from "remix-toast";
import { ToastContainer, toast as notify } from "react-toastify";
import toastStyles from "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: globalStylesHref },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" },
    { rel: "stylesheet", href: toastStyles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { toast, headers } = await getToast(request);
    return json({ toast }, { headers });
};

export const meta: MetaFunction = () => {
    return [
        { title: "Rick and Morty | Humly" },
        {
            property: "og:title",
            content: "Rick and Morty",
        },
        {
            name: "description",
            content: "Remix app using GraphQL",
        },
    ];
};

const graphQLClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
        uri: "https://rickandmortyapi.com/graphql",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    }),
    cache: new InMemoryCache(),
});

export default function App() {
    const { toast } = useLoaderData<typeof loader>();

    useEffect(() => {
        if (toast) {
            notify(toast.message, { type: toast.type });
        }
    }, [toast]);

    return (
        <ApolloProvider client={graphQLClient}>
            <Document>
                <Layout>
                    <Outlet />
                </Layout>
            </Document>
        </ApolloProvider>
    );
}

export function ErrorBoundary() {
    return (
        <Document>
            <Layout>
                <GlobalErrorBoundary />;
            </Layout>
        </Document>
    );
}

function Document({ children }: ChildrenProps) {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ToastContainer />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
